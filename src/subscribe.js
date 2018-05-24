const awsIot = require('aws-iot-device-sdk');
const moment = require('moment'); // for DateTime formatting
const username = 'peza8';

console.log(`Subscribe client started at ${Date()}`);

initDevice = function () {
  console.log(`Setting up Jarvis`);

  const device = awsIot.device({
     keyPath: 'certs/1fa768eb95-private.pem.key',
    certPath: 'certs/1fa768eb95-certificate.pem.crt',
      caPath: 'certs/root-ca.pem',
    clientId: `${username}-subscribe`,
        host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com' 
  });

  device.on('connect', function() {
    console.log('Subscriber client connected to AWS IoT cloud.\n');

    device.subscribe('makers/challenge/tokens');
    device.subscribe('makers/challenge/clues');
    device.subscribe('makers/challenge/answers/errors');
    device.subscribe('makers/challenge/answers/accepted');
  });

  device.on('error', error => {
    // Failure to connect
    console.log(`Eish, struggling to connect this bugger!`);
    console.log(error);
  });

  device.on('message', (topic, payload) => {

    let message = JSON.parse(payload.toString());

    switch (topic) {
      case 'makers/challenge/tokens':
        let tokenExpiry = moment(message.expiresAt).format('MMMM Do YYYY, h:mm:ss a')
        console.log(`New answer token received: "${message.answerToken}", expires ${tokenExpiry}\n`)
        break;
      case 'makers/challenge/clues':
        console.log(`Clue #${message.clueIndex}: ${message.clue}`);
        break;

      case 'makers/challenge/answers/errors':
        console.log(`\nAnswer error: ${message.error}`);
        break;

      case 'makers/challenge/answers/accepted':
         console.log(`Correct answer: ${message.result}`);
         break;
         
      default:
        console.log(`Message received on topic "${topic}"`)
    }
  });

  // Test some metrics
  console.log(`Device connecting = ${device.connected}`);
  console.log(`Device reconnecting = ${device.reconnecting}`);
};

startDelay = function () {
  setTimeout(initDevice, 2000);
};

startDelay();


