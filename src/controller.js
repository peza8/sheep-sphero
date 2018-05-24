/*
 *  OfferZen Make Day 24 May 2018
 *  Team: Brandon Piner, Josh Perry, Jason Hady
 *
 *  Controller: Central controller to control program flow
 *  Author: All
 */

const PubSubInterface = require('./pubsub.js');
const MobilityDriver  = require('./MobilityDriver.js');
const ColourController  = require('./ColourController.js');
const macAddress = ['F5:77:55:BE:40:A2', 'FA:34:A8:E7:D4:A7'];


const spheroType = {
 	"leader": 		0,
 	"follower": 	1
}

// Set the sphero type here
const sphero = spheroType.leader;

// Create a pubsub interface & give it a callback for 
const pubsub = new PubSubInterface(sphero);
const mobilityDriver = new MobilityDriver(macAddress[sphero]);
const colorDriver = new ColourController(macAddress[sphero]);

/*
 * On init of the mobility driver pass it the 
 * callback to fire when it updates it's speed 
 * and position
 */
if(sphero === spheroType.leader) {
	mobilityDriver.Init(metrics => {
		// Get position and speed
		const speed = metrics.speed;
		const xNew = metrics.x;
		const yNew = metrics.y;

		// Publish update with this info
		const pubObj = {
			message: "Hey, this is what I'm doing",
			x: xNew,
			y: yNew};

		pubsub.publishMsg('sheep/leader/update', pubObj);
	});
}
else {
	colorDriver.Init();
}
/*
 * 	Metrics comes directly from PubSub JSON
 *  Position: (use x, y) -> set value based on quadrants
 */

pubsub.setupColorUpdator(metrics => {
	// Get x - y value
	const x = metrics.x;
	const y = metrics.y;
	var colour;

	// Set colour based on quadrant
	if (x >= 0) {
		if (y >= 0) {
			// Quad 1
			colour = 'red';
		} else {
			// Quad 2
			colour = 'blue';
		}
	} else {
		if (y >= 0) {
			// Quad 3
			colour = 'green';
		} else {
			// Quad 4
			colour = 'orange';
		}
	}

	// Call the colour update method on the sphero
	console.log(`CONTROLLER: Setting follower to ${colour}`);
	colorDriver.SetColour(colour);
});
