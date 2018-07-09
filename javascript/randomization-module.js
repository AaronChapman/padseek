// p a d s e e k
// randomization module

// when the document is ready
$(document).ready(function() {
	// create checkbox state variables
	var random_sample_selection_active = true;
	var random_pad_arrangement_active = true;
	
	// when the randomize button is clicked
	$('.randomize').click(function() {
		// get a reference to the x value from the id of the last pad piece attribute
		var x_id_reference = parseInt($('.pad_piece:last').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
		
		// if the pad arrangement checkbox is selected
		if (random_pad_arrangement_active) {
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
		if (random_sample_selection_active) {
			// for each select element
			for (var i = 0; i < $('body').find('.selects .selects_item .select').length; i++) {
				// select a random option
				var temporary_select = $('.select:eq(' + i + ')');
				var options = temporary_select.find('option');

				options.eq(~~(Math.random() * options.length)).prop('selected', true);
			}
		}
	});
	
	// set states of the random sample selection boolean via the associated checkbox
	$('.random_sample_selection').click(function() {
		if (random_sample_selection_active === false) {
			random_sample_selection_active = true;
		} else {
			random_sample_selection_active = false;
		}
	});
	
	// set states of the random pad arrangement boolean via the associated checkbox
	$('.random_pad_pieces').click(function() {
		if (random_pad_arrangement_active === false) {
			random_pad_arrangement_active = true;
		} else {
			random_pad_arrangement_active = false;
		}
	});
});