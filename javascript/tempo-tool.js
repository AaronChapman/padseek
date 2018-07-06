var start_time = new Date();
var tempo = 0, beats = 0;

function tempoStart() {

}

function calculateTempo() {
	if (beats == 0) {
		start_time = Date()
	}

	beats++;
	updateTempo();
}

function updateTempo() {
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

	$('#bpm_display').html(value + ' bpm');
}

function reset() {
	start_time = null;
	beats = 0;
	updateTempo();
}

shortcut.add("r", function() {
	reset();
});

shortcut.add("t", function() {
	calculateTempo();
});