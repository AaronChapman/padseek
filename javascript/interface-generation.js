// p a d s e e k
// interface generation

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
			pad_piece.attr({'id':j + '-' + i,'data-state':'inactive'});

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
		var select_reference = $('.select[class*="' + sample_directories[i].directory.replace(/-/g, '_') + '"]');

		// for each sound_paths property in the sample_directories array
		for (var j = 0; j < sample_directories[i].sound_paths.length; j++) {
			// append an option element with appropriate attributes
			select_reference.append('<option value="' +
									sample_directories[i].sound_paths[j] +'">' +  sample_directories[i].sound_paths[j].substring(0, sample_directories[i].sound_paths[j].length - 4).replace(/-/g, ' ') +
									'</option>');
		}
	}
}

function setup_default_interface() {
	$('.module_checkbox').prop('checked', true);
}