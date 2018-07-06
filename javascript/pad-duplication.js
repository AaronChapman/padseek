$(document).ready(function() {
	// duplicate pad
	$('.duplicate_pad').click(function() {
		console.log('clicked');
		// clone element and its event listeners
		var new_pad = $(this).parents('.pad:eq(0)').clone(true, true);

		// set extra css
		new_pad.css({'margin-left':'30px'});

		new_pad.find('.pad_piece').each(function() {
			var piece_id = $(this).attr('id');
			var x_index = piece_id.substring(0, piece_id.indexOf('-'));
			var y_index = piece_id.split('-')[1];
			var x_index_conversion = parseInt(x_index) + 8;

			$(this).attr({'id':x_index_conversion + '-' + y_index});
		});

		$(this).parents('.pad:eq(0)').after(new_pad);

		for (var pads = 0; pads < $('body').find('.pad').length; pads++) {
			var temporary_pad_reference = $('.pad').eq(pads);

			for (var row = 1; row < 9; row++) {
				for (var column = 1; column < 9; column++) {
					var temporary_piece_reference = temporary_pad_reference.find('.pad_piece[id$="' + row + '"]').eq(column - 1);
					temporary_piece_reference.attr({'id':(column + (8 * pads)) + '-' + temporary_piece_reference.attr('id').split('-')[1]});
				}
			}
		}

		var ssp_length = sequence_sample_paths.length;

		for (var i = 0; i < $('body').find('.pad').length * 8; i++) {
			var sound_path = 'samples/';

			// get the first character of the clicked piece's id attribute
			var active_piece_id = $('.pad_piece[id^="' + (i + 1) + '-"][data-state="active"]').attr('id');

			if (active_piece_id) {
				var sound_index = active_piece_id.split('-')[1];
				var selected_select = $('.select').eq(sound_index - 1);
				var selected_select_class = selected_select.attr('class').split(" ")[0];
				var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');

				sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-');

				sequence_sample_paths[i] = sound_path;
			} else {
				sequence_sample_paths[i] = 'samples/none.mp3';
			}
		}
	});
});