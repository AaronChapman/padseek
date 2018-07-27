// p a d s e e k
// playing samples


/*---------------------*/
/* SAMPLE MANIPULATION */
/*---------------------*/

// plays the currently selected sample for that type
function sample_sample(select_index) {
	$('.sample_element').eq(select_index).each(function() { this.play(); });
}

// setup or update the audio elements
function set_audio_elements() {
	// if there aren't any, generate them
	if ($('.audio_tags').find('.sample_element').length == 0) {
		for (var i = 0; i < selected_options.length; i++) {
			$('.audio_tags').append('<audio class="sample_element" src="samples/' + sample_directories[i].directory + '/' + selected_options[i] + '" preload="auto"></audio>');
		}
	// if there are already audio elements present
	} else {
		// for each sample type
		for (var i = 0; i < selected_options.length; i++) {
			// replace src attributes of any audio element in sequence that doesn't match the current selected option index
			if ($('.sample_element').eq(i).attr('src').indexOf(selected_options[i]) == -1) {
				$('.sample_element').eq(i).before('<audio class="sample_element" src="samples/' + sample_directories[i].directory + '/' + selected_options[i] + '" preload="auto"></audio>');

				$('.sample_element').eq(i).next().remove();
			}
		}
	}
}