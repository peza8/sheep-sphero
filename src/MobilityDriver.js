/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Driver: Class to take inputs and drive the sphero
 *  Author: Brandon Piner
 */

var sphero = require("sphero");

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
            
            // setInterval(function() {
            //     speedCallback(10);
            //     positionCallback(10, 200);
            // }, 500);
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
}

module.exports = MobilityDriver;