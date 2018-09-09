// p a d s e e k
// sequence controls


/*----------------------------------*/
/* SEQUENCE CONTROL EVENT LISTENERS */
/*----------------------------------*/

// when the document is ready (for setup & event listeners)
$(document).ready(function () {
	// when the play/pause sequence button is clicked
	$('.play_sequence').click(function () {
		// if the sequence is not running
		if (!sequence_running) {
			// start it
			sequence_running = true;

			// calculate tempo
			calculate(parseInt($('.tempo_field').val()));

			// initializes sequence
			play_sequence($('.pad').eq(0));

			// update interface
			$('.play_sequence').val('pause sequence');
		} else {
			// otherwise, stop the sequence
			sequence_running = false;
			current_column_in_sequence = 1;

			// reset the css of all drum pad pieces
			$('.pad_piece').each(function () {
				$(this).css({
					'min-width': '25px',
					'margin': '5px',
					'height': '25px',
					'opacity': '1.0'
				});
			});

			// update interface
			$('.play_sequence').val('play sequence');
		}
	});

	// if the user hits the [enter] key, update the sequence tempo
	$('.tempo_field').on('keydown', function (event) {
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
	// reset globals
	activated_pad_pieces = 0;
	sequence_sample_paths = [];

	// empty the sample paths array
	for (var i = 0; i < $('body').find('.pad').length; i++) {
		for (var j = 0; j < 8; j++) {
			sequence_sample_paths.push(['samples/none.mp3']);
		}
	}

	// reset css and attributes for each pad piece element
	$('.pad_piece').attr('data-state', 'inactive');
}

// plays cloned copies of the audio tags so same samples can overlap
function play_selected_sample(sample, set_size) {
	$('.sample_element[src*="' + sample + '"]').each(function () {
		// if the number of samples playing is more than 1, divide their volume attribute evenly
		if (set_size > 1) {
			this.volume = 1.0 / set_size;
		}

		// plays cloned copies of the audio tags if sample is currently playing (so same samples can overlap)
		if (this.duration > 0) {
			var copied_element = this.cloneNode();

			copied_element.play();

			// removes cloned copies after they're done being used
			setTimeout(function () {
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
	pad_reference.find('.pad_piece[id^="' + current_column_in_sequence + '"]').each(function () {
		if ($(this).attr('data-state') === "active") {
			for (var i = 0; i < sequence_sample_paths[current_column_in_sequence - 1].length; i++) {
				var sample = sequence_sample_paths[current_column_in_sequence - 1][i];
				
				// play the samples at the specified index of the sequence_sample_paths array of arrays Lol
				play_selected_sample(sample, sequence_sample_paths[current_column_in_sequence - 1].length);
			}

			// set active pad piece css properties
			$(this).addClass('ppta');

			// get a reference to the piece and reset its css attributes
			var quick_reference = $(this);

			setTimeout(function () {
				quick_reference.removeClass('ppta');
			}, calculated_tempo);
		} else {
			// get a reference to the piece and reset its css attributes
			var quick_reference = $(this);

			// set inactive pad piece css properties
			$(this).addClass('ppti');

			// and then reset them
			setTimeout(function () {
				quick_reference.removeClass('ppti');
			}, calculated_tempo);
		}
	});

	// at the end of every pad
	if (current_column_in_sequence % 8 == 0) {
		// if the current pad is not the last pad
		if (!pad_reference.is(':last-of-type')) {
			pad_reference = pad_reference.next('.pad');
		} else {
			// set the first pad as the current pad
			pad_reference = $('.pad').eq(0);

			current_column_in_sequence = 0;
		}
	}

	// increment current row in the sequence
	current_column_in_sequence++;

	// loop sequence at calculated_tempo while sequence_running = true
	setTimeout(function () {
		if (sequence_running) {
			// if the current pad is the last pad, set the first pad as the current pad
			if (pad_reference == $('.pad:last')) {
				play_sequence($('.pad').eq(0));
			} else {
				// if the current pad is not the last pad, do nothing
				play_sequence(pad_reference);
			}
		} else {

		}
	}, calculated_tempo);
}