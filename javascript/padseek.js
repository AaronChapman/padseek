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

	- when duplicating sequence containing multiple pads, they appear out of order
	- changing one snare sometimes changes both snares because of the way I'm replacing items in the array
	- changing sample selection doesn't update sequence sample paths array in all cases
	- sequence sample paths does not get updated in the right order with randomization
	- removing a pad mid-sequence doesn't update the number of columns the sequence tries to play

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

// option for duplicating groups of pads

// attach pad number to end of duplicate pad link

// generate repetitive html content dynamically

// loaded shared sequences in reverse

// highlight on container hover "Fork on Github"

// maybe stop sequence when sample change is made, make change, and then play sequence

// allow empty pad duplication

// option to see more keyboard shortcuts
// // // pause / play sequence, clear selections

// create a preview sample option

// better logo display

// better randomization button display