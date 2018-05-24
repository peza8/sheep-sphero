var sphero = require("sphero");
var MobilityDriver  = require("./src/MobilityDriver");
var keypress = require("keypress");

var mobility = new MobilityDriver("F5:77:55:BE:40:A2");

function speedCallback (speed){
  console.log(speed);
}

function positionCallback (x, y){
  console.log(x, y);
}

mobility.Init(speedCallback, positionCallback);

function handle(ch, key) {
  if (key.ctrl && key.name === "c") {
    process.stdin.pause();
    process.exit();
  }

  if (key.name === "up") {
    mobility.roll(0);
  }

  if (key.name === "down") {
    mobility.roll(180);
  }

  if (key.name === "left") {
    mobility.roll(270);
  }

  if (key.name === "right") {
    mobility.roll(90);
  }

  if (key.name === "space") {
    mobility.stop();
  }

  if (key.name === "q") {
    console.log("Calibrated!");  
    mobility.Calibrate();
  }
}

function listen() {
  keypress(process.stdin);
  process.stdin.on("keypress", handle);

  console.log("starting to listen for arrow key presses");

  process.stdin.setRawMode(true);
  process.stdin.resume();
}

listen();