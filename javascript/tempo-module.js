// p a d s e e k
// tempo module

// start time, tempo, and number of beats variables
var start_time = new Date();
var tempo = 0, beats = 0;

// runs on every keydown
function calculateTempo() {
	if (beats == 0) {
		start_time = Date();
	}

	beats++;
	updateTempo();
}

// updates display with parsed tempo
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

	$('#bpm_display').html(Math.round(value) + ' bpm');
}

// resets variables
function reset() {
	start_time = null;
	beats = 0;
	updateTempo();
}

// set up keyboard shortcuts
function set_shortcuts() {
	// keyboard shortcut for resetting tempo variables
	shortcut.add("r", function() {
		reset();
	});

	// keyboard shortcut for adding another beat to the tempo calculation
	shortcut.add("t", function() {
		calculateTempo();
	});

	// keyboard shortcut for setting the sequence tempo
	shortcut.add("s", function() {
		$('.set_tempo').click();
	});
}

// remove keyboard shortcut (for actions like naming sequences)
function remove_shortcuts() {
	shortcut.remove("r");
	shortcut.remove("t");
	shortcut.remove("s");
}

// when the document is ready
$(document).ready(function() {
	// if the set tempo button was clicked
	$('.set_tempo').click(function() {
		// set the tempo field value
		$('.tempo_field').val($('.bpm_display').text().trim().substring(0, $('.bpm_display').text().trim().length - 4));
	});
	
	// when the user hits the [enter] key while inside the tempo input field
	$('.tempo_field').on('keydown', function(e) {
		if (e.keyCode.which === 13) { 
			// stop and start sequence (tempo gets calculated on sequence start)
			if (sequence_running) { $('.play_sequence').click(); }
			
			$('.play_sequence').click();
		}
	});
});