$(document).ready(function() {
	var random_sample_selection_active = false;
	var random_pad_pieces_active = false;
	
	$('.randomize').click(function() {
		var x_id_reference = parseInt($('.pad_piece:last').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
		
		if (random_pad_pieces_active) {
			for (var i = 0; i < x_id_reference; i++) {
				var y_id_reference = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
				var id_reference_to_activate = $('#' + i + '-' + y_id_reference);
			
				id_reference_to_activate.click();
			}
		}
		
		if (random_sample_selection_active) {
			for (var i = 0; i < $('body').find('.selects .selects_item .select').length; i++) {
				var temporary_select = $('.select:eq(' + i + ')');
				var options = temporary_select.find('option');

				options.eq(~~(Math.random() * options.length)).prop('selected', true);
			}
		}
	});
	
	$('.random_sample_selection').click(function() {
		if (random_sample_selection_active === false) {
			random_sample_selection_active = true;
		} else {
			random_sample_selection_active = false;
		}
	});
	
	$('.random_pad_pieces').click(function() {
		if (random_pad_pieces_active === false) {
			random_pad_pieces_active = true;
		} else {
			random_pad_pieces_active = false;
		}
	});
});