// p a d s e e k
// pad manipulation

// when the document is ready
$(document).ready(function() {
	// duplicate pad button event listener
	$('.pad').on('click', '.duplicate_pad', function(event) {
		// clone element and its event listeners
		var new_pad = $(this).parents('.pad:eq(0)').clone(true, true);

		// set css properties
		new_pad.css({'margin-left':'30px'});
		// append a button for pad removal
		new_pad.prepend('<input class="remove_pad pad_manipulator cursor_pointer" type="button" value="remove">');

		// insert the new pad element in its appropraite position
		$(this).parents('.pad:eq(0)').after(new_pad);

		// reorder all pad piece id attributes
		reorder_pad_pieces();
	});
	
	// when a remove pad button is clicked
	$('.pad').on('click', '.remove_pad', function(event) {
		// remove that pad
		$(this).parents('.pad:eq(0)').remove();
			
		// and reorder all of the pad piece id attributes again
		reorder_pad_pieces();
	});
	
	//something went wrong
	
	// when a sample selection is made
	$('.selects').on('change', '.select', function(event) {
		// get a reference to the select whose selected option changed
		var sample_type_select_changed = $(this);
		// get & parse the text from that selected option 
		var new_selection = sample_type_select_changed.find('option:selected').text().replace(/ /g, '-') + '.mp3';
		// get the DOM index the select element we're working with
		var new_selection_select_index = sample_type_select_changed.parent().index();
		// trim off the selects first class to build the sample directory portion of our sample string
		var selected_select_class = sample_type_select_changed.attr('class').split(" ")[0];
		// parse that class string
		var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');
		
		// for each item in the array of sequence sample paths
		sequence_sample_paths.forEach(function(item) {
			// if the item is equal to the item that was last selected (where the new option lies)
			if (item == 'samples/' + class_trim + '/' + selected_options[new_selection_select_index]) {
				// set those indexes of the sequence sample paths array to the newly selected sample data
				sequence_sample_paths[sequence_sample_paths.indexOf(item)] = 'samples/' + class_trim + '/' + new_selection;
			}
		});
		
		// update the selected options array so we can keep tracking new option selections
		selected_options[new_selection_select_index] = new_selection;
	});
});

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
				temporary_piece_reference.attr({'id':(column + (8 * pads)) + '-' + temporary_piece_reference.attr('id').split('-')[1]});
			}
		}
	}

	// creating and setting a new length for the sequence sample paths array
	var ssp_length = $('body').find('.pad').length * 8;

	sequence_sample_paths.length = ssp_length;

	// for each index of the newly sized array
	for (var i = 0; i < ssp_length; i++) {
		// start building sample path string entry
		var sound_path = 'samples/';

		// find any active piece whose id attribute matches the appropriate x value
		var active_piece_id = $('.pad_piece[id^="' + (i + 1) + '-"][data-state="active"]').attr('id');

		// if a piece was found
		if (active_piece_id) {
			// grab the row index of the peice
			var sound_index = active_piece_id.split('-')[1];
			// and use it to grab the appropriate sample selection element
			var selected_select = $('.select').eq(sound_index - 1);
			// use the first class of the referenced select element to continue building sample path
			var selected_select_class = selected_select.attr('class').split(" ")[0];
			var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');

			// use the currently selected option from that select element for the same reason
			sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-') + '.mp3';

			// set the index of the sequence sample paths array to the newly formed sample path
			sequence_sample_paths[i] = sound_path;
		} else {
			// if no active piece was found in that column, set the sample be none
			sequence_sample_paths[i] = 'samples/none.mp3';
		}
	}
}