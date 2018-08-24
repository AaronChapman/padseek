$(document).ready(function () {
	var swapper_clicked = $('.change_sample_type:first');
	
	$('body').on('click', '.change_sample_type', function () {
		swapper_clicked = $(this);
		
		$('.sample_swap_overlay').css({
			'opacity': '1',
			'z-index': '2'
		});
	});

	$('.swap_sample_type').click(function () {
		var select_to_change = $('.selects .select').eq(swapper_clicked.parents('li:eq(0)').index());
		
		select_to_change.attr('class', $('.sample_swap_select').find(":selected").val() + ' select cursor_pointer');
		
		var new_select_directory = select_to_change.attr('class').split(' ')[0];
		var new_sound_paths = [];
		
		if (new_select_directory == 'sound_effects_select') {
			new_sound_paths = sound_effects;
		} else if (new_select_directory == 'crash_cymbals_select') {
			new_sound_paths = crash_cymbals;
		} else if (new_select_directory == 'ride_cymbals_select') {
			new_sound_paths = ride_cymbals;
		} else if (new_select_directory == 'open_hi_hats_select') {
			new_sound_paths = open_hi_hats;
		} else if (new_select_directory == 'closed_hi_hats_select') {
			new_sound_paths = closed_hi_hats;
		} else if (new_select_directory == 'snares_select') {
			new_sound_paths = snares;
		} else if (new_select_directory == 'kick_drums_select') {
			new_sound_paths = kick_drums;
		}
		
		new_select_directory = new_select_directory.substring(0, new_select_directory.length - 7).replace('_', '-');
		sample_directories[select_to_change.parent().index()].directory = new_select_directory;
		sample_directories[select_to_change.parent().index()].sound_paths = new_sound_paths;
		sequence_sample_paths[select_to_change.parent().index()] = sample_directories[select_to_change.parent().index()].sound_paths[0];
		
		fill_select_options();
		set_sample_labels();
		get_selected_options();
		reorder_pad_pieces();
		set_audio_elements();
		
		$('.sample_swap_overlay').css({
			'opacity': '0',
			'z-index': '-1'
		});
	});
});