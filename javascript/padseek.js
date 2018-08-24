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

// take better screenshots for readme

// add sample type selection for each row 
// create swap button to the left of the labels container
// when clicked an overlay appears inside the container
// overlay contains a label a select, and a confirm button: 'select a sample type to swap for'
// when confirm is clicked, get the value of the overlay select
// remove the appropriate class from the select being changed and add the new one
// empty its options and replace them
// determine type of selects that need to get loaded based on sample paths in json objects
// might be a hang up for hi hats (different problem)
// make sure select change method is modular so I can reuse it for loading sequences


// equalization module
// low cut and high cut options for each row
// look into a double-sided slider (20hz - 20,000hz)
// and a single slider for volume
// look for knob css sliders





// altered sample paths not pushing to firebase
// all selects update when a change is made to one, causing misselected options

