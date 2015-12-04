var arp    = require('arp-dash');
var path   = "/sys/class/gpio/";
var fs 	   = require('fs');
var pin    = 14; //gpio pin

var opts = {
	interface: 4,
	mac: ""
};

var t;
arp.listen(opts, function() {
	//when button is pushed
	digitalWrite(pin, true);
	t = setTimeout(function() {
		digitalWrite(pin, false);
	}, 2000);
});

/**
 *
 * @function digitalWrite
 * @param {int} pin
 * @param {boolean} state
 * @desc Will set the state
 * for the pin
 * 
 */
var digitalWrite = function(pin, state) {
	var state = (state) ? 1: 0;
	exportPin(pin);
	var p = path;
	p += "gpio";
	p += pin + "/value";
	fs.writeFileSync(p, state,
		function(err) {
			if(!err) {
				var m = "Set state for pin ";
				m += pin + "as: " + state;
				console.log("Set state")
			}
		}
	);
};

/**
 *
 * @function export
 * @desc Sets the specified
 * pin as active.
 * @param {int} pin
 *
 */
var exportPin = function(pin) {
	var p = path;
	p += "export";
	fs.writeFileSync(p, pin, 
		function(err) {
			if(err) throw err;
			//file saved
		}
	);
	return true;
};