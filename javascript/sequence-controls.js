// p a d s e e k
// sequence controls


/*----------------------------------*/
/* SEQUENCE CONTROL EVENT LISTENERS */
/*----------------------------------*/

// when the document is ready (for setup & event listeners)
$(document).ready(function() {
	// when a pad piece is clicked
	$('.pad').on('click', '.pad_piece', function(event) {
		// get a reference to it
		var clicked_pad_piece = $(this);
		var findex = $(this).parents('.pad:eq(0)').index() - 2;

		// set up sequence sample path storage for array
		
		// determine what type of piece was clicked
		if ($(this).css('border-radius') == '2px') {
			// if an inactive piece was clicked
			$(this).css({'background':'white','border-radius':'8px'});
			$(this).attr({'data-state':'active'});

			activated_pad_pieces++;
			
			var piece_reference = $(this);
			var number_active_in_column = 0;
			// set up the sound path string
			var sound_paths = [];
			
			// for each piece in the same column
			$(this).parents('.pad:eq(0)').find('.pad_piece[id^="' + clicked_pad_piece.attr('id').substring(0, clicked_pad_piece.attr('id').indexOf('-')) + '"]').each(function() {
				// if the piece is active
				if ($(this).attr('data-state') == 'active') {
					// get the first character of the clicked piece's id attribute
					var sound_index = parseInt($(this).attr('id').split('-')[1]);
					// get a reference to the select element for the clicked piece's row
					var selected_select = $('.select').eq(sound_index - 1);
					// get the first class from that select element and parse it
					var selected_select_class = selected_select.attr('class').split(" ")[0];
					var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');
					// continue building sound path
					sound_paths[number_active_in_column] = 'samples/' + class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-') + '.mp3';

					// incremenet the variable tracking the number of active pieces in the column
					number_active_in_column++;
				}
			});

			// gets the last column's coordinate value
			var temp_index = parseInt(clicked_pad_piece.attr('id').substring(0, clicked_pad_piece.attr('id').indexOf('-'))) - 1;
			
			// and sets that index of sequence_sample_paths to the array containing the new pad pieces
			sequence_sample_paths[temp_index] = sound_paths;
		} else if ($(this).css('border-radius') == '8px') {
			// if an active piece was clicked
			$(this).css({'background':'aliceblue','border-radius':'2px'});
			$(this).attr({'data-state':'inactive'});

			// decrement the variables tracking the number of active pieces
			activated_pad_pieces--;

			// get the x-coordinate of the clicked piece
			var temp_index = parseInt(clicked_pad_piece.attr('id').substring(0, clicked_pad_piece.attr('id').indexOf('-'))) - 1;
			// get the y-coordinate of the clicked piece
			var sound_index = parseInt($(this).attr('id').split('-')[1]);
			// get a reference to the select element for the clicked piece's row
			var selected_select = $('.select').eq(sound_index - 1);
			// get the first class from that select element and parse it
			var selected_select_class = selected_select.attr('class').split(" ")[0];
			var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');
			
			// determine which sample path needs to be removed (deactivated piece)
			var full_sample_path = 'samples/' + class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-') + '.mp3'
			
			var sample_to_pop = sequence_sample_paths[temp_index].indexOf(full_sample_path);
			
			// if there is one that needs to be removed
			if (sample_to_pop > -1) {
				if (sequence_sample_paths[temp_index].length > 1) {
					// remove it
					sequence_sample_paths[temp_index].splice(sample_to_pop, 1);
				} else {
					// if it's the last piece in the array, replace the value with the empty file
					sequence_sample_paths[temp_index][0] = 'samples/none.mp3';
				}
			}
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
			
			// initializes sequence
			play_sequence('.pad:eq(0)');

			// update interface
			$('.play_sequence').val('pause sequence');
		} else {
			// otherwise, stop the sequence
			sequence_running = false;
			current_column_in_sequence = 1;

			//$('audio.sound-player').each(function() { $(this).remove(); });

			// reset the css of all drum pad pieces
			$('.pad_piece').each(function() {
				$(this).css({'min-width':'25px','margin':'5px','height':'25px','opacity':'1.0'});
			});

			// update interface
			$('.play_sequence').val('play sequence');
		}
	});
	
	$('.tempo_field').on('keydown', function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			
			calculate(parseInt($('.tempo_field').val()));
		}
	});
});


/*----------------------------------*/
/* SEQUENCE PLAYBACK INITIALIZATION */
/*----------------------------------*/

// calculates tempo
function calculate(tempo) {
	calculated_tempo = (1000 / (tempo / 60)) / 2;
}

// clear drum pad piece selections
function clear_selections() {
	activated_pad_pieces = 0;
	sequence_sample_paths = [];
	
	for (var i = 0; i < $('body').find('.pad').length; i++) {
		for (var j = 0; j < 8; j++) {
			sequence_sample_paths.push(['samples/none.mp3']);
		}
	}

	// reset css and attributes for each pad piece element
	$('.pad').find('.pad_piece').each(function() {
		$(this).css({'min-width':'25px',
					 'margin':'5px','height':'25px',
					 'opacity':'1.0','background':'aliceblue',
					 'border-radius':'2px'});

		$(this).attr({'data-state':'inactive'});
	});
}

// plays cloned copies of the audio tags so same samples can overlap
function play_selected_sample(sample, set_size) {
	$('.sample_element[src*="' + sample + '"]').each(function() {
		// if the number of samples playing is more than 1, divide their volume attribute evenly
		if (set_size > 1) {
			this.volume = 1.0 / set_size;
		}
		
		// plays cloned copies of the audio tags if sample is currently playing (so same samples can overlap)
		if (this.duration > 0) {
			var copied_element = this.cloneNode();
			
			copied_element.play();

			// removes cloned copies after they're done being used
			setTimeout(function() {
				copied_element.remove();
			}, calculate_tempo * 16);
		// if the sample isn't currently playing, just go ahead and play the original node
		} else {
			this.play();
		}
	});
}

// play sequence
function play_sequence(pad_reference) {
	// find each active piece in the current sequence column
	$(pad_reference).find('.pad_piece[id^="' + current_column_in_sequence + '"]').each(function() {
		if ($(this).attr('data-state') === "active") {
			for (var i = 0; i < sequence_sample_paths[current_column_in_sequence - 1].length; i++) {
				var sample = sequence_sample_paths[current_column_in_sequence - 1][i];
				
				// play the samples at the specified index of the sequence_sample_paths array of arrays Lol
				play_selected_sample(sample, sequence_sample_paths[current_column_in_sequence - 1].length);
			}
			
			// set active pad piece css properties
			$(this).css({'opacity':'0.25','box-shadow':'0 1px 0.5px rgba(00, 00, 00, 0.75)'});

			// get a reference to the piece and reset its css attributes
			var quick_reference = $(this);

			setTimeout(function() {
				quick_reference.css({'opacity':'1.0', 'box-shadow':'none'});
			}, calculated_tempo);
		} else {
			// get a reference to the piece and reset its css attributes
			var quick_reference = $(this);
			
			// set inactive pad piece css properties
			quick_reference.css({'opacity':'0.25', 'box-shadow':'none', 'background':'white'});

			setTimeout(function() {
				quick_reference.css({'opacity':'1.0', 'box-shadow':'none', 'background':'aliceblue'});
			}, calculated_tempo);
		}
	}); 

	if (current_column_in_sequence % 8 == 0) {
		// if the current pad is not the last pad
		if ($(pad_reference).index() != $('.pad:last').index()) {
			// set the current pad to be the next pad
			var new_pad_index = $(pad_reference).next('.pad').index() - 2;

			pad_reference = '.pad:eq(' + new_pad_index + ')'; 
		} else {
			// set the first pad as the current pad
			pad_reference = '.pad:eq(0)';

			current_column_in_sequence = 0;
		}
	}

	// increment current row in the sequence
	current_column_in_sequence++;

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