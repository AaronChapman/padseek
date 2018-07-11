// p a d s e e k
// oylo.info - 2018

// once ol' buddy's booted up
$(document).ready(function() {
	// get 'er rollin'
	generate_pad();
	setup_default_interface();
});

//•••• to-do list ••••//

// add more sample bank content

// sample pitching

// sample stacking (oof what a task)

// make the logo cooler Lol
// // // maybe one of those dope red slant backers

// add some sort of application response message area
// // // when tempo is too large
// // // maybe when pressing play sequence with no active pad pieces

// refine the way random number of pads generation works
// // // make sure array gets altered properly when a bunch of pads get added / removed

// add a method of converting a string into sequence data
// // // and sharing functionality
// // // maybe JSON data
// // // // // {'name-of-sequence',beats-per-minute',number-of-pads','samples-selected','active-pad-piece-ids'}
// // // // // look into some type of JSON from URL format conversion or something