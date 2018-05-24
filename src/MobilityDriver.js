/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Driver: Class to take inputs and drive the sphero
 *  Author: Brandon Piner
 */

var sphero = require("sphero");

class MobilityDriver {
    Init(mac_address, speedCallback, positionCallback){
        var bb8 = sphero(mac_address);
        console.log("Initing the device");
        bb8.connect(function() {
            var opts = {
                flags: 0x01,
                x: 0x0000,
                y: 0x0000,
                yawTare: 0x0
            };
            
            bb8.configureLocator(opts);
            bb8.setRotationRate(50);
            bb8.startCalibration();
            
            bb8.roll(7,0);
            speedCallback(10);
            positionCallback(10, 200);
            // setInterval(function() {
            //     var direction = 0;
            //     bb8.roll(10, direction);
            // }, 500);
        });
    }
}

module.exports = MobilityDriver;