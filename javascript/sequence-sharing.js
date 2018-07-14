function share_sequence_data() {
	var name = $('.name_sequence').val();
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
	$('.shared_sequences').empty();
	$('.shared_sequences').append('<label class="label">browse community sequences</label>');
	
	for (var i = 0; i < shared_sequences.length; i++) {
		var converted_object = JSON.stringify(shared_sequences[i]);
		
		$('.shared_sequences').append(`<input class='shared_sequence cursor_pointer box-shadowed-hover' type='button' data-json='` + converted_object + `' value='` + shared_sequences[i].name + `'>`);
	}
}

function set_sequence_from_JSON(new_JSON_object) {
	var converted_object = JSON.parse(new_JSON_object);
	var last_active_pad_piece = converted_object.active_pieces[converted_object.active_pieces.length - 1];
	var last_piece_parsed = last_active_pad_piece.substring(0, last_active_pad_piece.indexOf('-'));
	var number_of_pads_to_generate = (parseInt(last_piece_parsed) - 1) / 8;
	var number_of_pads_parsed = Math.floor(number_of_pads_to_generate);
	
	$('.pad:not(:first)').remove();
	$('.clear_selections').click();
	
	for (var i = 0; i < number_of_pads_parsed; i++) {
		$('.pad:first .duplicate_pad').click();
	}
	
	$('.tempo_field').val(converted_object.tempo);
	
	for (var i = 0; i < converted_object.active_pieces.length; i++) {
		$('#' + converted_object.active_pieces[i]).css({'opacity':'1.0','background':'white'});
	}
}

$(document).ready(function() {
	$('body').on('click', '.shared_sequence', function() {
    set_sequence_from_JSON($(this).attr('data-json'));
	});
	
	$('body').on('click', '.share_sequence', function() {
		$('.name_sequence_overlay').css({'opacity':'0.95', 'z-index':'2'});
		//$('.name_sequence').focus();
	});
	
	$('body').on('click', '.name_and_share_sequence', function() {
		if (($('.name_sequence').val().length > 1) &&
				($('.name_sequence').val().indexOf("'") == -1) &&
				($('.name_sequence').val().indexOf('"') == -1) &&
			 	($('.name_sequence').val().indexOf("`") == -1)) {
			share_sequence_data();
			
			$('.name_sequence_overlay').css({'opacity':'0', 'z-index':'-1'});
		}
	});
});