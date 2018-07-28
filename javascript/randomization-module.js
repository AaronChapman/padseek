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
			if (sequence_running) {
				$('.play_sequence').click();

				current_row_in_sequence = 1;
			}
			
			// a few good starter pad sizes
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
				
				// push the newly selected option to the selected options array
				selected_options.push($('.selects .select').eq(i).find('option:selected').val());
				
				reorder_pad_pieces();
				set_audio_elements();
			}
		}
		
		// if the user has chosen to have their pad pieces arranged randomly
		if ($('.random_pad_arrangement').attr('data-activated') == 'true') {
			$('.clear_selections').click();
			
			// on each pad element
			$('.pad').each(function() {
				// get a reference to the x value from the id of the first & last pad pieces
				var first_x_value = parseInt($(this).find('.pad_piece:first').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
				var last_x_value = parseInt($(this).find('.pad_piece:last').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
				
				// click up to 20 random pieces
				for (var clicked_pieces = 0; clicked_pieces < 20; clicked_pieces++) {
					var x_portion = Math.floor(Math.random() * last_x_value) + first_x_value;
					var y_portion = Math.floor(Math.random() * 8) + 1;
					var piece_id = $('#' + x_portion + '-' + y_portion);
					
					piece_id.click();
				}
			});
		}
		
		// if the user has chosen to generate a random tempo
		if ($('.random_tempo').attr('data-activated') == 'true') {
			$('.tempo_field').val(Math.floor(Math.random() * (240 - 62 + 1)) + 62);
			
			// calculate tempo
			calculate(parseInt($('.tempo_field').val()));
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