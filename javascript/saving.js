// p a d s e e k
// saving sequences


/*------------------*/
/* SEQUENCE STORAGE */
/*------------------*/


var current_user = '';
var saved_sequences = [];

function load_user_sequences(user) {
	database.ref('users/' + user).on("value", function (snapshot) {
		saved_sequences = snapshot.val();
	});

	if (saved_sequences != null) {
		saved_sequences.forEach(function (sequence) {
			update_saved_sequences_container(sequence);
		});
	} else {
		application_message('user does not exist');
	}
}

function save_current_sequence() {
	if ($('.saved_sequences_module .name_sequence').val().length > 0) {
		database.ref('users/' + $('.load_user_sequences_input').val()).on("value", function (snapshot) {
			saved_sequences = snapshot.val();
		});

		if (saved_sequences != null) {
			saved_sequences.push(convert_sequence_to_JSON());
			
			saved_sequences.forEach(function (sequence) {
				update_saved_sequences_container(sequence);
			});
		} else {
			saved_sequences = [];
			saved_sequences.push(convert_sequence_to_JSON());
		}

		var on_complete = function (error) {
			if (error) {
				console.log('could not update saved sequences for ' + $('.load_user_sequences_input').val());
			} else {
				console.log('updated saved sequences for ' + $('.load_user_sequences_input').val());
			}
		}

		database.ref('users/' + $('.load_user_sequences_input').val()).update(saved_sequences, on_complete);

		load_user_sequences($('.load_user_sequences_input').val());
	}
}

// update saved sequence button items listed in the saved sequences container
function update_saved_sequences_container(new_JSON_object) {
	// empty the container
	$('.saved_sequences').empty();
	// append the label separator
	$('.saved_sequences').append('<label class="label">sequences saved by ' + $('.load_user_sequences_input').val() + '<br>⬇</label>');

	// for each item in the array
	saved_sequences.forEach(function (sequence) {
		var converted_object = JSON.stringify(sequence);

		// append the saved sequence button with the stringified JSON sequence data stored in the element's data-json attribute
		$('.saved_sequences').append(`<input class='saved_sequence cursor_pointer box-shadowed-hover' type='button' data-json='` + converted_object + `' value='` + sequence.name + `'>`);
	});
}

// when the document is ready
$(document).ready(function () {
	// when a saved sequence button item is clicked
	$('body').on('click', '.saved_sequence', function () {
		// load up the sequence data from the JSON string stored in the button's data-json attribute
		set_sequence_from_JSON($(this).attr('data-json'));
	});

	// when the load sequences
	$('body').on('click', '.load_user_sequences', function () {
		// if the query input is valid
		if ($('.load_user_sequences_input').val().length > 0) {
			// run the load method with the text from the username field as its parameter
			load_user_sequences($('.load_user_sequences_input').val());
		} else {
			// otherwise, show an error
			application_message('please enter a user to load sequences from');
		}
	});

	// when the save current sequence button is clicked
	$('body').on('click', '.save_sequence', function () {
		// if there is a sequence to be shared
		if ($('body').find('.pad_piece[data-state="active"]').length > 0) {
			// and if the username field has valid input
			if ($('.load_user_sequences_input').val().length > 1) {
				// temporarily suspend keyboard event listeners
				remove_shortcuts();

				// set overlay and container properties
				$(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence_overlay').css({
					'opacity': '1',
					'z-index': '2'
				});

				$('.saved_sequences_module').css({
					'overflow-y': 'hidden'
				});

				// focus the sequence naming field
				$(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence').focusin();
			} else {
				// tell them when they haven't specified a user to save the sequence under
				application_message('please enter a user to save your sequence for');
			}
		} else {
			//
			application_message('cannot save an empty sequence');
		}
	});

	// when the button to confirm sharing the newly named sequence is clicked
	$('.name_and_save_sequence').click(function () {
		var field_reference = $(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence');

		// if the name is valid
		if ((field_reference.val()) &&
			(field_reference.val().indexOf("'") == -1) &&
			(field_reference.val().indexOf('"') == -1) &&
			(field_reference.val().indexOf("`") == -1)) {
			current_sequence_name = field_reference.val();

			// fire sequence sharing flow
			save_current_sequence();

			// reactivate keyboard event listeners
			set_shortcuts();

			// set sequence-naming overlay container properties
			$(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence_overlay').css({
				'opacity': '0',
				'z-index': '-2'
			});

			$('.saved_sequences_module').css({
				'overflow-y': 'scroll'
			});
		} else {
			application_message('please enter a name for your sequence');
		}
	});
});