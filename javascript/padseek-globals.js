// determines whether or not the sequence is running
var sequence_running = false;

// sequence tempo
var calculated_tempo = 125;

// index of row that's currently firing in sequence
var current_row_in_sequence = 1;

// track number of activated pad pieces
var activated_pad_pieces = 0;

// lists of drum sample option file names
var crash_cymbals = ['thin-cymbal.wav'];
var ride_cymbals = ['tribal-ride.wav'];
var open_hi_hats = ['meaty-hi-hat.wav', 'thin-hi-hat.wav'];
var closed_hi_hats = ['light-hi-hat.wav'];
var snares = ['bangle-snare.mp3', 'breathless-snare.mp3', 'bunk-snare.mp3', 'clap-like-snare.mp3', 'crunchy-peanut-spread-snare.mp3', 'crunchy-snare.mp3', 'dopey-snare.mp3', 'hardstyle-snare.mp3', 'heavy-snare.mp3', 'lofi-bump-snare.mp3', 'lofi-crunk-snare.mp3', 'orphan-snare.mp3', 'pathetic-snare.mp3', 'pumped-snare.mp3', 'punctual-snare.mp3', 'raw-cut-snare.mp3', 'smacky-snare.mp3', 'splatter-snare.mp3', 'thick-smack-snare.mp3', 'toy-snare.mp3', 'weak-snare.mp3', 'well-rounded-snare.mp3'];
var kick_drums = ['prehistor-khick.wav', 'thumpy-kick.wav'];
var miscellaneous_percussion = ['radio-transmissions.wav'];

// list of objects with directory name & sound path array properties
var sample_directories = [{directory: 'crash-cymbals', sound_paths: crash_cymbals},
						{directory: 'ride-cymbals', sound_paths: ride_cymbals},
						{directory: 'open-hi-hats', sound_paths: open_hi_hats},
						{directory: 'closed-hi-hats', sound_paths: closed_hi_hats},
						{directory: 'snares', sound_paths: snares},
						{directory: 'kick-drums', sound_paths: kick_drums},
						{directory: 'miscellaneous-percussion', sound_paths: miscellaneous_percussion}];

// sample directory path array
var sequence_sample_paths = ['samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3'];

// logo palette
var logo_colors = ['white', 'aliceblue', 'aliceblue', 'slategray', 'antiquewhite', 'antiquewhite', 'rgba(00, 00, 00, 0.1)', 'rgba(00, 00, 00, 0.25)'];

var randomize_colors = ['9AA0A8', '413C58', '67597A', 'CC7178', 'F2E7C9', 'CF9893', '7D98A1', '5E6572', 'FFEEDD', 'FFD8BE'];

// logo animation
var logo_coloring = setInterval(function() {
	var temp_color = logo_colors[Math.floor(Math.random() * logo_colors.length)];
	
	while ($('.randomize').css('background') === temp_color) {
		temp_color = logo_colors[Math.floor(Math.random() * logo_colors.length)];
	}
	
	$('h1').css({'color':temp_color});
}, 5000);

var randomize_coloring = setInterval(function() {
	var temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];

	while ($('.randomize').css('background') === temp_color) {
		temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];
	}
	
	$('.randomize').css({'background':'#' + temp_color});
}, 1000);