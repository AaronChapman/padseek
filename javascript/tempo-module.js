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
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		reset();
	});

	// keyboard shortcut for adding another beat to the tempo calculation
	shortcut.add("t", function() {
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		calculateTempo();
	});

	// keyboard shortcut for setting the sequence tempo
	shortcut.add("s", function() {
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		$('.set_tempo').click();
	});
	
	shortcut.add("c", function() {
		if ($('.shortcuts_overlay').css('z-index') === '-1') {
			$('.shortcuts_overlay').css({'opacity':'1', 'z-index':'2'});
			
			show_shortcuts();
		} else if ($('.shortcuts_overlay').css('z-index') === '2') {
			$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'}); 
		}
	});
	
	shortcut.add("p", function() {
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		$('.play_sequence').click();
	});
	
	shortcut.add("x", function() {
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		$('.clear_selections').click();
	});
	
	shortcut.add("z", function() {
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		$('.randomize').click();
	});
	
	shortcut.add("m", function() {
		$('.shortcuts_overlay').css({'opacity':'0', 'z-index':'-1'});
		
		$('.share_sequence').click();
	});
}

// remove keyboard shortcut (for actions like naming sequences)
function remove_shortcuts() {
	shortcut.remove("r");
	shortcut.remove("t");
	shortcut.remove("s");
	shortcut.remove("c");
	shortcut.remove("p");
	shortcut.remove("x");
	shortcut.remove("z");
	shortcut.remove("m");
}

function show_shortcuts() {
	$('.shortcuts_overlay').css({'opacity':'1', 'z-index':'2'});
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