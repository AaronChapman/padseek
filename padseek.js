var calculated_tempo = 125;
var current_row_in_sequence = 1;
var sample_directories = ['crash-cymbals', 
						  'ride-cymbals', 
						  'open-hi-hats', 
						  'closed-hi-hats', 
						  'snares', 
						  'kick-drums', 
						  'miscellaneous-percussion'];
var crash_cymbals = ['thin-cymbal.wav'];
var ride_cymbals = ['tribal-ride.wav'];
var open_hi_hats = ['meaty-hi-hat.wav','thin-hi-hat.wav'];
var closed_hi_hats = ['light-hi-hat.wav'];
var snares = ['circus-snare.wav','marching-band-snare.wav'];
var kick_drums = ['prehistor-khick.wav','thumpy-kick.wav'];
var miscellaneous_percussion = ['radio-transmissions.wav'];


function calculate(tempo) {
	play_sequence();
}

function generate_pad() {
	var pad_reference = $('.pad');
	
	for (var i = 1; i < 9; i++) {
		for (var j = 1; j < 9; j++) {
			var pad_piece = $('<div>');
			
			pad_piece.addClass('pad_piece');
			pad_piece.attr({'id':i + '-' + j,'data-state':'inactive'});

			pad_reference.append(pad_piece);
		}
		
		var pad_ding = $('<br>');

		pad_reference.append(pad_ding);
	}
}

function generate_select_options() {
	for (var i = 0; i < sample_directories.length; i++) {
		$('.select[class*="' + sample_directories[i] + '"]').append('<option value="' + + '">' + + '</option>');
	}
}

function play_sequence() {
	$('.pad_piece').each(function() {
		if ($(this).attr('id').charAt(2) === current_row_in_sequence.toString()) {
			if ($(this).attr('data-state') === "active") {
				$.play_sound($('.select[data-columns*=' + $(this).attr('id').charAt(2) + ']'));
				
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
		play_sequence();
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
			$('.select').eq(0).attr('data-columns') = $('.select').eq(0).attr('data-columns') + "1-";
		else if (id_char === "2")
			$('.select').eq(1).attr('data-columns') = $('.select').eq(1).attr('data-columns') + "2-";
		else if (id_char === "3")
			$('.select').eq(2).attr('data-columns') = $('.select').eq(2).attr('data-columns') + "3-";
		else if (id_char === "4")
			$('.select').eq(3).attr('data-columns') = $('.select').eq(3).attr('data-columns') + "4-";
		else if (id_char === "5")
			$('.select').eq(4).attr('data-columns') = $('.select').eq(4).attr('data-columns') + "5-";
		else if (id_char === "6")
			$('.select').eq(5).attr('data-columns') = $('.select').eq(5).attr('data-columns') + "6-";
		else if (id_char === "7")
			$('.select').eq(6).attr('data-columns') = $('.select').eq(6).attr('data-columns') + "7-";
		else if (id_char === "8")
			$('.select').eq(7).attr('data-columns') = $('.select').eq(7).attr('data-columns') + "8-";
	});
	
	$('.play_sequence').click(function() {
		calculate(parseInt($('.tempo_field').val()));
	});
});