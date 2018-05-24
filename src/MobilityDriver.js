/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Driver: Class to take inputs and drive the sphero
 *  Author: Brandon Piner
 */

var sphero = require("sphero");
var keypress = require("keypress");
const collisionColor  = ['red','blue','green','purple','yellow'];

class MobilityDriver {
    constructor (mac_address){
        this.bb8 = sphero(mac_address);
        this.speed=20;
        this.instantSpeed = 0;
        this.colourIndex = 0;
    }
    Init(updateCallback){
        var self = this;
        console.log("Initing the device");
        this.bb8.connect(function() {
            var opts = {
                flags: 0x01,
                x: 0x0000,
                y: 0x0000,
                yawTare: 0x0
            };
            
            self.bb8.configureLocator(opts, () =>{
                // this.bb8.setRotationRate(50);
                self.bb8.startCalibration();
            });
            
            setInterval(function() {
                // console.log("MOBILITY:Sending data");
                self.bb8.readLocator(function(err, data) {
                    if (err) {
                      console.log("error: ", err);
                    } else {
                    //   console.log("readLocator:");
                    //   console.log("  xpos:", data.xpos);
                    //   console.log("  ypos:", data.ypos);
                    //   console.log("  xvel:", data.xvel);
                    //   console.log("  yvel:", data.yvel);
                    if(data.sog < 60000){
                        console.log("  sog:", data.sog);
                        if(self.instantSpeed-data.sog > 30)
                        {
                          console.log("collided");
                          self.colourIndex = self.colourIndex + 1;
                          self.bb8.color(collisionColor[self.colourIndex % 4]);  
                        }
                        self.instantSpeed = data.sog;
                    }
                        updateCallback({
                            speed : 1,
                            x : data.xpos,
                            y : data.ypos
                        });
                    }
                                 
                });
            }, 100);
            self.listen(self);
            console.log("MOBILITY:Initialised the device");
        });
    }

    Calibrate() {
        this.bb8.finishCalibration();
    }

    roll(direction){
        this.bb8.roll(this.speed, direction);
    }

    stop(){
        this.bb8.roll(0,0)
    }
    
  listen(self) {
	keypress(process.stdin);
	process.stdin.on("keypress",(ch, key) => {
        try{
            if (key.ctrl && key.name === "c") {
            process.stdin.pause();
            process.exit();
            }
            if (key.name === "m") {
                this.speed+=5;
            }
            
            if (key.name === "n") {
                this.speed-=5;
            }

            if (key.name === "up") {
                this.roll(0);
            }
        
            if (key.name === "down") {
                this.roll(180);
            }
        
            if (key.name === "left") {
                this.roll(270);
            }
        
            if (key.name === "right") {
                this.roll(90);
            }
        
            if (key.name === "space") {
                this.stop();
            }
        
            if (key.name === "q") {
                console.log("Calibrated!");  
                this.Calibrate();
            }
            
        }
        catch(e){};
    });
  
	console.log("KEY: starting to listen for arrow key presses");
  
	process.stdin.setRawMode(true);
	process.stdin.resume();
  };

}

module.exports = MobilityDriver;