// p a d s e e k
// tempo module


/*-------------------------------------*/
/* DETERMINE TEMPO FROM KEYBOARD INPUT */
/*-------------------------------------*/

// start time, tempo, and number of beats variables
var start_time = new Date();
var tempo = 0, beats = 0;

// runs on every [t] keydown
function calculate_tempo() {
	if (beats == 0) {
		start_time = Date();
	}

	beats++;
	update_tempo();
}

// updates display with parsed tempo
function update_tempo() {
	var value = '0';

	if (beats > 1) {
		var now = new Date();
		var miliseconds = now.getTime() - start_time.getTime();
		var minutes = miliseconds / 60000.0;
		var bpm = (beats - 1) / minutes;

		value = bpm.toFixed(2);
	} else if (beats == 1) {
		value = 1;

		start_time = new Date();
	}

	$('#bpm_display').html(Math.round(value) + ' bpm');
}

// resets variables
function reset_tempo() {
	start_time = null;
	beats = 0;
	update_tempo();
}