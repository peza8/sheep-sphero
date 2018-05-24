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
        this.bb8.connect(function() {
            self.bb8.color("red");
        });
        console.log("COLOUR:Initialised the device");
    }

    SetColour(color) {
        this.bb8.color(color)
            .then(() => {
                console.log(`COLOUR: Set to: ${color}`);
            }) 

            .catch(error => {
                console.log(`COLOUR: Error setting colour - ${error}`);
            });
    }
}

module.exports = ColourController;