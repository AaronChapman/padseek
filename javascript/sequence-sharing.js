// p a d s e e k
// sequence sharing


/*----------------*/
/* FIREBASE SETUP */
/*----------------*/

// firebase configuration
var config = {
	apiKey: "AIzaSyAnQBTNzsGBiAS5BJhDNmRKEJn9QPB4mFA",
	authDomain: "padseek-oylo-info.firebaseapp.com",
	databaseURL: "https://padseek-oylo-info.firebaseio.com",
	projectId: "padseek-oylo-info",
	storageBucket: "padseek-oylo-info.appspot.com",
	messagingSenderId: "573441583035"
};

// initializing communication with database
firebase.initializeApp(config);

// creating database object reference 
var database = firebase.database();


/*------------------*/
/* SEQUENCE STORAGE */
/*------------------*/

// when connection to the database has been made
database.ref().on("value", function(snapshot) {
	// set the local shared sequences array to the value of the same array in firebase
	shared_sequences = snapshot.val().shared_sequences;
	
	// for each JSON object in that array
	for (var i = shared_sequences.length - 1; i > 0; i--) {
		// add a shared sequence button item to the shared sequences container
		update_shared_sequences_container(shared_sequences[i]);
		
		//console.log(shared_sequences[i].name);
	}
}, function(errorObject) {
	console.log("errors handled: " + errorObject.code);
});

// start sequence data sharing flow
function share_sequence_data() {
	// get the sequence data used to form the new JSON object
	var name = $('.name_sequence').val();
	var tempo = $('.tempo_field').val();
	var sample_paths = selected_options;
	var active_pieces = [];
	
	$('body').find('.pad_piece[data-state="active"]').each(function() {
		active_pieces.push($(this).attr('id'));
	});
	
	$('.name_sequence').val('');
	
	// and call the conversion method
	convert_sequence_to_JSON(name, tempo, sample_paths, active_pieces);
}

// converts fed sequence data variables into new JSON object
function convert_sequence_to_JSON(name, tempo, sample_paths, active_pieces) {
	var new_JSON_object = {name, tempo, sample_paths, active_pieces};
	
	// push the new object to the shared_sequences array
	shared_sequences.push(new_JSON_object);
	// and update the container housing the list of shared sequences
	update_shared_sequences_container(new_JSON_object);
	
	// also update the database with the newly shared sequence data
	update_firebase();
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
		$('.shared_sequences').append(`<input class='shared_sequence cursor_pointer box-shadowed-hover' type='button' data-json='` + converted_object + `' value='` + shared_sequences[i].name + `'>`);
	}
}

// set the current sequence from a JSON string
function set_sequence_from_JSON(new_JSON_object) {
	// convert string back into JSON object
	var converted_object = JSON.parse(new_JSON_object);
	// get last active pad piece
	var last_active_pad_piece = converted_object.active_pieces[converted_object.active_pieces.length - 1];
	// parse it
	var last_piece_parsed = last_active_pad_piece.substring(0, last_active_pad_piece.indexOf('-'));
	// use that to determine the number of pads in the sequence
	var number_of_pads_to_generate = (parseInt(last_piece_parsed) - 1) / 8;
	var number_of_pads_parsed = Math.floor(number_of_pads_to_generate);
	
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
		$('#' + converted_object.active_pieces[i]).css({'opacity':'1.0','background':'white'});
		$('#' + converted_object.active_pieces[i]).attr('data-state', 'active');
	}
	
	// set the selected sample options from the sample paths array in the sequence data JSON object being loaded
	for (var i = 0; i < converted_object.sample_paths.length; i++) {
		$('.selects .select').eq(i).find('option[value="' + converted_object.sample_paths[i] + '"]').prop('selected', true);
	}
	
	// set the selected options array equal to the sample paths received from the JSON object
	selected_options = converted_object.sample_paths;
	
	// set the new tempo
	$('.tempo_field').val(converted_object.tempo);
	
	// reorder all pad piece id attributes
	reorder_pad_pieces();
}


/*---------------------------------*/
/* SEQUENCE SHARING EVENT HANDLERS */
/*---------------------------------*/

// when the document is ready
$(document).ready(function() {
	// when a shared sequence button item is clicked
	$('body').on('click', '.shared_sequence', function() {
		// load up the sequence data from the JSON string stored in the button's data-json attribute
    set_sequence_from_JSON($(this).attr('data-json'));
	});
	
	// when the share sequence button is clicked
	$('body').on('click', '.share_sequence', function() {
		// if there is a sequence to be shared
		if ($('body').find('.pad_piece[data-state="active"]').length > 0) {
			// temporarily suspend keyboard event listeners
			remove_shortcuts();
			
			// set sequence-naming overlay container properties
			$('.name_sequence_overlay').css({'opacity':'1', 'z-index':'2'});
		} else {
			application_message('cannot share an empty sequence');
		}
	});
	
	// when the button to confirm sharing the newly named sequence is clicked
	$('body').on('click', '.name_and_share_sequence', function() {
		// if the name is valid
		if (($('.name_sequence').val().length > 1) &&
				($('.name_sequence').val().indexOf("'") == -1) &&
				($('.name_sequence').val().indexOf('"') == -1) &&
			 	($('.name_sequence').val().indexOf("`") == -1)) {
			// fire sequence sharing flow
			share_sequence_data();
			
			// reactivate keyboard event listeners
			set_shortcuts();
			
			// set sequence-naming overlay container properties
			$('.name_sequence_overlay').css({'opacity':'0', 'z-index':'-1'});
		} else {
			application_message('please enter a name for your sequence');
		}
	});
	
	$('body').on('click', '.close', function() {
		// reactivate keyboard event listeners
		set_shortcuts();

		// set sequence-naming overlay container properties
		$('.name_sequence_overlay').css({'opacity':'0', 'z-index':'-1'});
	});
});