function share_sequence_data() {
	var name = 'sequence';
	var tempo = $('.tempo_field').val();
	var sample_paths = selected_options;
	var active_pieces = [];
	
	$('body').find('.pad_piece[data-state="active"]').each(function() {
		active_pieces.push($(this).attr('id'));
	});
	
	convert_sequence_to_JSON(name, tempo, sample_paths, active_pieces);
}

function convert_sequence_to_JSON(name, tempo, sample_paths, active_pieces) {
	var new_JSON_object = {name, tempo, sample_paths, active_pieces};
	
	shared_sequences.push(new_JSON_object);
	update_shared_sequences_container(new_JSON_object);
}

function update_shared_sequences_container(new_JSON_object) {
	var converted_object = JSON.stringify(new_JSON_object);
	
	$('.shared_sequences').empty();
	
	for (var i = 0; i < shared_sequences.length; i++) {
		$('.shared_sequences').append(`<input class='shared_sequence cursor_pointer box-shadowed-hover' type='button' data-json='` + converted_object + `' value='` + new_JSON_object.name + `'>`);
	}
}

function set_sequence_from_JSON(new_JSON_object) {
	var converted_object = JSON.parse(new_JSON_object);
	
	$('.tempo_field').val(converted_object.tempo);
	
	console.log('before setting active pieces');
	console.log(converted_object.active_pieces);
	
	for (var i = 0; i < converted_object.active_pieces.length; i++) {
		console.log(converted_object.active_pieces[i]);
		
		$('#' + converted_object.active_pieces[i]).css({'opacity':'1.0','background':'white'});
	}
}

$(document).ready(function() {
	$('body').on('click', '.shared_sequence', function() {
		console.log('shared sequence button clicked');
    set_sequence_from_JSON($(this).attr('data-json'));
	});
});