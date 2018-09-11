// p a d s e e k
// sequence sharing


/*------------------*/
/* SEQUENCE STORAGE */
/*------------------*/

// when connection to the database has been made
database.ref().on("value", function (snapshot) {
	// set the local shared sequences array to the value of the same array in firebase
	shared_sequences = snapshot.val().shared_sequences;

	// for each JSON object in that array
	for (var i = shared_sequences.length - 1; i > 0; i--) {
		// add a shared sequence button item to the shared sequences container
		update_shared_sequences_container(shared_sequences[i]);
	}
}, function (errorObject) {
	console.log("errors handled: " + errorObject.code);
});

// start sequence data sharing flow
function share_sequence_data() {
	// push the new object to the shared_sequences array
	shared_sequences.push(convert_sequence_to_JSON());

	// also update the database with the newly shared sequence data
	update_firebase();
}

// converts fed sequence data variables into new JSON object
function convert_sequence_to_JSON() {
	// get the sequence data used to form the new JSON object
	var name = current_sequence_name;
	var tempo = $('.tempo_field').val();
	var sample_paths = selected_options;
	var active_pieces = [];

	$('body').find('.pad_piece[data-state="active"]').each(function () {
		active_pieces.push($(this).attr('id'));
	});

	$('.name_sequence').val('');

	var new_JSON_object = {name, tempo, sample_paths, active_pieces};

	return new_JSON_object;
}

// update database on data mutation
function update_firebase() {
	database.ref().set({
		shared_sequences: shared_sequences
	});
}


/*-------------------*/
/* INTERFACE CONTENT */
/*-------------------*/

// update shared sequence button items listed in the shared sequences container
function update_shared_sequences_container(new_JSON_object) {
	// empty the container
	$('.shared_sequences').empty();
	// append the label separator
	$('.shared_sequences').append('<label class="label">browse recently shared sequences<br>⬇</label>');

	// number of sequences to display
	var number_of_shared_sequences = shared_sequences.length;
	var comparator = number_of_shared_sequences - 25;

	if (number_of_shared_sequences < 25) {
		comparator = 0;
	}

	// for each JSON object in the database
	for (var i = shared_sequences.length - 1; i >= comparator; i--) {
		// convert the JSON object to a string
		var converted_object = JSON.stringify(shared_sequences[i]);

		// append the shared sequence button with the stringified JSON sequence data stored in the element's data-json attribute
		$('.shared_sequences').append("<input class='shared_sequence cursor_pointer box-shadowed-hover' type='button' data-json='" + converted_object + "' value='" + shared_sequences[i].name + "'>");
	}
}

// set the current sequence from a JSON string
function set_sequence_from_JSON(new_JSON_object) {
	// for sequence size reset
	if (sequence_running) {
		$('.play_sequence').click();

		current_column_in_sequence = 1;
	}
	
	// convert string back into JSON object
	var converted_object = JSON.parse(new_JSON_object);
	// get last active pad piece
	var last_active_pad_piece = converted_object.active_pieces[converted_object.active_pieces.length - 1];
	// parse it
	var last_piece_parsed = last_active_pad_piece.substring(0, last_active_pad_piece.indexOf('-'));
	// use that to determine the number of pads in the sequence
	var number_of_pads_to_generate = (parseInt(last_piece_parsed) - 1) / 8;
	var number_of_pads_parsed = Math.floor(number_of_pads_to_generate);

	current_sequence_name = converted_object.name;
	selected_options = converted_object.sample_paths;

	// remove all pads but the first
	$('.pad:not(:first)').remove();
	// clear active piece selections from the remaining pad
	$('.clear_selections').click();

	// add the appropriate number of pads for the new sequence being loaded
	for (var i = 0; i < number_of_pads_parsed; i++) {
		$('.pad:first .duplicate_pad').click();
	}

	// set properties and attributes of active piece elements
	for (var i = 0; i < converted_object.active_pieces.length; i++) {
		$('#' + converted_object.active_pieces[i]).attr('data-state', 'active');
	}

	// set the selected sample options from the sample paths array in the sequence data JSON object being loaded
	for (var i = 0; i < converted_object.sample_paths.length; i++) {
		// by checking if each type of sample array includes the value given
		if (sound_effects.includes(selected_options[i])) {
			sample_directories[i].directory = 'sound-effects';
			sample_directories[i].sound_paths = sound_effects;
		} else if (crash_cymbals.includes(selected_options[i])) {
			sample_directories[i].directory = 'crash-cymbals';
			sample_directories[i].sound_paths = crash_cymbals;
		} else if (ride_cymbals.includes(selected_options[i])) {
			sample_directories[i].directory = 'ride-cymbals';
			sample_directories[i].sound_paths = ride_cymbals;
		} else if (open_hi_hats.includes(selected_options[i])) {
			sample_directories[i].directory = 'open-hi-hats';
			sample_directories[i].sound_paths = open_hi_hats;
		} else if (closed_hi_hats.includes(selected_options[i])) {
			sample_directories[i].directory = 'closed-hi-hats';
			sample_directories[i].sound_paths = closed_hi_hats;
		} else if (snares.includes(selected_options[i])) {
			sample_directories[i].directory = 'snares';
			sample_directories[i].sound_paths = snares;
		} else if (kick_drums.includes(selected_options[i])) {
			sample_directories[i].directory = 'kick-drums';
			sample_directories[i].sound_paths = kick_drums;
		} else {
			application_message('stop trying to break my shit');
		}

		// get a reference to the matching sample type select and set its new class attribute
		var select_to_change = $('.selects .select').eq(i);

		select_to_change.attr('class', sample_directories[i].directory.replace(/-/g, '_') + '_select' + ' select cursor_pointer');
	}

	// set the selected options array equal to the sample paths received from the JSON object
	selected_options = converted_object.sample_paths;

	fill_select_options();

	// set the new tempo
	$('.tempo_field').val(converted_object.tempo);
	
	calculated_tempo = parseInt($('.tempo_field').val());

	$('.currently_loaded_sequence').text('recently loaded: ' + converted_object.name);

	// reorder all pad piece id attributes
	reorder_pad_pieces();
	set_audio_elements();
}

function copy_sequence_JSON() {
	var sequence_JSON_data = JSON.stringify(convert_sequence_to_JSON());

	new ClipboardJS('.copy_sequence_JSON');

	$('.copy_sequence_JSON').attr('data-clipboard-text', sequence_JSON_data);
	setTimeout(function () {
		$('.copy_sequence_JSON').click();
	}, 100);
}


/*---------------------------------*/
/* SEQUENCE SHARING EVENT HANDLERS */
/*---------------------------------*/

// when the document is ready
$(document).ready(function () {
	// when a shared sequence button item is clicked
	$('body').on('click', '.shared_sequence', function () {
		// load up the sequence data from the JSON string stored in the button's data-json attribute
		set_sequence_from_JSON($(this).attr('data-json'));
	});

	// when the share sequence button is clicked
	$('body').on('click', '.share_sequence', function () {
		// if there is a sequence to be shared
		if ($('body').find('.pad_piece[data-state="active"]').length > 0) {
			$('.sharing').scrollTop(0);
			
			// set sequence-naming overlay container properties
			$(this).parents('.sharing:eq(0)').find('.name_sequence_overlay').css({
				'opacity': '1',
				'z-index': '2'
			});
			$('.sharing').css({
				'overflow-y': 'hidden'
			});

			$(this).parents('.sharing:eq(0)').find('.name_sequence').focusin();
		} else {
			application_message('cannot share an empty sequence');
		}
	});

	// when the button to confirm sharing the newly named sequence is clicked
	$('body').on('click', '.name_and_share_sequence', function () {
		// if the name is valid
		if (($('.name_sequence').val().length > 1) &&
			($('.name_sequence').val().indexOf("'") == -1) &&
			($('.name_sequence').val().indexOf('"') == -1) &&
			($('.name_sequence').val().indexOf("`") == -1)) {
			current_sequence_name = $('.name_sequence').val();

			// fire sequence sharing flow
			share_sequence_data();

			// reactivate keyboard event listeners
			set_shortcuts();

			var stasis = $(this).parents('.overlay').parent().find('.name_sequence_overlay');

			// set sequence-naming overlay container properties
			stasis.css({
				'opacity': '0'
			});

			setTimeout(function () {
				stasis.css({
					'z-index': '-1'
				});
			}, 250);

			$('.sharing').css({
				'overflow-y': 'scroll'
			});
		} else {
			application_message('please enter a name for your sequence');
		}
	});
});