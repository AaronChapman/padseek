$(document).ready(function() {
	$('.random_sequence').click(function() {
		var indices = [];
				
		$('.pad_piece').each(function() {
			var id_reference = $(this).attr('id').substring(0, $(this).attr('id').indexOf('-'));
			
			indices.push[id_reference];
		});
	});
});