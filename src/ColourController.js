/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Colour: Class to take inputs and set colour of sphero
 *  Author: Jason Hardy
 */

var sphero = require("sphero");

class ColourController {
    constructor (mac_address){
        this.bb8 = sphero("F5:77:55:BE:40:A2");
    }

    Init(){
        var self = this;
        console.log("Initing the device");
        this.bb8.connect(function() {
            self.bb8.color("red");
        });
    }

    SetColour(color) {
        this.bb8.color(color);
    }
}

module.exports = ColourController;