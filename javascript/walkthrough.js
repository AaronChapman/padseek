// p a d s e e k
// walkthrough script


/*------------*/
/* MANAGERIAL */
/*------------*/

// method of displaying the walkthrough container
$(document).ready(function () {
	$('.what_is_this').click(function (event) {
		event.preventDefault();
		
		$('body').find('h1, .github_button, .controls *, .sharing, .tempo, .randomization, .labels, .selects, .pad, .saved').css('opacity', '0.2');

		$('.walkthrough_overlay').css({
			'z-index': '5',
			'opacity': '1.0'
		});
	});
});

// walkthrough stage tracking
var walkthrough_stages = ['play sequence', 'shared sequences', 'sample selection', 'tempo', 'pad pieces', 'pad manipulation', 'sequence manipulation', 'clearing selections', 'randomization', 'finished walkthrough', 'close walkthrough'];
var current_stage = 'play sequence';

// fires every time the user presses 'next' in the walkthrough options window
function fire() {
	advance(walkthrough_stages[walkthrough_stages.indexOf(current_stage)]);
}

// called by firing the appropriate stage
function advance(stage) {
	// direct to the correct interface update method
	if (stage == 'play sequence') {
		walkthrough_play_sequence();
	} else if (stage == 'shared sequences') {
		walkthrough_shared_sequences();
	} else if (stage == 'sample selection') {
		walkthrough_sample_selection();
	} else if (stage == 'tempo') {
		walkthrough_tempo();
	} else if (stage == 'pad pieces') {
		walkthrough_pad_pieces();
	} else if (stage == 'clearing selections') {
		walkthrough_clearing_selections();
	} else if (stage == 'pad manipulation') {
		walkthrough_pad_manipulation();
	} else if (stage == 'sequence manipulation') {
		walkthrough_sequence_manipulation();
	} else if (stage == 'randomization') {
		walkthrough_randomization();
	} else if (stage == 'finished walkthrough') {
		walkthrough_finished();
	} else if (stage == 'close walkthrough') {
		close_walkthrough_options();
	}
}


/*-----------------*/
/* STAGE FUNCTIONS */
/*-----------------*/

// initial walkthrough stage interface styling - playing the seuquence
function walkthrough_play_sequence() {
	$('.walkthrough_text').text('use this button to play the drum sequence that you currently have loaded');
	$('.advance_walkthrough').val('next');

	$('.play_sequence').css({
		'animation': 'walkthrough_float 1s ease-in-out infinite',
		'opacity': '1'
	});

	// setting up the next stage in the walkthrough
	current_stage = 'shared sequences';
}

// walkthrough interface styling - shared sequences stage
function walkthrough_shared_sequences() {
	$('.walkthrough_text').text('with the sequence sharing module, you can load and edit drum sequences that have been shared by others, or share your own sequence');

	$('.play_sequence').css({
		'animation': 'walkthrough_float 2s ease-in-out infinite'
	});
	$('.shared_sequence:first').css({
		'animation': 'walkthrough_float 1s ease-in-out infinite'
	});

	$('body').find('.sharing, .sharing .shared_sequences').css({
		'opacity': '1.0'
	});
	$('body').find('h1, .github_button, .controls, .tempo, .randomization, .labels, .selects, .pad').css('opacity', '0.2');

	current_stage = 'sample selection';
}

// walkthrough interface styling - sample selection stage
function walkthrough_sample_selection() {
	$('.walkthrough_text').text('use this module to choose a set of samples that sounds good to your ears');

	$('.shared_sequence:first').css({
		'animation': 'unset'
	});
	$('.labels, .selects').css({
		'opacity': '1.0',
		'animation': 'walkthrough_samples 2s ease-in-out infinite'
	});

	$('body').find('h1, .github_button, .controls, .sharing, .randomization, .pad').css('opacity', '0.2');

	current_stage = 'tempo';
}

// walkthrough interface styling - tempo stage
function walkthrough_tempo() {
	$('.walkthrough_text').text('set the tempo of the drum sequence via the tempo field or using keyboard commands (tempo is calculated as beats per minute)');

	$('.labels, .selects').css('animation', 'unset');
	$('.tempo_field, .tempo').css({
		'animation': 'walkthrough_float 2s ease-in-out infinite'
	});

	$('.controls, .tempo, .tempo_field').css({
		'opacity': '1.0'
	});
	$('body').find('.tempo, .tempo_field').css({
		'opacity': '1.0'
	});
	$('body').find('h1, .github_button, .controls *:not(".tempo_field"), .sharing, .randomization, .labels, .selects, .pad').css('opacity', '0.2');

	current_stage = 'pad pieces';
}

// walkthrough interface styling - shared pad pieces stage
function walkthrough_pad_pieces() {
	$('.walkthrough_text').text('activate or deactivate pad pieces to edit your drum sequence. the rows correspond to each sample type and the columns fire on each beat');

	$('.tempo_field, .tempo').css('animation', 'unset');
	$('.pad, .pad *').css({
		'opacity': '1.0'
	});
	$('.pad_piece[data-state="active"]').css({
		'opacity': '1.0',
		'animation': 'walkthrough_pad_pieces 2s ease-in-out infinite'
	});

	$('body').find('h1, .github_button, .controls, .sharing, .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .tempo, .randomization, .labels, .selects').css('opacity', '0.2');

	current_stage = 'pad manipulation';
}

// walkthrough interface styling - pad manipulation stage
function walkthrough_pad_manipulation() {
	$('.walkthrough_text').text('you can remove or duplicate individual drum pads by clicking on the options directly above each pad');

	$('.pad_piece').css('animation', 'unset');
	$('.pad, .remove_pad, .duplicate_pad').css({
		'opacity': '1.0'
	});

	$('body').find('h1, .github_button, .controls, .sharing, .duplicate_sequence, .remove_all_pads, .tempo, .randomization, .labels, .selects').css('opacity', '0.2');

	current_stage = 'sequence manipulation';
}

// walkthrough interface styling - sequence manipulation stage
function walkthrough_sequence_manipulation() {
	$('.walkthrough_text').text('you can also duplicate the entire sequence (up to 16 pads (maximum sequence size is 32 pads)), or remove all drum pads but the first');

	$('.remove_pad, .duplicate_pad').css('animation', 'unset');
	$('.pad, .duplicate_sequence, .remove_all_pads').css({
		'opacity': '1.0'
	});
	$('.duplicate_sequence, .remove_all_pads').css({
		'animation': 'walkthrough_float 2s ease-in-out infinite'
	});

	$('body').find('h1, .github_button, .controls, .sharing, .duplicate_pad, .remove_pad, .tempo, .randomization, .labels, .selects').css('opacity', '0.2');

	current_stage = 'clearing selections';
}

// walkthrough interface styling - clearing selections stage
function walkthrough_clearing_selections() {
	$('.walkthrough_text').text('to deactivate all of the active pad pieces in your sequence, use this button');

	$('.duplicate_sequence, .remove_all_pads').css('animation', 'unset');
	$('.controls, .clear_selections').css({
		'opacity': '1.0'
	});
	$('.clear_selections').css({
		'animation': 'walkthrough_pad_pieces 2s ease-in-out infinite, walkthrough_float 2s ease-in-out infinite'
	});

	$('body').find('h1, .github_button, .controls *:not(".clear_selections"), .sharing, .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .tempo, .randomization, .labels, .selects, .pad').css('opacity', '0.2');

	current_stage = 'randomization';
}

// walkthrough interface styling - randomization module stage
function walkthrough_randomization() {
	$('.walkthrough_text').text('you can randomize your sequence using this module. there are plenty of options to choose from');

	$('.clear_selections').css('animation', 'unset');
	$('.randomization').css({
		'opacity': '1.0'
	});
	$('.randomization').css({
		'animation': 'walkthrough_float_shadowless 2s ease-in-out infinite'
	});

	$('body').find('h1, .github_button, .controls, controls .sharing, .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .tempo, .labels, .selects, .pad').css('opacity', '0.2');

	current_stage = 'finished walkthrough';
}

// walkthrough interface styling - finishing stage
function walkthrough_finished() {
	$('.walkthrough_text').text('and that\'s basically it! I think you can take it from here');

	$('.randomization').css({
		'animation': 'unset',
		'opacity': '0.2'
	});
	$('.advance_walkthrough').val('done');

	current_stage = 'close walkthrough';
}

// closes walkthrough and resets everything back to the default interface
function close_walkthrough_options() {
	$('.walkthrough_overlay').css({
		'opacity': '0',
		'z-index': '-1'
	});

	$('.clear_selections, .randomization, .duplicate_sequence, .remove_all_pads, .clear_selections, .tempo_field, .tempo, .shared_sequence, .labels, .selects, .remove_pad, .duplicate_pad, .pad_piece').css('animation', 'unset');

	set_sequence_from_JSON('{"active_pieces":["2-1","6-1","1-2","2-4","3-5","4-5","6-5","7-5","5-7","1-8","8-8","14-1","16-1","13-7","18-1","22-1","17-2","18-4","19-5","20-5","22-5","23-5","21-7","17-8","24-8","30-1","32-1","31-4","26-5","29-7","31-7","27-8"],"name":"clean & simple - stacking test","sample_paths":["wooden-chair.mp3","time-cymbal.mp3","tribal-ride.mp3","meaty-hi-hat.mp3","firm-hi-hat.mp3","lofi-crunk-snare.mp3","well-rounded-snare.mp3","disruptive-kick.mp3"],"tempo":"198"}');

	setTimeout(function () {
		$('body').find('h1, .github_button, .controls, .controls *, .saved, .sharing, .sharing *:not(".name_sequence_overlay"), .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .randomization, .tempo, .labels, .selects, .pad, .currently_loaded_sequence').css('opacity', '1.0');
	});

	// aesthetic
	setTimeout(function () {
		$('.advance_walkthrough').val('start walkthrough');
		$('.walkthrough_text').text("click 'start walkthrough' below for a visual tutorial on how to use padseek");

		current_stage = 'play sequence';
	}, 1000);
}