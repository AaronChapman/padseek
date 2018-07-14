// p a d s e e k
// randomization module



function force_random() {
	setTimeout(function() {
		$('.randomize').click();
	}, 100);
}

// when the document is ready
$(document).ready(function() {
	// when the randomize button is clicked
	$('.randomize').click(function() {
		if ($('.random_number_of_pads').attr('data-activated') == 'true') {
			var random_number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
			
			$('.pad:not(:first)').each(function() { $(this).remove(); });
			
			for (var i = 0; i < random_number; i++) { $('.duplicate_pad:first').click(); }
		}
		
		// get a reference to the x value from the id of the last pad piece attribute
		var x_id_reference = parseInt($('.pad_piece:last').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
		
		// if the pad arrangement checkbox is selected
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
		
		// if the random sample selection checkbox is selected
		if ($('.random_sample_selection').attr('data-activated') == 'true') {
			// for each select element
			for (var i = 0; i < $('body').find('.selects .selects_item .select').length; i++) {
				// select a random option
				var temporary_select = $('.select:eq(' + i + ')');
				var options = temporary_select.find('option');

				options.eq(~~(Math.random() * options.length)).prop('selected', true);
			}
		}
		
		if ($('.random_tempo').attr('data-activated') == 'true') {
			$('.tempo_field').val(Math.floor(Math.random() * (240 - 62 + 1)) + 62);
		}
	});

	$('.randomization_checkbox').click(function() {
		if ($(this).attr('data-activated') === 'false') {
			$(this).attr('data-activated', 'true');
		} else {
			$(this).attr('data-activated', 'false');
		}
	});
});