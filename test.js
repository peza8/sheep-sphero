var sphero = require("sphero");
var MobilityDriver  = require("./src/MobilityDriver");

var mobility = new MobilityDriver();

function speedCallback (speed){
  console.log(speed);
}

function positionCallback (x, y){
  console.log(x, y);
}

mobility.Init("F5:77:55:BE:40:A2", speedCallback, positionCallback);
