// p a d s e e k
// samples


/*-------------------------*/
/* SAMPLE SWAPPING ACTIONS */
/*-------------------------*/

// when the document is ready for us
$(document).ready(function () {
	var swapper_clicked = $('.change_sample_type:first');

	// this is where the reference gets set
	$('body').on('click', '.change_sample_type', function () {
		$('.rotating').css({
			'fill': 'none',
			'opacity': '0.3'
		});
		$('.rotating').removeClass('rotating');

		swapper_clicked = $(this);
		swapper_clicked.addClass('rotating');
		swapper_clicked.css({
			'fill': '#738290',
			'opacity': '0.6'
		});

		// bring up the sample swapper overlay
		$('.sample_swap_overlay').css({
			'opacity': '1',
			'z-index': '2'
		});
		
		$('.old_sample_type').prevAll('br').eq(0).remove();
		$('.old_sample_type').remove();
				
		var old_sample_type = $('.selects .select').eq(swapper_clicked.parents('.labels_item').index()).clone();
		var old_sample_selection = $('.selects .select').eq(swapper_clicked.parents('.labels_item').index()).find(':selected').val();
				
		old_sample_type.css({'background':'floralwhite', 'margin-top':'25px', 'opacity':'0.75'}).attr('disabled', 'true').addClass('old_sample_type').removeClass('cursor_pointer');
		old_sample_type.find('option[value="' + old_sample_selection + '"]').prop('selected', true);
				
		$('.sample_swap_overlay .sample_swap_select').before(old_sample_type, '<br>');
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

		$('.change_sample_type').css({
			'fill': 'none',
			'opacity': '0.3'
		});
		$('.rotating').removeClass('rotating');

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

	$('.ui-slider-handle').mouseup(function () {
		var parent_item = $(this).parents('.selects_item')
		
		sample_filters[parent_item.index()].low_cut.frequency.value = parseInt(parent_item.find('.eq_data.low_cut').text().trim());
		sample_filters[parent_item.index()].high_cut.frequency.value = parseInt(parent_item.find('.eq_data.high_cut').text().trim());
	});

	function update_sample_filter(slider, sample_type_row) {
		// change this method to update filter, and update the changed object in the array
		// store array in firebase (meaning convert_sequence_to_JSON)
		// and make a check for if firebase object doesn't have key, if so, just display default values
	}
});

function create_sample_filters() {
	var audio_context = new(window.AudioContext || window.webkitAudioContext)();
	
	$('audio').each(function() {
		var sample_to_filter = $(this)[0];

		var gain = audio_context.createGain();
		var low_cut = audio_context.createBiquadFilter();
		var high_cut = audio_context.createBiquadFilter();
		
		source = audio_context.createMediaElementSource(sample_to_filter);
		
		source.connect(low_cut);
		low_cut.connect(high_cut);
		high_cut.connect(gain);
		gain.connect(audio_context.destination);
		
		low_cut.type = "lowpass";
		low_cut.frequency.value = 20;
		low_cut.gain.value = -1;
		
		high_cut.type = "highpass";
		high_cut.frequency.value = 20000;
		high_cut.gain.value = -1;
		
		var new_filter_object = {low_cut, high_cut};
		
		sample_filters.push(new_filter_object);
	});
}