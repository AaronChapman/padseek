var calculated_tempo = 500;
var current_row_in_sequence = 1;

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

function play_sequence() {
	$('.pad_piece').each(function() {
		console.log($(this).attr('id').charAt(2));

		console.log(current_row_in_sequence.toString());
		
		if ($(this).attr('id').charAt(2) === current_row_in_sequence.toString()) {
			console.log('current row');
			$(this).css({'min-width':'15px','margin':'10px','height':'15px'});
		} else {
			$(this).css({'min-width':'25px','margin':'5px','height':'25px'});
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
	});
	
	$('.play_sequence').click(function() {
		calculate(parseInt($('.tempo_field').val()));
	});
});