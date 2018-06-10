var sequence_running = false;
var calculated_tempo = 125;
var current_row_in_sequence = 1;
var crash_cymbals = ['thin-cymbal.wav'];
var ride_cymbals = ['tribal-ride.wav'];
var open_hi_hats = ['meaty-hi-hat.wav','thin-hi-hat.wav'];
var closed_hi_hats = ['light-hi-hat.wav'];
var snares = ['circus-snare.wav','marching-band-snare.wav'];
var kick_drums = ['prehistor-khick.wav','thumpy-kick.wav'];
var miscellaneous_percussion = ['radio-transmissions.wav'];
var sample_directories = [{directory: 'crash-cymbals', sound_paths: crash_cymbals},
						  {directory: 'ride-cymbals', sound_paths: ride_cymbals},
						  {directory: 'open-hi-hats', sound_paths: open_hi_hats},
						  {directory: 'closed-hi-hats', sound_paths: closed_hi_hats},
						  {directory: 'snares', sound_paths: snares},
						  {directory: 'kick-drums', sound_paths: kick_drums},
						  {directory: 'miscellaneous-percussion', sound_paths: miscellaneous_percussion}];


function calculate(tempo) {
	play_sequence();
}

function generate_pad() {
	var pad_reference = $('.pad');
	
	for (var i = 1; i < 9; i++) {
		for (var j = 1; j < 9; j++) {
			var pad_piece = $('<div>');
			
			pad_piece.addClass('pad_piece');
			pad_piece.attr({'id':j + '-' + i,'data-state':'inactive','data-columns':'0'});

			pad_reference.append(pad_piece);
		}
		
		var pad_ding = $('<br>');

		pad_reference.append(pad_ding);
	}
	
	generate_select_options();
}

function generate_select_options() {
	for (var i = 0; i < sample_directories.length; i++) {
		var select_reference = $('.select[class*="' + sample_directories[i].directory.replace(/-/g, '_') + '"]');

		for (var j = 0; j < sample_directories[i].sound_paths.length; j++) {
			select_reference.append('<option value="' +
									sample_directories[i].sound_paths[j] +'">' +  sample_directories[i].sound_paths[j].replace(/-/g, ' ') +
									'</option>');
		}
	}
}

//play sequence
function play_sequence() {
	//for each pad piece
	$('.pad_piece').each(function() {
		//if the first character in the piece's id attribute is equal to the current row in the sequence
		if ($(this).attr('id').charAt(0) === current_row_in_sequence.toString()) {
			//if the piece's data-state attribute is active
			if ($(this).attr('data-state') === "active") {
				var sound_path = 'samples/';
				var sound_index = parseInt($(this).attr('id').charAt(0));
				var selected_select = $('.select').eq(sound_index - 1);
				var selected_select_class = selected_select.attr('class').split(" ")[0];
				var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');
				
				sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-');
				
				$.play_sound(sound_path);
				
				$(this).css({'min-width':'20px','margin':'7.5px','height':'20px','opacity':'0.25'});
			} else {
				$(this).css({'min-width':'20px','margin':'7.5px','height':'20px','opacity':'0.75'});
			}
		} else {
			$(this).css({'min-width':'25px','margin':'5px','height':'25px','opacity':'1.0'});
		}
	});
	
	current_row_in_sequence++;
	
	if (current_row_in_sequence === 9) {
		current_row_in_sequence = 1;
	}
	
	setTimeout(function() {
		if (sequence_running) {
			play_sequence();
		} else {
			
		}
	}, calculated_tempo);
}

$(document).ready(function() {
	generate_pad();
	
	$('.pad_piece').click(function() {
		if ($(this).css('opacity') != '0.2') {
			$(this).css({'opacity':'0.2'});
			$(this).attr({'data-state':'active'});
		} else if ($(this).css('opacity') == '0.2') {
			$(this).css({'opacity':'1.0'});
			$(this).attr({'data-state':'inactive'});
		}
		
		var id_char = $(this).attr('id').charAt(0);
		
		if (id_char === "1")
			$('.select').eq(0).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '1-'});
		else if (id_char === "2")
			$('.select').eq(1).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '2-'});
		else if (id_char === "3")
			$('.select').eq(2).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '3-'});
		else if (id_char === "4")
			$('.select').eq(3).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '4-'});
		else if (id_char === "5")
			$('.select').eq(4).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '5-'});
		else if (id_char === "6")
			$('.select').eq(5).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '6-'});
		else if (id_char === "7")
			$('.select').eq(6).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '7-'});
		else if (id_char === "8")
			$('.select').eq(7).attr({'data-columns':$('.select').eq(0).attr('data-columns') + '8-'});
	});
	
	$('.play_sequence').click(function() {
		if (!sequence_running) {
			sequence_running = true;
			
			calculate(parseInt($('.tempo_field').val()));
		} else {
			sequence_running = false;
		}
	});
});