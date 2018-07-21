// p a d s e e k
// sequence controls

// when the document is ready (for setup & event listeners)
$(document).ready(function() {
	// when a pad piece is clicked
	$('.pad').on('click', '.pad_piece', function(event) {
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
			sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-') + '.mp3';

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

			//$('audio.sound-player').each(function() { $(this).remove(); });

			// reset the css of all drum pad pieces
			$('.pad_piece').each(function() {
				$(this).css({'min-width':'25px','margin':'5px','height':'25px','opacity':'1.0'});
			});

			// update interface
			$('.play_sequence').val('play sequence');
		}
	});
});

// calculates tempo on change
function calculate(tempo) {
	calculated_tempo = (1000 / (tempo / 60)) / 2;
	
	if (tempo < 15) { calculated_tempo = (1000 / (15 / 60)) / 2; $('.tempo_field').val('15'); }
	if (tempo > 240) { calculated_tempo = (1000 / (240 / 60)) / 2; $('.tempo_field').val('240'); }

	// initializes sequence
	play_sequence('.pad:eq(0)');
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

// play sequence
function play_sequence(pad_reference) {
	$(pad_reference).find('.pad_piece[id^="' + current_row_in_sequence + '"]').each(function() {
		if ($(this).attr('data-state') === "active") {
			var sample = sequence_sample_paths[current_row_in_sequence - 1];

			$.play_sound(sample);
			
			setTimeout(function() {
				$('audio.sound-player:first').remove();
			}, calculated_tempo * 8);
			
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
			$(this).css({'opacity':'0.1','background':'white'});

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