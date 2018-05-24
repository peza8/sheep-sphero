/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Driver: Class to take inputs and drive the sphero
 *  Author: Brandon Piner
 */

var sphero = require("sphero");
var keypress = require("keypress");

class MobilityDriver {
    constructor (mac_address){
        this.bb8 = sphero("F5:77:55:BE:40:A2");
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
                console.log("MOBILITY:Sending data");
                updateCallback({
                    speed : 1,
                    x : 11,
                    y : 12
                });
            }, 500);
            self.listen(self);
            console.log("MOBILITY:Initialised the device");
        });
    }

    Calibrate() {
        this.bb8.finishCalibration();
    }

    roll(direction){
        this.bb8.roll(10, direction);
    }

    stop(){
        this.bb8.roll(0,0)
    }
    
    handle(ch, key) {
        if (key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit();
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
  
  listen(self) {
	keypress(process.stdin);
	process.stdin.on("keypress", self.handle);
  
	console.log("KEY: starting to listen for arrow key presses");
  
	process.stdin.setRawMode(true);
	process.stdin.resume();
  };

}

module.exports = MobilityDriver;