// p a d s e e k
// pad manipulation


/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

// when the document is ready
$(document).ready(function () {
	// duplicate pad button event listener
	$('.pad').on('click', '.duplicate_pad', function (event) {
		if ($('body').find('.pad').length <= 31) {
			// clone element and its event listeners
			var new_pad = $(this).parents('.pad:eq(0)').clone(true, true);

			// set css properties
			new_pad.css({
				'margin-left': '35px'
			});

			// append a button for pad removal
			new_pad.prepend('<input class="remove_pad pad_manipulator cursor_pointer" type="button" value="remove">');

			// insert the new pad element in its appropraite position
			$(this).parents('.pad:eq(0)').after(new_pad);

			// remove extra sequence duplication buttons
			$('body').find('.duplicate_sequence:not(:first), .remove_all_pads:not(:first)').remove();

			// reorder all pad piece id attributes
			reorder_pad_pieces();
		} else {
			application_message('sequence cannot contain more than 32 drum pads');
		}
	});

	// duplicate sequence button event listener
	$('.pad').on('click', '.duplicate_sequence', function (event) {
		if ($('body').find('.pad').length <= 16) {
			// clone elements and their event listeners
			var new_pads = [];

			$('.pad').each(function () {
				new_pads.push($(this).clone(true, true));
			});

			for (var i = 0; i < new_pads.length; i++) {
				// set css properties
				new_pads[i].css({
					'margin-left': '35px'
				});

				// append a button for pad removal
				new_pads[i].prepend('<input class="remove_pad pad_manipulator cursor_pointer" type="button" value="remove">');

				// insert the new pad element in its appropraite position
				$('.pad:last').after(new_pads[i]);
			}

			// remove extra sequence duplication buttons
			$('body').find('.duplicate_sequence:not(:first), .remove_all_pads:not(:first)').remove();

			// reorder all pad piece id attributes
			reorder_pad_pieces();
		} else {
			application_message('sequence cannot contain more than 32 drum pads');
		}
	});

	// when a pad piece is clicked
	$('.pad').on('click', '.pad_piece', function (event) {
		// get the pad's index
		var findex = $(this).parents('.pad:eq(0)').index() - 2;

		// remove any animations on the piece (for walkthrough)
		$(this).css('animation', 'unset');

		// determine if piece clicked was an inactive piece
		if ($(this).css('border-radius') == '2px') {
			// count how many active pieces are in the column
			var same_column_check = $(this).parents('.pad:eq(0)').find('.pad_piece[id^="' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('-')) + '"][data-state="active"]').length;

			// either click the piece
			if (same_column_check <= 3) {
				activate_piece($(this));
			} else {
				// or show the stacked pieces in a single column cap message
				application_message('sorry, but you may only have four samples per column');
			}
			// and if the piece clicked was active, deactive it
		} else if ($(this).css('border-radius') == '8px') {
			deactivate_piece($(this));
		}
	});

	// duplicate sequence button event listener
	$('.pad').on('click', '.remove_all_pads', function (event) {
		// if the seuquence is currently running, pause it
		if (sequence_running) {
			$('.play_sequence').click();
		}

		// remove all pads but the first one
		$('body').find('.pad:not(:first)').remove();

		// reorder all pad piece id attributes
		reorder_pad_pieces();
	});

	// when a remove pad button is clicked
	$('.pad').on('click', '.remove_pad', function (event) {
		if (sequence_running) {
			$('.play_sequence').click();
		}

		// remove that pad
		$(this).parents('.pad:eq(0)').remove();

		// and reorder all of the pad piece id attributes again
		reorder_pad_pieces();
	});

	// when a sample selection is made
	$('.selects').on('change', '.select', function (event) {
		// clear the currently selected options array
		get_selected_options();
		// refresh data
		reorder_pad_pieces();
		set_audio_elements();
	});
});


/*-----------------------*/
/* PAD PIECE INTERACTION */
/*-----------------------*/

// activate a pad piece
function activate_piece(piece) {
	piece.attr('data-state', 'active');

	// incrementing the counter (for column sample stack cap)
	activated_pad_pieces++;

	// for keeping track of which sound_paths index needs to be altered
	var number_active_in_column = 0;
	// set up the sound path string
	var sound_paths = [];
	var pid = piece.attr('id');

	// for each piece in the same column
	piece.parents('.pad').find('.pad_piece[id^="' + pid.substring(0, pid.indexOf('-')) + '"][data-state="active"]').each(function () {
		// get the x coordinate of the clicked piece's id attribute
		var sound_index = $(this).attr('id').split('-')[1];
		// get a reference to the select element for the clicked piece's row
		var selected_select = $('.selects_item .select').eq(sound_index - 1);

		// get the first class from that select element and parse it
		var selected_select_class = selected_select.attr('class').split(" ")[0];
		var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');
		// continue building sound path
		sound_paths[number_active_in_column] = 'samples/' + class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-') + '.mp3';

		// incremenet tracker
		number_active_in_column++;
	});

	// gets the last column's coordinate value
	var temp_index = parseInt(piece.attr('id').substring(0, piece.attr('id').indexOf('-'))) - 1;

	// and sets that index of sequence_sample_paths to the array containing the new pad pieces
	sequence_sample_paths[temp_index] = sound_paths;
}

// deactivate a pad piece
function deactivate_piece(piece) {
	piece.attr('data-state', 'inactive');

	// decrement the variables tracking the number of active pieces
	activated_pad_pieces--;

	// get the x-coordinate of the clicked piece
	var temp_index = parseInt(piece.attr('id').substring(0, piece.attr('id').indexOf('-'))) - 1;
	// get the y-coordinate of the clicked piece
	var sound_index = parseInt(piece.attr('id').split('-')[1]);
	// get a reference to the select element for the clicked piece's row
	var selected_select = $('.selects_item .select').eq(sound_index - 1);
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

// reorder all pad piece id attributes
function reorder_pad_pieces() {
	// for each pad
	for (var pads = 0; pads < $('body').find('.pad').length; pads++) {
		// get a reference to the pad
		var temporary_pad_reference = $('.pad').eq(pads);

		// for each row in that pad
		for (var row = 1; row < 9; row++) {
			// and for each column in that pad
			for (var column = 1; column < 9; column++) {
				// grab the appropriate pad piece by id and give that attribute a new value according to the current pad index
				var temporary_piece_reference = temporary_pad_reference.find('.pad_piece[id$="' + row + '"]').eq(column - 1);
				temporary_piece_reference.attr({
					'id' : (column + (8 * pads)) + '-' + temporary_piece_reference.attr('id').split('-')[1],
					'data-x' : (column + (8 * pads)),
					'data-y' : temporary_piece_reference.attr('id').split('-')[1]
				});
			}
		}
	}
	
	setup_pad_manipulators();

	// creating and setting a new length for the sequence sample paths array
	var ssp_length = $('body').find('.pad').length * 8;

	sequence_sample_paths.length = ssp_length;

	// for each index of the newly sized array
	for (var i = 0; i < ssp_length; i++) {
		// start building sample path string entry
		var sound_paths = ['samples/'];

		// find any active piece whose id attribute matches the appropriate x value
		var active_piece_id = '';
		var piece_count = 0;

		$('.pad_piece[id^="' + (i + 1) + '-"][data-state="active"]').each(function () {
			active_piece_id = $(this).attr('id');

			// grab the row index of the peice
			var sound_index = active_piece_id.split('-')[1];
			// and use it to grab the appropriate sample selection element
			var selected_select = $('.selects .select').eq(sound_index - 1);
			// use the first class of the referenced select element to continue building sample path
			var selected_select_class = selected_select.attr('class').split(" ")[0];
			var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');

			// use the currently selected option from that select element for the same reason
			sound_paths[piece_count] = 'samples/' + class_trim + '/' + selected_select.find('option:selected').val();

			// set the index of the sequence sample paths array to the newly formed sample path
			sequence_sample_paths[i] = sound_paths;

			piece_count++;
		});

		if (piece_count == 0) {
			sequence_sample_paths[i] = 'samples/none.mp3';
		}
	}
}

function setup_pad_manipulators() {
	// remove visual pad flow indicators
	$('.sequence_flow_arrow').remove();
	$('.duplicate_pad').css('display', 'initial');

	var sequence_flow_arrow = '<p class="sequence_flow_arrow" style="position: absolute; font-size: 20px; margin: auto; margin-left: 166.5px; margin-top: 136px; color: rgba(00, 00, 00, 0.1);">⇨</p>';
	var remove_all_pads = '<input class="remove_all_pads pad_manipulator cursor_pointer box_shadowed_hover" type="button" value="remove all pads">';

	// for each duplicate pad button
	for (var i = 0; i < $('body').find('.duplicate_pad').length; i++) {
		// append the pad number to the text being displayed
		$('.duplicate_pad').eq(i).val('duplicate pad ' + (i + 1));

		// for each pad index above 0
		if (i > 0) {
			// append visual pad flow inficators to appropriate range of pads
			$('.duplicate_pad').eq(i - 1).parents('.pad').append(sequence_flow_arrow);

			// situate the remove all pads button
			if ($('.pad:eq(1)').find('.remove_all_pads').length == 0) {
				$('.remove_all_pads').remove();

				$('.pad:eq(1)').append(remove_all_pads);
			}

			// if the pad cap is active, remove the duplicate pad buttons
			if (i == 31) {
				$('.duplicate_pad').css('display', 'none');
			}
		}
	}
}