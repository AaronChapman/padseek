var config = {
	apiKey: "AIzaSyAnQBTNzsGBiAS5BJhDNmRKEJn9QPB4mFA",
	authDomain: "padseek-oylo-info.firebaseapp.com",
	databaseURL: "https://padseek-oylo-info.firebaseio.com",
	projectId: "padseek-oylo-info",
	storageBucket: "padseek-oylo-info.appspot.com",
	messagingSenderId: "573441583035"
};

firebase.initializeApp(config);

var database = firebase.database();
var entries = [];

database.ref().on("value", function(snapshot) {
	shared_sequences = snapshot.val().shared_sequences;

	for (var i = 0; i < shared_sequences.length; i++) {
		update_shared_sequences_container(shared_sequences[i]);
	}
}, function(errorObject) {
	console.log("errors handled: " + errorObject.code);
});

// use later for naming sequence button
/*$(document).keypress(function(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);

	if (keycode == '13')
		actually_send_message();
});*/

function update_firebase() {
	database.ref().set({
		shared_sequences: shared_sequences
	});
}

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
	
	console.log(new_JSON_object);
	
	shared_sequences.push(new_JSON_object);
	update_shared_sequences_container(new_JSON_object);
	
	update_firebase();
}

function update_shared_sequences_container(new_JSON_object) {
	$('.shared_sequences').empty();
	$('.shared_sequences').append('<label class="label">browse recently shared sequences<br>⬇</label>');
	
	for (var i = 0; i < shared_sequences.length; i++) {
		var converted_object = JSON.stringify(shared_sequences[i]);
		
		$('.shared_sequences').append(`<input class='shared_sequence cursor_pointer box-shadowed-hover' type='button' data-json='` + converted_object + `' value='` + shared_sequences[i].name + `'>`);
	}
	
	console.log(shared_sequences);
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
	
	for (var i = 0; i < converted_object.active_pieces.length; i++) {
		$('#' + converted_object.active_pieces[i]).css({'opacity':'1.0','background':'white'});
		$('#' + converted_object.active_pieces[i]).attr('data-state', 'active');
	}
	
	for (var i = 0; i < converted_object.sample_paths.length; i++) {
		console.log(converted_object.sample_paths[i]);
		
		$('.selects .select').eq(i).find('option[value="' + converted_object.sample_paths[i] + '"]').prop('selected', true);
	}
	
	selected_options = converted_object.sample_paths;
	
	$('.tempo_field').val(converted_object.tempo);
}

$(document).ready(function() {
	$('body').on('click', '.shared_sequence', function() {
    set_sequence_from_JSON($(this).attr('data-json'));
	});
	
	$('body').on('click', '.share_sequence', function() {
		if ($('body').find('.pad_piece[data-state="active"]').length > 0) {
			remove_shortcuts();
			
			$('.name_sequence_overlay').css({'opacity':'0.95', 'z-index':'2'});
		}
	});
	
	$('body').on('click', '.name_and_share_sequence', function() {
		if (($('.name_sequence').val().length > 1) &&
				($('.name_sequence').val().indexOf("'") == -1) &&
				($('.name_sequence').val().indexOf('"') == -1) &&
			 	($('.name_sequence').val().indexOf("`") == -1)) {
			share_sequence_data();
			
			set_shortcuts();
			
			$('.name_sequence_overlay').css({'opacity':'0', 'z-index':'-1'});
		}
	});
});