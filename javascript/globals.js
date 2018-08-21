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
var current_column_in_sequence = 1;
var current_sequence_name = '';

// track number of activated pad pieces
var activated_pad_pieces = 0;

// randomize button palette
var randomize_colors = ["#fff8f5", "#fef3f3", "#f3edf0", "#e8e8eb", "#f2eff1", "#fff2ec", "#fde7e7", "#e8dbe2", "#d2d1d8", "#e5dfe3", "#ffebe2", "#fcdbdb", "#ddc9d4", "#bcbac5", "#d9d0d6", "#ffe5d9", "#fbd0cf", "#d2b7c5", "#a6a3b2", "#ccc0c8", "#ffdfcf", "#fac4c3", "#c7a5b7", "#908c9f", "#bfb1bb", "#ffd8c6", "#fab8b8", "#bb94a9", "#79758c", "#b3a1ad", "#ffd2bc", "#f9acac", "#b0829b", "#635e79", "#a692a0", "#ffccb3", "#f8a1a0", "#a5708c", "#4d4766", "#998292", "#ffc5a9", "#f79594", "#9a5e7e", "#373053", "#8d7385", "#ffbfa0", "#f68988", "#8f4c70", "#211940", "#806377", "#f5f7f9", "#f1f5f8", "#fbf8f6", "#f9f2f1", "#ecf0f3", "#e4ecf2", "#f7f2ed", "#f3e6e3", "#e3e8ed", "#d7e2ec", "#f3ebe4", "#eed9d5", "#dae1e7", "#c9d9e5", "#efe5dc", "#e8cdc7", "#d1d9e1", "#bcd0df", "#ebdfd3", "#e2c1b9", "#c7d2dc", "#afc6d9", "#e7d8ca", "#ddb4ac", "#becad6", "#a2bdd3", "#e3d2c1", "#d7a89e", "#b5c3d0", "#94b4cc", "#dfccb9", "#d19c90", "#acbbca", "#87aac6", "#dbc5b0", "#cc8f82", "#a3b4c4", "#7aa1c0", "#d7bfa7", "#c68374"];

// randomize button animation
var randomize_coloring = setInterval(function () {
	// get a color from the array
	var temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];

	// while the color matches the existing color it's meant to replace
	while ($('.randomize').css('background') === temp_color) {
		// choose a new color from the array
		temp_color = randomize_colors[Math.floor(Math.random() * randomize_colors.length)];
	}

	// set the background of the randomize button
	$('.randomize').css({
		'background': temp_color
	});
	$('.random_shared_sequence').css({
		'border-color': temp_color,
		'color': temp_color
	});
}, 1000);


/*-----------------------*/
/* SAMPLE PATH VARIABLES */
/*-----------------------*/

// lists of drum sample option file names
var crash_cymbals = ['cinematic-cymbal.mp3', 'knows-all-cymbal.mp3', 'oriental-cymbal.mp3', 'rich-cymbal.mp3', 'thin-cymbal.mp3', 'time-cymbal.mp3', 'wispy-wonky-cymbal.mp3', 'at-last-cymbal.mp3', 'dead-cavern-cymbal.mp3', 'dustless-cymbal.mp3', 'logical-tine-cymbal.mp3', 'markarth-cymbal.mp3', 'match-point-cymbal.mp3', 'righto-cymbal.mp3', 'smear-mass-cymbal.mp3', 'time-will-tell-cymbal.mp3', 'worthiness-cymbal.mp3', 'carefree-cymbal.mp3', 'funny-guy-cymbal.mp3', 'tiny-gong-cymbal.mp3', 'washed-cymbal.mp3', 'worrisome-cymbal.mp3'];

var ride_cymbals = ['grime-ride.mp3', 'lazy-ride.mp3', 'steam-ride.mp3', 'traditional-ride.mp3', 'tribal-ride.mp3', 'goofy-ride.mp3', '22-inch-ride.mp3', 'a-big-ride.mp3', 'abrupt-ride.mp3', 'alien-ride.mp3', 'and-thats-the-ride.mp3', 'charlie-sheen-ride.mp3', 'chipmunk-glitter-ride.mp3', 'cigarette-ride.mp3', 'clean-your-room-ride.mp3', 'heavier-punchline-ride.mp3', 'lo-why-ride.mp3', 'merciful-ride.mp3', 'predictive-ride.mp3', 'professional-ride.mp3', 'punchline-ride.mp3', 'puny-ride.mp3', 'sad-times-ride.mp3', 'satisfied-ride.mp3', 'sea-salt-ride.mp3', 'speed-ride.mp3', 'splash-glide-ride.mp3', 'timely-bovine-ride.mp3', 'twisted-shiled-ride.mp3'];

var open_hi_hats = ['meaty-hi-hat.mp3', 'rich-hi-hat.mp3', 'substantial-hi-hat.mp3', 'thin-hi-hat.mp3', 'amusement-park-hi-hat.mp3', 'bead-scatter-hi-hat.mp3', 'chow-time-hi-hat.mp3', 'laser-thin-hi-hat.mp3', 'scissor-hi-hat.mp3', 'sizzling-hi-hat.mp3', 'speed-juice-hi-hat.mp3', 'spicy-hi-hat.mp3', 'steam-tincture-hi-hat.mp3', 'big-ass-hi-hat.mp3', 'cheerful-hi-hat.mp3', 'classy-hi-hat.mp3', 'cow-house-hi-hat.mp3', 'egg-beater-hi-hat.mp3', 'mindful-hi-hat.mp3', 'prideful-hi-hat.mp3', 'puttered-hi-hat.mp3', 'samurai-hi-hat.mp3', 'spicy-wet-hi-hat.mp3', 'thin-mechanical-hi-hat.mp3', 'tired-hi-hat.mp3'];

var closed_hi_hats = ['firm-hi-hat.mp3', 'light-and-lengthy-hi-hat.mp3', 'light-hi-hat.mp3', 'light-spread-hi-hat.mp3', 'lofi-hi-hat.mp3', 'razor-thin-hi-hat.mp3', 'stan-hi-hat.mp3', 'tinny-hi-hat.mp3', 'about-to-break-hi-hat.mp3', 'bad-hi-hat.mp3', 'hearty-hi-hat.mp3', 'is-this-even-a-hi-hat.mp3', 'less-solid-hi-hat.mp3', 'loud-af-hi-hat.mp3', 'mad-hi-hat.mp3', 'no-mess-hi-hat.mp3', 'pop-cap-hi-hat.mp3', 'quick-and-sloppy-hi-hat.mp3', 'razor-sharp-hi-hat.mp3', 'rude-hi-hat.mp3', 'sass-cave-hi-hat.mp3', 'solid-hi-hat.mp3', 'spine-sprinkling-hi-hat.mp3', 'tiny-hi-hat.mp3', 'trap-hi-hat.mp3', 'vinyl-hi-hat.mp3', 'wimpy-hi-hat.mp3', 'burnt-hi-hat.mp3', 'dinky-hi-hat.mp3', 'dust-monkey-hi-hat.mp3', 'halt-hi-hat.mp3', 'nice-and-dry-hi-hat.mp3', 'one-word-hi-hat.mp3', 'outspoken-hi-hat.mp3', 'puny-little-hi-hat.mp3', 'switch-blade-hi-hat.mp3', 'rolthen-hi-hat.mp3', 'sandpaper-hi-hat.mp3', 'sizeable-nickel-hi-hat.mp3', 'sunset-shiv-hi-hat.mp3', 'tiny-tin-hi-hat.mp3', 'toothpaste-hi-hat.mp3', 'tries-too-hard-hi-hat.mp3', 'unsure-hi-hat.mp3', 'whiny-white-hi-hat.mp3', 'will-o-the-wisp-hi-hat.mp3'];

var snares = ['bangle-snare.mp3', 'breathless-snare.mp3', 'bunk-snare.mp3', 'clap-like-snare.mp3', 'crunchy-peanut-spread-snare.mp3', 'crunchy-snare.mp3', 'dopey-snare.mp3', 'hardstyle-snare.mp3', 'heavy-snare.mp3', 'lofi-bump-snare.mp3', 'lofi-crunk-snare.mp3', 'orphan-snare.mp3', 'pathetic-snare.mp3', 'pumped-snare.mp3', 'punctual-snare.mp3', 'raw-cut-snare.mp3', 'smacky-snare.mp3', 'splatter-snare.mp3', 'thick-smack-snare.mp3', 'toy-snare.mp3', 'weak-snare.mp3', 'well-rounded-snare.mp3', 'smacky-popper-snare.mp3', 'spmock-snare.mp3', 'wrecked-scratch-snare.mp3', '80s-snare.mp3', 'a-rim-snare.mp3', 'an-applaud-snare.mp3', 'assertive-snare.mp3', 'big-noise-boys-snare.mp3', 'boring-trap-snare.mp3', 'chasm-toys-snare.mp3', 'clurp-snare.mp3', 'crock-punch-snare.mp3', 'dinkleberg-snare.mp3', 'dinosaur-egg-snare.mp3', 'factual-snare.mp3', 'flat-80s-snare.mp3', 'hard-crunch-clap-snare.mp3', 'hot-cheetos-snare.mp3', 'lil-baby-snare.mp3', 'lofi-dunk-snare.mp3', 'loud-and-obnoxious-snare.mp3', 'minty-crunch-spread-snare.mp3', 'playground-pizzazz-snare.mp3', 'poignant-but-punctual-snare.mp3', 'questioning-snare.mp3', 'raspy-snare.mp3', 'roller-coaster-snare.mp3', 'say-what-snare.mp3', 'skrt-snare.mp3', 'sputnik-snare.mp3', 'thin-hollow-tin-snare.mp3', 'this-is-a-trash-snare.mp3', 'trapaholic-snare.mp3', 'unsure-snare.mp3', 'warehouse-clap-snare.mp3', 'wet-and-wide-clap-snare.mp3', 'wicked-work-snare.mp3', 'wooden-kitchen-snare.mp3'];

var kick_drums = ['cut-you-up-kick.mp3', 'disruptive-kick.mp3', 'distinct-kick.mp3', 'pale-kick.mp3', 'prehistor-khick.mp3', 'pumpy-kick.mp3', 'punchy-kick.mp3', 'thumpy-kick.mp3', 'wide-and-weak-kick.mp3', 'a-thousand-leagues-kick.mp3', 'beatbox-kick.mp3', 'bounce-house-kick.mp3', 'bowling-kick.mp3', 'compact-kick.mp3', 'da-bump-kick.mp3', 'dashboard-kick.mp3', 'dat-frump-kick.mp3', 'dunk-kick.mp3', 'jingle-funk-kick.mp3', 'junky-kick.mp3', 'layering-kick.mp3', 'stomp-master-kick.mp3', 'thicc-kick.mp3', 'ugly-mother-fucking-kick.mp3', 'wet-n-wide-kick.mp3', 'whack-kick.mp3', 'whock-kick.mp3', 'bunt-cake-kick.mp3', 'clown-ball-kick.mp3', 'deep-thought-kick.mp3', 'dirt-drum-kick.mp3', 'dry-thump-kick.mp3', 'hufsty-muvly-kick.mp3', 'klown-wall-kick.mp3', 'kunk-kick.mp3', 'party-stomp-kick.mp3', 'scratch-the-kick.mp3', 'spam-dunk-kick.mp3', 'stocky-dork-kick.mp3', 'tasty-kick.mp3', 'thermal-kick.mp3', 'thirsty-kick.mp3', 'trashcan-jam-kick.mp3', 'well-mannered-kick.mp3'];

var sound_effects = ['bicycle-bell.mp3', 'bottle-cap.mp3', 'cork-popping.mp3', 'drum-sticks.mp3', 'lighter-smack.mp3', 'raw-thump.mp3', 'star-twinkle.mp3', 'thawing-tap.mp3', 'wooden-chair.mp3', 'wooden-smack.mp3', 'gear-knife.mp3', 'techno-anger.mp3', 'techno-horror.mp3', 'techno-labor.mp3', 'techno-murder.mp3', 'breathy-crush.mp3', 'bumbo-drum.mp3', 'clam-clasp.mp3', 'clanglass.mp3', 'clinglass.mp3', 'croak-fog.mp3', 'curious-cowbell.mp3', 'ding-a-ling.mp3', 'doof-it-drum.mp3', 'drippy-cavern.mp3', 'dumbo-dumb.mp3', 'expensive-piece.mp3', 'gonzales-cowbell.mp3', 'hayllo-pop.mp3', 'hungo-done.mp3', 'ice-cream-shop-bell.mp3', 'ice-cream-shop-hell.mp3', 'interrupted-seduction-chimes.mp3', 'jp-charged.mp3', 'jungle-windows.mp3', 'michael-cera.mp3', 'micro-whistle.mp3', 'mini-hurt.mp3', 'mo-rock.mp3', 'mystic-beans.mp3', 'oak-frog.mp3', 'plain-cowbell.mp3', 'primo-primo.mp3', 'rim-bump.mp3', 'space-goop.mp3', 'staturatory-cowbell.mp3', 'sturdy-dent.mp3', 'swordplay.mp3', 'tan-drum.mp3', 'that-sticks-man.mp3', 'the-stiiiicks.mp3', 'tune-in-for-tines.mp3', 'vibrslope.mp3', 'wood-spark.mp3', 'worshade.mp3', 'worshe.mp3', 'worshit.mp3', 'worshown.mp3', 'yung-tamb.mp3', 'zovalon-4001.mp3', 'zovalon-4002.mp3', 'zovalon-4003.mp3'];

// list of objects with directory name & sound path array properties
var sample_directories = [
	{
		directory: 'sound-effects',
		sound_paths: sound_effects
	},
	{
		directory: 'crash-cymbals',
		sound_paths: crash_cymbals
	},
	{
		directory: 'ride-cymbals',
		sound_paths: ride_cymbals
	},
	{
		directory: 'open-hi-hats',
		sound_paths: open_hi_hats
	},
	{
		directory: 'closed-hi-hats',
		sound_paths: closed_hi_hats
	},
	{
		directory: 'snares',
		sound_paths: snares
	},
	{
		directory: 'snares',
		sound_paths: snares
	},
	{
		directory: 'kick-drums',
		sound_paths: kick_drums
	}];

// sample directory path array
var sequence_sample_paths = [['samples/none.mp3'], ['samples/none.mp3'],
														['samples/none.mp3'], ['samples/none.mp3'],
														['samples/none.mp3'], ['samples/none.mp3'],
														['samples/none.mp3'], ['samples/none.mp3']];
// selection sample options
var selected_options = [];

// stores the JSON data objects for shared sequences
var shared_sequences = [];