// TO DO
// convert files to mp3s
// localize tempo tool
// continue to modularize & sort javascript functions

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

			pad_piece.addClass('pad_piece cursor_pointer');
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
	$(pad_reference).find('.pad_piece[id^="' + current_row_in_sequence + '"]').each(function() {
		if ($(this).attr('data-state') === "active") {
			var sample = sequence_sample_paths[current_row_in_sequence - 1];

			$.play_sound(sample);
			
			//find some way to loop player and remove sound player elements while keeping all sound tail

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

	if (current_row_in_sequence % 8 == 0) {
		// if the current pad is not the last pad
		if ($(pad_reference).index() != $('.pad:last').index()) {
			// set the current pad to be the next pad
			var new_pad_index = $(pad_reference).next('.pad').index() - 2;

			pad_reference = '.pad:eq(' + new_pad_index + ')'; 
		} else {
			// set the first pad as the current pad
			pad_reference = '.pad:eq(0)';

			current_row_in_sequence = 0;

			setTimeout(function() {
				// clean up unused elements
				$('audio.sound-player').each(function() { $(this).remove(); });
			}, calculated_tempo);
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

//gotta change ids dynamically based on where pad was inserted

// when the document is ready (for setup & event listeners)
$(document).ready(function() {
	// generate the drum pad
	generate_pad();

	// duplicate pad
	$('.duplicate_pad').click(function() {
		// clone element and its event listeners
		var new_pad = $(this).parents('.pad:eq(0)').clone(true, true);

		// set extra css
		new_pad.css({'margin-left':'30px'});

		new_pad.find('.pad_piece').each(function() {
			var piece_id = $(this).attr('id');
			var x_index = piece_id.substring(0, piece_id.indexOf('-'));
			var y_index = piece_id.split('-')[1];
			var x_index_conversion = parseInt(x_index) + 8;

			$(this).attr({'id':x_index_conversion + '-' + y_index});
		});

		$(this).parents('.pad:eq(0)').after(new_pad);

		for (var pads = 0; pads < $('body').find('.pad').length; pads++) {
			var temporary_pad_reference = $('.pad').eq(pads);

			for (var row = 1; row < 9; row++) {
				for (var column = 1; column < 9; column++) {
					var temporary_piece_reference = temporary_pad_reference.find('.pad_piece[id$="' + row + '"]').eq(column - 1);
					temporary_piece_reference.attr({'id':(column + (8 * pads)) + '-' + temporary_piece_reference.attr('id').split('-')[1]});
				}
			}
		}

		var ssp_length = sequence_sample_paths.length;

		for (var i = 0; i < $('body').find('.pad').length * 8; i++) {
			var sound_path = 'samples/';

			// get the first character of the clicked piece's id attribute
			var active_piece_id = $('.pad_piece[id^="' + (i + 1) + '-"][data-state="active"]').attr('id');

			if (active_piece_id) {
				var sound_index = active_piece_id.split('-')[1];
				var selected_select = $('.select').eq(sound_index - 1);
				var selected_select_class = selected_select.attr('class').split(" ")[0];
				var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');

				sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-');

				sequence_sample_paths[i] = sound_path;
			} else {
				sequence_sample_paths[i] = 'samples/none.mp3';
			}
		}
	});

	// when a pad piece is clicked
	$('.pad_piece').click(function() {
		// get a reference to it
		var clicked_pad_piece = $(this);
		var findex = $(this).parents('.pad:eq(0)').index() - 2;

		// reset all other pad pieces in the same column
		$(this).parents('.pad:eq(0)').find('.pad_piece[id^="' + clicked_pad_piece.attr('id').substring(0, clicked_pad_piece.attr('id').indexOf('-')) + '"]').each(function() {
			$(this).css({'background':'aliceblue','border-radius':'2px'});
			$(this).attr({'data-state':'inactive'});
		});

		// determine what type of piece was clicked
		if ($(this).css('border-radius') == '2px') {
			// if an inactive piece was clicked
			$(this).css({'background':'white','border-radius':'8px'});
			$(this).attr({'data-state':'active'});

			activated_pad_pieces++;

			// set up the sound path string
			var sound_path = 'samples/';
			// get the first character of the clicked piece's id attribute
			var sound_index = parseInt($(this).attr('id').split('-')[1]);
			// get a reference to the select element for the clicked piece's row
			var selected_select = $('.select').eq(sound_index - 1);
			// get the first class from that select element and parse it
			var selected_select_class = selected_select.attr('class').split(" ")[0];
			var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');

			// continue building sound path
			sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-');

			sequence_sample_paths[parseInt(clicked_pad_piece.attr('id').substring(0, clicked_pad_piece.attr('id').indexOf('-'))) - 1] = sound_path;
		} else if ($(this).css('border-radius') == '8px') {
			// if an active piece was clicked
			$(this).css({'background':'aliceblue','border-radius':'2px'});
			$(this).attr({'data-state':'inactive'});

			activated_pad_pieces--;

			sequence_sample_paths[parseInt(clicked_pad_piece.attr('id').substring(0, clicked_pad_piece.attr('id').indexOf('-'))) - 1] = 'samples/none.mp3';
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