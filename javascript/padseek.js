// p a d s e e k
// oylo.info - 2018

// once ol' buddy's booted up
$(document).ready(function() {
	// get 'er rollin'
	generate_pad();
	setup_default_interface();
});

//•••• to-do list ••••//

/* ! critical !

	- changing one snare sometimes changes both snares because of the way I'm replacing items in the array
	- changing sample selection doesn't update sequence sample paths array in all cases
	- removing a pad mid-sequence doesn't update the number of columns the sequence tries to play
	-  - on remove, pause, remove, and play sequence

! critical ! */

// add more sample bank content

// audio effects
// // // sample pitching
// // // sample swing
// // // reverb
// // // equalization

// sample stacking
// // // turn index in sequence_sample_paths into an array
// // // on playsound area, check if it's array and if so play both sounds
// // // if not, play the one

// padseek tutorial
// // // highlights basic containers showing how to use them

// 'your sequences' module
// // // create new account
// // // login
// // // list of your sequences

// add some sort of application response message area
// // // when tempo is too large
// // // maybe when pressing play sequence with no active pad pieces

// refine the way random number of pads generation works
// // // make sure array gets altered properly when a bunch of pads get added / removed

// generate repetitive html content dynamically

// loaded shared sequences in reverse

// incorporate a pad number check system (so user can't break page)

// prevent playing sequence over a certain tempo
// // // or set tempo to max tempo, give an error message, and play sequence

// look into storing selected options in cache immediately so they don't have to get pulled each time

// add a 'remove all pads' button matching duplicate sequence button

// make current sequence json variable that gets updated everywhere

// maybe stop sequence when sample change is made, make change, and then play sequence

// option to see more keyboard shortcuts
// // // pause / play sequence, clear selections, duplicate sequence, randomize, whatever other module functions come up

// better logo display

// better randomization button display