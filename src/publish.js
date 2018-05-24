const awsIot = require('aws-iot-device-sdk');
const username = 'peza8';
const myAnswer = 'White Rabbit';

const device = awsIot.device({
   keyPath: 'certs/1fa768eb95-private.pem.key',
  certPath: 'certs/1fa768eb95-certificate.pem.crt',
    caPath: 'certs/root-ca.pem',
  clientId: `${username}-publish`,
      host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});

device.on('connect', () => {
  console.log('Publisher client connected to AWS IoT cloud.');

  device.publish('makers/challenge/answers', JSON.stringify({
  	"name" : "Josh Perry",
  	"answerToken"  : "q1o3Jocio9WLxgxUUerxwN9P",
  	"answer"	   : myAnswer
  	})
  );

  console.log(`PUBLISHER: Answer sent = ${myAnswer} - let's see what happens`);
});
