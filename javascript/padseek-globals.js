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
var snares = ['circus-snare.wav', 'marching-band-snare.wav'];
var kick_drums = ['prehistor-khick.wav', 'thumpy-kick.wav'];
var miscellaneous_percussion = ['radio-transmissions.wav'];
// sample directory path array
var sequence_sample_paths = ['samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3',
						 'samples/none.mp3','samples/none.mp3'];
// logo palette
var logo_colors = ['white', 'aliceblue', 'aliceblue', 'slategray', 'antiquewhite', 'antiquewhite', 'rgba(00, 00, 00, 0.1)', 'rgba(00, 00, 00, 0.25)'];
// logo animation
var logo_coloring = setInterval(function() {
$('h1').css({'color':logo_colors[Math.floor(Math.random() * logo_colors.length)]});
}, 5000);
// list of objects with directory name & sound path array properties
var sample_directories = [{directory: 'crash-cymbals', sound_paths: crash_cymbals},
						{directory: 'ride-cymbals', sound_paths: ride_cymbals},
						{directory: 'open-hi-hats', sound_paths: open_hi_hats},
						{directory: 'closed-hi-hats', sound_paths: closed_hi_hats},
						{directory: 'snares', sound_paths: snares},
						{directory: 'kick-drums', sound_paths: kick_drums},
						{directory: 'miscellaneous-percussion', sound_paths: miscellaneous_percussion}];