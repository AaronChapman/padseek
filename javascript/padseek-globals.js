// p a d s e e k
// global variables

// determines whether or not the sequence is running
var sequence_running = false;

// sequence tempo
var calculated_tempo = 125;

// index of row that's currently firing in sequence
var current_row_in_sequence = 1;

// track number of activated pad pieces
var activated_pad_pieces = 0;

// lists of drum sample option file names
var crash_cymbals = ['cinematic-cymbal.mp3', 'knows-all-cymbal.mp3', 'oriental-cymbal.mp3', 'rich-cymbal.mp3', 'thin-cymbal.mp3', 'time-cymbal.mp3', 'wispy-wonky-cymbal.mp3'];
var ride_cymbals = ['grime-ride.mp3', 'lazy-ride.mp3', 'steam-ride.mp3', 'traditional-ride.mp3', 'tribal-ride.mp3'];
var open_hi_hats = ['meaty-hi-hat.mp3', 'rich-hi-hat.mp3', 'substantial-hi-hat.mp3', 'thin-hi-hat.mp3'];
var closed_hi_hats = ['firm-hi-hat.mp3', 'light-and-lengthy-hi-hat.mp3', 'light-hi-hat.mp3', 'light-spread-hi-hat.mp3', 'lofi-hi-hat.mp3', 'razor-thin-hi-hat.mp3', 'stan-hi-hat.mp3', 'tinny-hi-hat.mp3'];
var snares = ['bangle-snare.mp3', 'breathless-snare.mp3', 'bunk-snare.mp3', 'clap-like-snare.mp3', 'crunchy-peanut-spread-snare.mp3', 'crunchy-snare.mp3', 'dopey-snare.mp3', 'hardstyle-snare.mp3', 'heavy-snare.mp3', 'lofi-bump-snare.mp3', 'lofi-crunk-snare.mp3', 'orphan-snare.mp3', 'pathetic-snare.mp3', 'pumped-snare.mp3', 'punctual-snare.mp3', 'raw-cut-snare.mp3', 'smacky-snare.mp3', 'splatter-snare.mp3', 'thick-smack-snare.mp3', 'toy-snare.mp3', 'weak-snare.mp3', 'well-rounded-snare.mp3'];
var kick_drums = ['cut-you-up-kick.mp3', 'disruptive-kick.mp3', 'distinct-kick.mp3', 'pale-kick.mp3', 'prehistor-khick.mp3', 'pumpy-kick.mp3', 'punchy-kick.mp3', 'thumpy-kick.mp3', 'wide-and-weak-kick.mp3'];
var sound_effects = ['bicycle-bell.mp3', 'bottle-cap.mp3', 'cork-popping.mp3', 'drum-sticks.mp3', 'lighter-smack.mp3', 'raw-thump.mp3', 'star-twinkle.mp3', 'thawing-tap.mp3', 'wooden-chair.mp3', 'wooden-smack.mp3'];

// list of objects with directory name & sound path array properties
var sample_directories = [{directory: 'crash-cymbals', sound_paths: crash_cymbals},
						{directory: 'ride-cymbals', sound_paths: ride_cymbals},
						{directory: 'open-hi-hats', sound_paths: open_hi_hats},
						{directory: 'closed-hi-hats', sound_paths: closed_hi_hats},
						{directory: 'snares', sound_paths: snares},
						{directory: 'kick-drums', sound_paths: kick_drums},
						{directory: 'sound-effects', sound_paths: sound_effects}];

// sample directory path array
var sequence_sample_paths = ['samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3'];
// selection sample options
var selected_options = [];

// logo palette
var logo_colors = ['white', 'aliceblue', 'aliceblue', 'slategray', 'antiquewhite', 'antiquewhite', 'rgba(00, 00, 00, 0.1)', 'rgba(00, 00, 00, 0.25)'];

// randomize button palette
var randomize_colors = ['9AA0A8', '413C58', '67597A', 'CC7178', 'F2E7C9', 'CF9893', '7D98A1', '5E6572', 'FFEEDD', 'FFD8BE', 'DBAFC1', 'D6EDFF', '907F9F', '904C77', 'F6EFEE'];
var random_randomize = ['r a n d o m i z e', 'r an d om i z e', 'ra n dom i ze', 'r a nd omiz e', 'ra nd om ize', 'r an d o miz e', 'randomize', 'rand o mize'];

// logo animation - 5 seconds
var logo_coloring = setInterval(function() {
	// get a color from the array
	var temp_color = logo_colors[Math.floor(Math.random() * logo_colors.length)];
	
	// while the color matches the existing color it's meant to replace
	while ($('h1').css('color') === temp_color) {
		// choose a new color from the array
		temp_color = logo_colors[Math.floor(Math.random() * logo_colors.length)];
	}
	
	// set the text color of the randomize button
	$('h1').css({'color':temp_color});
}, 5000);

// randomize button animation - 1 second
var randomize_coloring = setInterval(function() {
	// get a color from the array
	var temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];

	// while the color matches the existing color it's meant to replace
	while ($('.randomize').css('background') === temp_color) {
		// choose a new color from the array
		temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];
	}
	
	// set the background of the randomize button
	$('.randomize').css({'background':'#' + temp_color});
}, 1000);

var randomize_text = setInterval(function() {
	var temp_text = random_randomize[Math.floor(Math.random() * random_randomize.length)];

	while ($('.randomize').val() === temp_text) {
		temp_text = random_randomize[Math.floor(Math.random() * random_randomize.length)];
	}

	$('.randomize').val(temp_text);
}, 500);