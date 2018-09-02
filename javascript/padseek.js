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
// generate repetitive html content dynamically

// add ability to have apostrophes and similar symbols in the shared seqence name

// audio effects: pitch, swing, reverb

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

// equalization module
// low cut and high cut options for each row
// look into a double-sided slider (20hz - 20,000hz)
// and a single slider for volume
// look for knob css sliders

// update tempo module bpm display whenever tempo field is updated

// add select being changed in uninteractive red field in sample swapper

// set classes for playing sequence piece css to add and remove during playback



// determine if band pass is working & how
// then I may need to create an array of objects storing the low_cut and high_cut values for each sample row
// that data will also need to be stored in firebase, but if a firebase json obejct doesn't have a value I can set the default to 20hz-20khz