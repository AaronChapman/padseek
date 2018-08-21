// p a d s e e k
// interface


/*-----------*/
/* DOM SETUP */
/*-----------*/

function load_containers() {
	$('.controls').load('../padseek/markup/controls.html');
	$('.shared').load('../padseek/markup/shared.html');
	$('.tempo').load('../padseek/markup/tempo.html');
	$('.randomization').load('../padseek/markup/randomization.html');
	$('.saved').load('../padseek/markup/saved.html');
	$('.pads').load('../padseek/markup/pads.html');
}

// generate drum pad pieces
function generate_pad() {
	// reference to drum pad container
	var pad_reference = $('.pad');

	// drum pad row generation
	for (var i = 1; i < 9; i++) {
		// drum pad column generation
		for (var j = 1; j < 9; j++) {
			// create a pad piece element with class and id attributes
			var pad_piece = $('<div>');

			pad_piece.addClass('pad_piece cursor_pointer');
			pad_piece.attr({
				'id': j + '-' + i,
				'data-state': 'inactive'
			});

			// and add it to the referenced drum pad container
			pad_reference.append(pad_piece);
		}
	}

	// set up drum sample options
	generate_select_options();
}

// generate options for the drum sample selects
function generate_select_options() {
	// for each sample directory item
	for (var i = 0; i < sample_directories.length; i++) {
		// get a parsed reference to the select element that has a class matching the current directory item
		var select_reference = $('.select[class*="' + sample_directories[i].directory.replace(/-/g, '_') + '"]:empty');

		// create temporary array of specified select's samples
		var samples = sample_directories[i].sound_paths;
		
		// and sort that array alphabetically
		samples = samples.sort(function (a, b) {
			if (a < b) return -1;
			else if (a > b) return 1;
			
			return 0;
		});

		// for each sound_paths property in the sample_directories array
		for (var j = 0; j < samples.length; j++) {
			var temp_option = samples[j];
			var parsed_temp_option = temp_option.substring(0, temp_option.length - 4).replace(/-/g, ' ');

			// append an option element with appropriate attributes
			select_reference.append('<option value="' + temp_option + '">' + parsed_temp_option + '</option>');
		}
	}

	// update data
	setup_default_interface();
	set_audio_elements();
}

// sets up default interface elements and some data points
function setup_default_interface() {
	// automatically check the randomization checkboxes
	$('.randomization_checkbox').prop('checked', true);
	$('.randomization_checkbox').attr('data-activated', 'true');

	// for each sample select element, push their currently selected option's parsed text into the selected_options array
	for (var i = 0; i < $('body').find('.selects .select').length; i++) {
		selected_options.push($('body').find('.selects .select').eq(i).find('option:selected').text().replace(/ /g, '-') + '.mp3');
	}

	$('.randomization_checkboxes li:eq(0), .randomization_checkboxes li:eq(1)').css('width', '-webkit-fill-available');
	$('.randomization_checkboxes li:last').css('padding-right', '166px');

	$('.random_number_of_pads, .pseudorandom_number_of_pads, .random_options').prop('checked', false);
	$('.random_number_of_pads, .pseudorandom_number_of_pads, .random_options').attr('data-activated', 'false');

	// set up keyboard event listeners
	set_shortcuts();

	$('body').css('opacity', '1.0');

	// example sequence
	set_sequence_from_JSON('{"active_pieces":["2-1","6-1","1-2","2-4","3-5","4-5","6-5","7-5","5-7","1-8","8-8","14-1","16-1","13-7","18-1","22-1","17-2","18-4","19-5","20-5","22-5","23-5","21-7","17-8","24-8","30-1","32-1","31-4","26-5","29-7","31-7","27-8"],"name":"clean & simple - stacking test","sample_paths":["wooden-chair.mp3","time-cymbal.mp3","tribal-ride.mp3","meaty-hi-hat.mp3","firm-hi-hat.mp3","lofi-crunk-snare.mp3","well-rounded-snare.mp3","disruptive-kick.mp3"],"tempo":"198"}');
}


/*-------------------*/
/* INTERFACE CHANGES */
/*-------------------*/

// displays messages when user tries to performs an action that could bust the application
function application_message(message) {
	$('.application_message').text(message);
	$('.application_message').css({
		'opacity': '1',
		'z-index': '15'
	});

	setTimeout(function () {
		$('.application_message').css({
			'opacity': '0',
			'z-index': '-1'
		});
	}, 3000);
}

$('body').on('click', '.close', function () {
	// reactivate keyboard event listeners
	set_shortcuts();

	// set sequence-naming overlay container properties
	$(this).parents('overlay').css({
		'opacity': '0',
		'z-index': '-1'
	});

	$(this).parents('overlay').parent().css({
		'overflow-y': 'scroll'
	});
});


/*--------------------*/
/* KEYBOARD SHORTCUTS */
/*--------------------*/

// show keyboard shortcuts overlay
function show_shortcuts() {
	$('.shortcuts_overlay').css({
		'opacity': '1',
		'z-index': '2'
	});
}

// hide keyboard shortcuts overlay
function hide_shortcuts() {
	$('.shortcuts_overlay').css({
		'opacity': '0',
		'z-index': '-1'
	});
}

// set up keyboard shortcuts
function set_shortcuts() {
	// calculate tapped tempo: [t] key
	shortcut.add("t", function () {
		hide_shortcuts();
		calculate_tempo();
	});

	// reset calculated tempo: [r] key
	shortcut.add("r", function () {
		hide_shortcuts();
		reset_tempo();
	});

	// set calculated tempo as sequence tempo
	shortcut.add("s", function () {
		hide_shortcuts();

		var new_tempo = parseInt($('.bpm_display').text().trim().substring(0, $('.bpm_display').text().trim().length - 4));

		// check for tempo boundaries
		if (new_tempo < 15) {
			new_tempo = 15;

			application_message('tempo must be between 15 and 240 beats per minute');
		} else if (new_tempo > 240) {
			new_tempo = 240;

			application_message('tempo must be between 15 and 240 beats per minute');
		}

		// set the tempo field value
		$('.tempo_field').val(new_tempo);
	});

	// show or hide keyboard shortcuts
	shortcut.add("c", function () {
		if ($('.shortcuts_overlay').css('z-index') === '-1') {
			show_shortcuts();
		} else if ($('.shortcuts_overlay').css('z-index') === '2') {
			hide_shortcuts();
		}
	});

	// play or pause sequence
	shortcut.add("p", function () {
		$('.play_sequence').click();
	});

	// clear sequence selections
	shortcut.add("x", function () {
		$('.clear_selections').click();
	});

	// randomize sequence
	shortcut.add("z", function () {
		$('.randomize').click();
	});

	// share sequence
	shortcut.add("m", function () {
		hide_shortcuts();

		$('.share_sequence').click();
	});

	// copy json
	shortcut.add("j", function () {
		copy_sequence_JSON();
	});
}

// remove keyboard shortcuts
function remove_shortcuts() {
	shortcut.remove("r");
	shortcut.remove("t");
	shortcut.remove("s");
	shortcut.remove("c");
	shortcut.remove("p");
	shortcut.remove("x");
	shortcut.remove("z");
	shortcut.remove("m");
}

$(document).ready(function () {
	$('input[type="text"]').focusin(function () {
		remove_shortcuts();
	});

	$('input[type="text"]').focusout(function () {
		set_shortcuts();
	});

	$('.never_mind').click(function () {
		$(this).parents('.overlay:eq(0)').css({
			'opacity': '0'
		});

		var stasis = $(this);

		setTimeout(function () {
			stasis.parents('.overlay:eq(0)').css({
				'z-index': '-2'
			});
		}, 250);

		$(this).parents('.overlay:eq(0)').parent().css({
			'overflow': 'scroll'
		});
	});
});