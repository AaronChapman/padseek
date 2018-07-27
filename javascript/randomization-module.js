// p a d s e e k
// randomization module


/*----------------------------*/
/* RANDOMIZED DATA SELECTIONS */
/*----------------------------*/

// when the document is ready
$(document).ready(function() {
	// when the randomize button is clicked
	$('.randomize').click(function() {
		// if the user has chosen to generate a random number of pads
		if ($('.random_number_of_pads').attr('data-activated') == 'true') {
			var pad_lengths = [1, 2, 3, 4, 6, 8];
			
			// randomly determine the number of pads to generate
			var random_number = pad_lengths[Math.floor(Math.random() * pad_lengths.length)] - 1;
			
			// remove all pads except the first one
			$('.pad:not(:first)').each(function() { $(this).remove(); });
			
			// duplicate the appropriate number of pads
			for (var i = 0; i < random_number; i++) { $('.duplicate_pad:last').click(); }
			
			$('.remove_all_pads:not(:first)').remove();
		}
		
		// if the user has chosen to select random sample options
		if ($('.random_sample_selection').attr('data-activated') == 'true') {
			selected_options = [];
			
			// for each select element
			for (var i = 0; i < $('body').find('.selects .selects_item .select').length; i++) {
				// select a random option
				var temporary_select = $('.select:eq(' + i + ')');
				var options = temporary_select.find('option');

				options.eq(~~(Math.random() * options.length)).prop('selected', true);
				
				// psuh the newly selected option to the selected options array
				selected_options.push($('.selects .select').eq(i).find('option:selected').val());
				
				reorder_pad_pieces();
				set_audio_elements();
			}
		}
		
		// get a reference to the x value from the id of the last pad piece attribute
		var x_id_reference = parseInt($('.pad_piece:last').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
		
		// if the user has chosen to have their pad pieces arranged randomly
		if ($('.random_pad_arrangement').attr('data-activated') == 'true') {
			// choose random pad pieces for each column and activate them
			for (var i = 0; i < x_id_reference; i++) {
				var y_id_reference = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
				var id_reference_to_activate = $('#' + (i + 1) + '-' + y_id_reference);
				
				// add variance for empty beats
				var possible_none = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
				
				if (possible_none != 2) {
					id_reference_to_activate.click();
				}
			}
		}
		
		// if the user has chosen to generate a random tempo
		if ($('.random_tempo').attr('data-activated') == 'true') {
			$('.tempo_field').val(Math.floor(Math.random() * (240 - 62 + 1)) + 62);
		}
	});

	// when a checkbox inside the randomization module is clicked
	$('.randomization_checkbox').click(function() {
		// determine what its data-activated attribute value should be
		if ($(this).attr('data-activated') === 'false') {
			$(this).attr('data-activated', 'true');
		} else {
			$(this).attr('data-activated', 'false');
		}
	});
});