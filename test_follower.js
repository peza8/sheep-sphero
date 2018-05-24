var sphero = require("sphero");
var ColourController  = require("./src/ColourController");

var colorDriver = new ColourController("F5:77:55:BE:40:A2");

colorDriver.Init();

// colorDriver.SetColour('blue');