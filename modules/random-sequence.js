$(document).ready(function() {
	$('.random_sequence').click(function() {
		var x_id_reference = parseInt($('.pad_piece:last').attr('id').substring(0, $('.pad_piece:last').attr('id').indexOf('-')));
		
		for (var i = 0; i < x_id_reference; i++) {
			var y_id_reference = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
			var id_reference_to_activate = $('#' + i + '-' + y_id_reference);
			
			id_reference_to_activate.click();
		}
	});
});
//set random options