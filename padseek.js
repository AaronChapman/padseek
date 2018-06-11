// determines whether or not the sequence is running
var sequence_running = false;
// sequence tempo
var calculated_tempo = 125;
// index of row that's currently firing in sequence
var current_row_in_sequence = 1;
// lists of drum sample option file names
var crash_cymbals = ['thin-cymbal.wav'];
var ride_cymbals = ['tribal-ride.wav'];
var open_hi_hats = ['meaty-hi-hat.wav','thin-hi-hat.wav'];
var closed_hi_hats = ['light-hi-hat.wav'];
var snares = ['circus-snare.wav','marching-band-snare.wav'];
var kick_drums = ['prehistor-khick.wav','thumpy-kick.wav'];
var miscellaneous_percussion = ['radio-transmissions.wav'];
// list of objects with directory name & sound path array properties
var sample_directories = [{directory: 'crash-cymbals', sound_paths: crash_cymbals},
						  {directory: 'ride-cymbals', sound_paths: ride_cymbals},
						  {directory: 'open-hi-hats', sound_paths: open_hi_hats},
						  {directory: 'closed-hi-hats', sound_paths: closed_hi_hats},
						  {directory: 'snares', sound_paths: snares},
						  {directory: 'kick-drums', sound_paths: kick_drums},
						  {directory: 'miscellaneous-percussion', sound_paths: miscellaneous_percussion}];

// calculates tempo on change
function calculate(tempo) {
	//initializes sequence
	play_sequence();
}

//clear drum pad piece selections
function clear_selections() {
	//stop sequence
	sequence_running = false;
	
	//reset css and attributes for each pad piece element
	$('.pad').find('.pad_piece').each(function() {
		$(this).css({'min-width':'25px',
					 'margin':'5px','height':'25px',
					 'opacity':'1.0','background':'floralwhite',
					 'border-radius':'2px'});
		
		$(this).attr({'data-state':'inactive'});
	});

	//update interface
	$('.play_sequence').val('play sequence');
}

// generate drum pad pieces
function generate_pad() {
	// reference to drum pad container
	var pad_reference = $('.pad');
	
	// drum pad piece row generation
	for (var i = 1; i < 9; i++) {
		// drum pad piece column generation
		for (var j = 1; j < 9; j++) {
			// creating a pad piece element
			var pad_piece = $('<div>');
			
			pad_piece.addClass('pad_piece');
			pad_piece.attr({'id':j + '-' + i,'data-state':'inactive'});

			// and adding it the the drum pad container
			pad_reference.append(pad_piece);
		}
	}
	
	// generate options for the drum sample select fields
	generate_select_options();
}

// generate options for the drum sample select fields
function generate_select_options() {
	// for each sample directory item
	for (var i = 0; i < sample_directories.length; i++) {
		//get a parsed reference to the select element that has a class matching the current directory item
		var select_reference = $('.select[class*="' + sample_directories[i].directory.replace(/-/g, '_') + '"]');

		// for each item in the sound_paths (array) property
		for (var j = 0; j < sample_directories[i].sound_paths.length; j++) {
			// append an option element with appropriate attributes
			select_reference.append('<option value="' +
									sample_directories[i].sound_paths[j] +'">' +  sample_directories[i].sound_paths[j].replace(/-/g, ' ') +
									'</option>');
		}
	}
}

// play sequence
function play_sequence() {
	// for each pad piece
	$('.pad_piece').each(function() {
		// if the first character in the piece's id attribute is equal to the current row in the sequence
		if ($(this).attr('id').charAt(0) === current_row_in_sequence.toString()) {
			// if the piece's data-state attribute is active
			if ($(this).attr('data-state') === "active") {
				// set up the sound path string
				var sound_path = 'samples/';
				// get the first character of the clicked piece's id attribute
				var sound_index = parseInt($(this).attr('id').charAt(2));
				// get a reference to the select element for the clicked piece's row
				var selected_select = $('.select').eq(sound_index - 1);
				// get the first class from that select element and parse it
				var selected_select_class = selected_select.attr('class').split(" ")[0];
				var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');
				
				// continue building sound path
				sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-');
				
				// play sound from path that was jsut built
				$.play_sound(sound_path);
				
				// set active pad piece css properties
				$(this).css({'min-width':'20px','margin':'7.5px','height':'20px','opacity':'0.25'});
			} else {
				// set inactive pad piece css properties
				$(this).css({'min-width':'20px','margin':'7.5px','height':'20px','opacity':'0.75'});
			}
		} else {
			// set css properties for inactive pad pieces
			$(this).css({'min-width':'25px','margin':'5px','height':'25px','opacity':'1.0'});
		}
	});
	
	// incremenet current row in the sequence
	current_row_in_sequence++;
	
	// determine sequence loop point
	if (current_row_in_sequence === 9) {
		current_row_in_sequence = 1;
	}
	
	// loop sequence at calculated_tempo while sequence_running = true
	setTimeout(function() {
		if (sequence_running) {
			play_sequence();
		} else {
			
		}
	}, calculated_tempo);
}

// when the document is ready (for setup & event listeners)
$(document).ready(function() {
	// generate the drum pad
	generate_pad();
	
	// when a pad piece is clicked
	$('.pad_piece').click(function() {
		// determine background color & data-state attribute value
		if ($(this).css('border-radius') == '2px') {
			$(this).css({'background':'antiquewhite','border-radius':'8px'});
			$(this).attr({'data-state':'active'});
		} else if ($(this).css('border-radius') == '8px') {
			$(this).css({'background':'floralwhite','border-radius':'2px'});
			$(this).attr({'data-state':'inactive'});
		}
	});
	
	// when the play/pause sequence button is clicked
	$('.play_sequence').click(function() {
		// if the sequence is not running
		if (!sequence_running) {
			// start it
			sequence_running = true;
			
			// calculate tempo
			calculate(parseInt($('.tempo_field').val()));
			
			// update interface
			$('.play_sequence').val('pause sequence');
		} else {
			// otherwise, stop the sequence
			sequence_running = false;
			
			// reset the css of all drum pad pieces
			$('.pad_piece').each(function() {
				$(this).css({'min-width':'25px','margin':'5px','height':'25px','opacity':'1.0'});
			});
			
			// update interface
			$('.play_sequence').val('play sequence');
		}
	});
});