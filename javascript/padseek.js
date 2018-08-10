// p a d s e e k
// oylo.info - 2018


// once ol' buddy's booted up
$(document).ready(function () {
	// get 'er rollin'
	generate_pad();
});

//•••• to-do list ••••//

/* ! critical !

		- nothing to report at the moment 😎

! critical ! */

// make a list of samples that need to be removed

// application message (box like walkthrough?)
// comb and perfect all animations

// generate repetitive html content dynamically

// copy JSON option

// add ability to have apostrophes and similar symbols in the shared seqence name
// maybe make shared sequences array dynamic on the indecies pulled so I can delete sequences from firebase (.each()?)
// 'your sequences' module

// audio effects: equalization, pitch, swing, reverb

// cut down on string parsing by saving coordinates as objects
// each piece could have an x-coordinate datattribute and a y-coordinate datattribute
// helps processing pieces in the same column
// helps speeed up storage time
// simplifies syntax
// steps:
// fix reordering to change two attributes instead of forming id
// remove all id manipulation because I can just pull x or y coordinate values
// set up firebase storage of new coordinate objects
// set up firebase retrieval of new coordinate objects
// alter check for same column pieces