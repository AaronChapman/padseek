// determines whether or not the sequence is running
var sequence_running = false;
// sequence tempo
var calculated_tempo = 125;
// index of row that's currently firing in sequence
var current_row_in_sequence = 1;
// track number of activated pad pieces
var activated_pad_pieces = 0;
// lists of drum sample option file names
var crash_cymbals = ['thin-cymbal.wav'];
var ride_cymbals = ['tribal-ride.wav'];
var open_hi_hats = ['meaty-hi-hat.wav', 'thin-hi-hat.wav'];
var closed_hi_hats = ['light-hi-hat.wav'];
var snares = ['circus-snare.wav', 'marching-band-snare.wav'];
var kick_drums = ['prehistor-khick.wav', 'thumpy-kick.wav'];
var miscellaneous_percussion = ['radio-transmissions.wav'];
// sample directory path array
var sequence_sample_paths = ['samples/none.mp3','samples/none.mp3',
							 'samples/none.mp3','samples/none.mp3',
							 'samples/none.mp3','samples/none.mp3',
							 'samples/none.mp3','samples/none.mp3'];
// logo palette
var logo_colors = ['white', 'aliceblue', 'aliceblue', 'slategray', 'antiquewhite', 'antiquewhite', 'rgba(00, 00, 00, 0.1)', 'rgba(00, 00, 00, 0.25)'];
// logo animation
var logo_coloring = setInterval(function() {
	$('h1').css({'color':logo_colors[Math.floor(Math.random() * logo_colors.length)]});
}, 5000);
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
	calculated_tempo = (1000 / (tempo / 60)) / 2;
	
	// initializes sequence
	play_sequence('.pad:eq(0)');
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

// clear drum pad piece selections
function clear_selections() {
	// stop sequence
	sequence_running = false;
	activated_pad_pieces = 0;
	
	// reset css and attributes for each pad piece element
	$('.pad').find('.pad_piece').each(function() {
		$(this).css({'min-width':'25px',
					 'margin':'5px','height':'25px',
					 'opacity':'1.0','background':'aliceblue',
					 'border-radius':'2px'});
		
		$(this).attr({'data-state':'inactive'});
	});

	// update interface
	$('.play_sequence').val('play sequence');
}

// generate options for the drum sample select fields
function generate_select_options() {
	// for each sample directory item
	for (var i = 0; i < sample_directories.length; i++) {
		// get a parsed reference to the select element that has a class matching the current directory item
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
function play_sequence(pad_reference) {
	$(pad_reference).find('.pad_piece[id^="' + (current_row_in_sequence) + '"]').each(function() {
		if ($(this).attr('data-state') === "active") {
			var sample = sequence_sample_paths[current_row_in_sequence - 1];

			console.log(sample);
			
			$.play_sound(sample);

			// set active pad piece css properties
			$(this).css({'opacity':'0.25','background':'white'});

			// get a reference to the piece and reset its css attributes
			var quick_reference = $(this);

			setTimeout(function() {
				quick_reference.css({'opacity':'1.0'});
			}, calculated_tempo);
		} else {
			// set inactive pad piece css properties
			$(this).css({'opacity':'0.1','background':'rgba(00, 00, 00, 0.01)'});

			// get a reference to the piece and reset its css attributes
			var quick_reference = $(this);

			setTimeout(function() {
				quick_reference.css({'opacity':'1.0','background':'aliceblue'});
			}, calculated_tempo);
		}
	}); 

	//
	//
	// something is fucked up right here man idk what yet math's hard

	if (current_row_in_sequence % 8 == 0) {
		console.log(pad_reference);

		// if the current pad is not the last pad
		if ($(pad_reference).index() != $('.pad:last').index()) {
			// set the current pad to be the next pad
			var new_pad_index = $(pad_reference).next('.pad').index() - 2;

			pad_reference = '.pad:eq(' + new_pad_index + ')';

			console.log(pad_reference);
		} else {
			// set the first pad as the current pad
			pad_reference = '.pad:eq(0)';

			current_row_in_sequence = 1;

			setTimeout(function() {
				// clean up unused elements
				$('audio.sound-player').each(function() { $(this).remove(); });
			}, calculated_tempo * 2);
		}
	}

	// incremenet current row in the sequence
	current_row_in_sequence++;

	// loop sequence at calculated_tempo while sequence_running = true
	setTimeout(function() {
		if (sequence_running) {
			// if the current pad is the last pad, set the first pad as the current pad
			if ($(pad_reference).index() == $('.pad:last').index() + 2) {
				play_sequence('.pad:eq(0)');
			} else {
				// if the current pad is not the last pad, do nothing
				play_sequence(pad_reference);
			}
		} else {

		}
	}, calculated_tempo);
}

// when the document is ready (for setup & event listeners)
$(document).ready(function() {
	// generate the drum pad
	generate_pad();
	
	// duplicate pad
	$('.duplicate_pad').click(function() {
		// clone element and its event listeners
		var new_pad = $('.pad:last').clone(true, true);
		// set extra css
		new_pad.css({'margin-left':'30px'});
		
		// change last pad's option button and append the new pad
		$('.pad:last').find('.duplicate_pad').remove();
		$('.pad:last').after(new_pad);
		
		var ssp_length = sequence_sample_paths.length;
		
		$.merge(sequence_sample_paths, sequence_sample_paths.slice((ssp_length - 8), ssp_length));
	});
	
	// when a pad piece is clicked
	$('.pad_piece').click(function() {
		// get a reference to ti
		var clicked_pad_piece = $(this);

		// reset all other pad pieces in the same column
		$(this).parents('.pad:eq(0)').find('.pad_piece[id^="' + clicked_pad_piece.attr('id').charAt(0) + '"]').each(function() {
			$(this).css({'background':'aliceblue','border-radius':'2px'});
			$(this).attr({'data-state':'inactive'});
		});

		// determine what type of piece was clicked
		if ($(this).css('border-radius') == '2px') {
			// if an inactive piece was clicked
			$(this).css({'background':'white','border-radius':'8px'});
			$(this).attr({'data-state':'active'});

			activated_pad_pieces++;
		} else if ($(this).css('border-radius') == '8px') {
			// if an active piece was clicked
			$(this).css({'background':'aliceblue','border-radius':'2px'});
			$(this).attr({'data-state':'inactive'});

			activated_pad_pieces--;
		}

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
		
		var findex = $(this).parents('.pad:eq(0)').index() - 2;
		
		sequence_sample_paths[(parseInt(clicked_pad_piece.attr('id').charAt(0)) + (findex * 8)) - 1] = sound_path;
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
			current_row_in_sequence = 1;
			
			$('audio.sound-player').each(function() { $(this).remove(); });
			
			// reset the css of all drum pad pieces
			$('.pad_piece').each(function() {
				$(this).css({'min-width':'25px','margin':'5px','height':'25px','opacity':'1.0'});
			});
			
			// update interface
			$('.play_sequence').val('play sequence');
		}
	});
	
	// when the user hits the [enter] key while inside the tempo input field
	$('.tempo_field').on('keydown', function(e) {
		if (e.keyCode.which === 13) { 
			calculate(parseInt($('.tempo_field').val()));
			
			$('.play_sequence').click();
		}
	});
	
	// when a user clicking inside of the tempo tool module frame
	$('.tempo_tool').click(function() {
		// focus the frame
		$('.tempo_tool_frame').focus();
		
		$(this).css({'box-shadow':'0 2px 0.5px rgba(00, 00, 00, 0.25)'});
	});
});