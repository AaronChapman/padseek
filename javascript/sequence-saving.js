var current_user = '';
var current_user_firebase_index = 0;

// update shared sequence button items listed in the shared sequences container
function update_saved_sequences_container(new_JSON_object) {
	// empty the container
	$('.saved_sequences').empty();
	// append the label separator
	$('.saved_sequences').append('<label class="label">saved sequences<br>⬇</label>');

	console.log('begin updated save sequences container loop');

	saved_sequences.forEach(function (sequence) {
		var converted_object = JSON.stringify(sequence);

		// append the shared sequence button with the stringified JSON sequence data stored in the element's data-json attribute
		$('.saved_sequences').append(`<input class='saved_sequence cursor_pointer box-shadowed-hover' type='button' data-json='` + converted_object + `' value='` + sequence.name + `'>`);

		console.log('appending instance button');
	});
}

function load_user_sequences(user) {
	saved_sequences = [];

	database.ref().on("value", function (snapshot) {
		snapshot.val().users.forEach(function (element) {
			if (element.name == user) {
				current_user = user;
				current_user_firebase_index = snapshot.val().users.indexOf(element);
				saved_sequences = element.saved_sequences;

				console.log(saved_sequences);
			}
		});

		console.log('saved sequences for user: ' + user);
		console.log(saved_sequences);

		saved_sequences.forEach(function (sequence) {
			update_saved_sequences_container(sequence);

			console.log('updating container for for loop instance');
		});
	}, function (errorObject) {
		console.log("errors handled: " + errorObject.code);
	});
}

function save_current_sequence() {
	if ($('.saved_sequences_module .name_sequence').val().length > 0) {
		console.log('saving new item (valid name)');
		console.log(saved_sequences);

		saved_sequences.push(convert_sequence_to_JSON());

		console.log(saved_sequences);


		// FIX FIX FIX FIX FIX
		
		var updates = {};
		updates['/posts/' + newPostKey] = postData;
		updates['/user-posts/' + uid + '/' + newPostKey] = postData;

		return firebase.database().ref().update(updates);


		/*
				var ref = firebase.database().ref('users');
				
				ref.orderByValue().on("value", function (snapshot) {
					snapshot.forEach(function (data) {
						console.log("The " + data.key + " score is " + data.val());
					});
				});


				var ref = firebase.database().ref('users').orderByValue().equalTo('name);

					ref.child('saved_sequences').set(saved_sequences);

					console.log('set new saved sequences array in firebase');

					load_user_sequences(current_user);
					*/
	} else {
		application_message();
	}
}

// when the document is ready
$(document).ready(function () {
	// when a saved sequence button item is clicked
	$('body').on('click', '.saved_sequence', function () {
		// load up the sequence data from the JSON string stored in the button's data-json attribute
		set_sequence_from_JSON($(this).attr('data-json'));
	});

	$('body').on('click', '.load_user_sequences', function () {
		if ($('.load_user_sequences_input').val().length > 0) {
			load_user_sequences($('.load_user_sequences_input').val());

			console.log('load sequences button was clicked and user input was lengthwise valid');
		} else {
			application_message('please enter a user to load sequences from');
		}
	});

	// when the share sequence button is clicked
	$('body').on('click', '.save_sequence', function () {
		// if there is a sequence to be shared
		if ($('body').find('.pad_piece[data-state="active"]').length > 0) {
			if ($('.load_user_sequences_input').val().length > 1) {
				// temporarily suspend keyboard event listeners
				remove_shortcuts();

				// set sequence-naming overlay container properties
				$(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence_overlay').css({
					'opacity': '1',
					'z-index': '2'
				});

				$('.saved_sequences_module').css({
					'overflow-y': 'hidden'
				});

				$(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence').focus();

			} else {
				application_message('please enter a user to save your sequence for');
			}
		} else {
			application_message('cannot save an empty sequence');
		}
	});

	// when the button to confirm sharing the newly named sequence is clicked
	$('body').on('click', '.name_and_save_sequence', function () {
		// if the name is valid
		if (($(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence').val().length > 1) &&
			($(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence').val().indexOf("'") == -1) &&
			($(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence').val().indexOf('"') == -1) &&
			($(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence').val().indexOf("`") == -1)) {
			current_sequence_name = $('.name_sequence').val();

			// fire sequence sharing flow
			save_current_sequence();

			// reactivate keyboard event listeners
			set_shortcuts();

			// set sequence-naming overlay container properties
			$(this).parents('.saved_sequences_module:eq(0)').find('.name_sequence_overlay').css({
				'opacity': '0',
				'z-index': '-1'
			});

			$('.saved_sequences_module').css({
				'overflow-y': 'scroll'
			});
		} else {
			application_message('please enter a name for your sequence');
		}
	});
});