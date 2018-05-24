const awsIot = require('aws-iot-device-sdk');
const moment = require('moment'); // for DateTime formatting
const username = 'peza8';

device = awsIot.device({
         keyPath: 'certs_follower/1fa768eb95-private.pem.key',
        certPath: 'certs_follower/1fa768eb95-certificate.pem.crt',
          caPath: 'certs_follower/root-ca.pem',
        clientId: `${username}-follower`,
            host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'});

device.on('connect', function() {
    console.log('PUBSUB: Subscriber client connected to AWS IoT cloud.');
    device.subscribe('sheep/leader/update');
});

device.on('error', error => {
    // Failure to connect
    console.log(`PUBSUB: Eish, struggling to connect this bugger!`);
    console.log(error);
 });

device.on('message', (topic, payload) => {
    console.log('PUBSUB: Received update from leader');
    const message = JSON.parse(payload);
    console.log(message);

    const x = message.messageJSON.x;
    const y = message.messageJSON.y;

    console.log(`X = ${x} Y = ${y}`);
});