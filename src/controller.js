/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Controller: Central controller to control program flow
 *  Author: All
 */

const PubSubInterface = require('./pubsub.js');

const spheroType = {
 	"leader": 		0,
 	"follower": 	1
}

// Set the sphero type here
const sphero = spheroType.follower;

// Create a pubsub interface 
const pubsub = new PubSubInterface(sphero);

