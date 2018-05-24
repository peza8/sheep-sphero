/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  PubSub: Network layer to interface with the AWS console
 *  Author: Peza
 *
 *  Protocol: {Team-ID/Sphero-Type/command}
 */

const awsIot = require('aws-iot-device-sdk');
const moment = require('moment'); // for DateTime formatting
const username = 'peza8';

// JS typedef
const spheroType = {
  "leader":     0,
  "follower":   1
}

// Class level constants
const subTopics = {0: ['makers/challenge/clues'],
                   1: ['sheep/follower/test',
                       'sheep/leader/update']};

class PubSubInterface {
  
  // Initial connection
  constructor(spheroType) {
    // Used for differentiation between lead and follow
    this.spheroType = spheroType;
    this.initDevice();
  }

  initDevice() {
    console.log(`PUBSUB: Setting up Jarvis`);
    var self = this;

    if (this.spheroType === spheroType.follower) {
      this.device = awsIot.device({
         keyPath: 'certs_follower/1fa768eb95-private.pem.key',
        certPath: 'certs_follower/1fa768eb95-certificate.pem.crt',
          caPath: 'certs_follower/root-ca.pem',
        clientId: `${username}-follower`,
            host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com' 
      });
    } 

    else {
      // Todo
      this.device = awsIot.device({
         keyPath: 'certs_leader/private.pem.key',
        certPath: 'certs_leader/certificate.pem.crt',
          caPath: 'certs_leader/ca.pem',
        clientId: `${username}-leader`,
            host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com' 
      });
    }

    // Set up listeners
    this.device.on('connect', function() {
      console.log('PUBSUB: Subscriber client connected to AWS IoT cloud.');

      // Set up subscribe events
      const topics = subTopics[self.spheroType];
      for (var index in topics){
        self.device.subscribe(topics[index]);
        console.log(`PUBSUB: Subscribed to ~${topics[index]}`);
      }
    });

    this.device.on('error', error => {
      // Failure to connect
      console.log(`PUBSUB: Eish, struggling to connect this bugger!`);
      console.log(error);
    });

    this.device.on('message', (topic, payload) => {
      self.handleNewMsg(topic, payload);
    });
  }



  handleNewMsg(topic, payload) {
    // Get the message from json string
    const message = JSON.parse(payload.toString());

    switch (topic) {
      case 'sheep/follower/test':
        console.log('PUBSUB: Got a message from houston!');
        break;

      case 'sheep/leader/update':
        console.log('PUBSUB: Received update from leader');
        this.updateFollowerWithMetric(message);
        break;

      default:
        console.log(`Message received on topic "${topic}"`)
    }
  }

  /* ----------------------------------------------------------
   *
   *                  Message Response Section
   *
     ---------------------------------------------------------- */

  setupColorUpdator(callback) {
    this.updateFollowerWithMetric = callback;
  }
     
  /* ----------------------------------------------------------
   *
   *                      Publishing Section
   *
     ---------------------------------------------------------- */

    publishMsg(topic, messageJSON){
      console.log(`PUBSUB: Publishing ${messageJSON} to topic ${topic}`);
      this.device.publish(topic, JSON.stringify({messageJSON}));
    }
}

module.exports = PubSubInterface;



  

  



