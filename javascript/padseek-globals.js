// p a d s e e k
// global variables


/*---------------------*/
/* INTERFACE VARIABLES */
/*---------------------*/

// determines whether or not the sequence is running
var sequence_running = false;

// sequence tempo
var calculated_tempo = 125;

// index of row that's currently firing in sequence
var current_row_in_sequence = 1;

// track number of activated pad pieces
var activated_pad_pieces = 0;

// randomize button palette
var randomize_colors = ["#fff8f5", "#fef3f3", "#f3edf0", "#e8e8eb", "#f2eff1", "#fff2ec", "#fde7e7", "#e8dbe2", "#d2d1d8", "#e5dfe3", "#ffebe2", "#fcdbdb", "#ddc9d4", "#bcbac5", "#d9d0d6", "#ffe5d9", "#fbd0cf", "#d2b7c5", "#a6a3b2", "#ccc0c8", "#ffdfcf", "#fac4c3", "#c7a5b7", "#908c9f", "#bfb1bb", "#ffd8c6", "#fab8b8", "#bb94a9", "#79758c", "#b3a1ad", "#ffd2bc", "#f9acac", "#b0829b", "#635e79", "#a692a0", "#ffccb3", "#f8a1a0", "#a5708c", "#4d4766", "#998292", "#ffc5a9", "#f79594", "#9a5e7e", "#373053", "#8d7385", "#ffbfa0", "#f68988", "#8f4c70", "#211940", "#806377", "#f5f7f9", "#f1f5f8", "#fbf8f6", "#f9f2f1", "#ecf0f3", "#e4ecf2", "#f7f2ed", "#f3e6e3", "#e3e8ed", "#d7e2ec", "#f3ebe4", "#eed9d5", "#dae1e7", "#c9d9e5", "#efe5dc", "#e8cdc7", "#d1d9e1", "#bcd0df", "#ebdfd3", "#e2c1b9", "#c7d2dc", "#afc6d9", "#e7d8ca", "#ddb4ac", "#becad6", "#a2bdd3", "#e3d2c1", "#d7a89e", "#b5c3d0", "#94b4cc", "#dfccb9", "#d19c90", "#acbbca", "#87aac6", "#dbc5b0", "#cc8f82", "#a3b4c4", "#7aa1c0", "#d7bfa7", "#c68374"];

// randomize button animation
var randomize_coloring = setInterval(function() {
	// get a color from the array
	var temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];

	// while the color matches the existing color it's meant to replace
	while ($('.randomize').css('background') === temp_color) {
		// choose a new color from the array
		temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];
	}
	
	// set the background of the randomize button
	$('.randomize').css({'background':temp_color});
}, 1000);


/*-----------------------*/
/* SAMPLE PATH VARIABLES */
/*-----------------------*/

// lists of drum sample option file names
var crash_cymbals = ['cinematic-cymbal.mp3', 'knows-all-cymbal.mp3', 'oriental-cymbal.mp3', 'rich-cymbal.mp3', 'thin-cymbal.mp3', 'time-cymbal.mp3', 'wispy-wonky-cymbal.mp3'];
var ride_cymbals = ['grime-ride.mp3', 'lazy-ride.mp3', 'steam-ride.mp3', 'traditional-ride.mp3', 'tribal-ride.mp3'];
var open_hi_hats = ['meaty-hi-hat.mp3', 'rich-hi-hat.mp3', 'substantial-hi-hat.mp3', 'thin-hi-hat.mp3'];
var closed_hi_hats = ['firm-hi-hat.mp3', 'light-and-lengthy-hi-hat.mp3', 'light-hi-hat.mp3', 'light-spread-hi-hat.mp3', 'lofi-hi-hat.mp3', 'razor-thin-hi-hat.mp3', 'stan-hi-hat.mp3', 'tinny-hi-hat.mp3'];
var snares = ['bangle-snare.mp3', 'breathless-snare.mp3', 'bunk-snare.mp3', 'clap-like-snare.mp3', 'crunchy-peanut-spread-snare.mp3', 'crunchy-snare.mp3', 'dopey-snare.mp3', 'hardstyle-snare.mp3', 'heavy-snare.mp3', 'lofi-bump-snare.mp3', 'lofi-crunk-snare.mp3', 'orphan-snare.mp3', 'pathetic-snare.mp3', 'pumped-snare.mp3', 'punctual-snare.mp3', 'raw-cut-snare.mp3', 'smacky-snare.mp3', 'splatter-snare.mp3', 'thick-smack-snare.mp3', 'toy-snare.mp3', 'weak-snare.mp3', 'well-rounded-snare.mp3'];
var kick_drums = ['cut-you-up-kick.mp3', 'disruptive-kick.mp3', 'distinct-kick.mp3', 'pale-kick.mp3', 'prehistor-khick.mp3', 'pumpy-kick.mp3', 'punchy-kick.mp3', 'thumpy-kick.mp3', 'wide-and-weak-kick.mp3'];
var sound_effects = ['bicycle-bell.mp3', 'bottle-cap.mp3', 'cork-popping.mp3', 'drum-sticks.mp3', 'lighter-smack.mp3', 'raw-thump.mp3', 'star-twinkle.mp3', 'thawing-tap.mp3', 'wooden-chair.mp3', 'wooden-smack.mp3'];

// list of objects with directory name & sound path array properties
var sample_directories = [
						{directory: 'sound-effects', sound_paths: sound_effects},
						{directory: 'crash-cymbals', sound_paths: crash_cymbals},
						{directory: 'ride-cymbals', sound_paths: ride_cymbals},
						{directory: 'open-hi-hats', sound_paths: open_hi_hats},
						{directory: 'closed-hi-hats', sound_paths: closed_hi_hats},
						{directory: 'snares', sound_paths: snares},
						{directory: 'snares', sound_paths: snares},
						{directory: 'kick-drums', sound_paths: kick_drums}];

// sample directory path array
var sequence_sample_paths = ['samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3'];
// selection sample options
var selected_options = [];

// stores the JSON data objects for shared sequences
var shared_sequences = [];