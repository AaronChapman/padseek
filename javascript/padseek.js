// p a d s e e k
// oylo.info - 2018


// once ol' buddy's booted up
$(document).ready(function () {
	// get 'er rollin'
	generate_pad();
});

//•••• to-do list ••••//

/* ! critical !

		- sequences plays different samples in same row
		- nothing else to report at the moment 😎

! critical ! */

// comb and perfect all animations

// make a list of samples that need to be removed

// add ability to have apostrophes and similar symbols in the shared seqence name

// audio effects: pitch, swing, reverb

// update tempo module bpm display whenever tempo field is updated

// set classes for playing sequence piece css to add and remove during playback

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