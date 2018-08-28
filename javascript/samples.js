// p a d s e e k
// samples


/*-------------------------*/
/* SAMPLE SWAPPING ACTIONS */
/*-------------------------*/

// when the document is ready for us
$(document).ready(function () {
	// reference that gets attached to any sample swap button clicked
	var swapper_clicked = $('.change_sample_type:first');

	// this is where the reference gets set
	$('body').on('click', '.change_sample_type', function () {
		swapper_clicked = $(this);

		// bring up the sample swapper overlay
		$('.sample_swap_overlay').css({
			'opacity': '1',
			'z-index': '2'
		});
	});

	// when the confirm sample swap button is clicked
	$('.swap_sample_type').click(function () {
		// determine which sample type select needs to change
		var select_to_change = $('.selects .select').eq(swapper_clicked.parents('li:eq(0)').index());

		// set its new class attribute
		select_to_change.attr('class', $('.sample_swap_select').find(":selected").val() + ' select cursor_pointer');

		// get the first class of the new attribute
		var new_select_directory = select_to_change.attr('class').split(' ')[0];
		var new_sound_paths = [];

		// depending on which class is returned, set the new sound paths variable to that sample type
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

		// parse class to get sample directory name
		new_select_directory = new_select_directory.substring(0, new_select_directory.length - 7).replace('_', '-');
		// update the sample directories object with the appropriate directories and sound paths
		sample_directories[select_to_change.parent().index()].directory = new_select_directory;
		sample_directories[select_to_change.parent().index()].sound_paths = new_sound_paths;
		// and update the current sequence sample paths
		sequence_sample_paths[select_to_change.parent().index()] = sample_directories[select_to_change.parent().index()].sound_paths[0];

		// fill up the new select options
		fill_select_options();
		// set up the sample type labels
		set_sample_labels();
		// update the selected options
		get_selected_options();
		// update pad pieces
		reorder_pad_pieces();
		// set up the audio tags
		set_audio_elements();

		// and hide the overlay
		$('.sample_swap_overlay').css({
			'opacity': '0'
		});

		setTimeout(function () {
			$('.sample_swap_overlay').css({
				'z-index': '-1'
			});
		}, 250);
	});

	$('.frequency_range').slider({
		range: true,
		min: 20,
		max: 20000,
		values: [20, 20000],
		slide: function (event, ui) {
			//set new frequency range on filter
			update_frequencies();
		}
	});

	function update_frequencies() {
		$('.eq_data').each(function () {
			var sample_slider = $(this).parents('.selects_item').find('.frequency_range');
			$(this).parents('.selects_item').find('.eq_data.low_cut').text(sample_slider.slider('values', 0) + ' hz');
			$(this).parents('.selects_item').find('.eq_data.high_cut').text(sample_slider.slider('values', 1) + ' hz');
		});
	}
});