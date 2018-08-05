var tutorial_stages = ['play sequence', 'shared sequences', 'sample selection', 'tempo', 'pad pieces', 'clearing selections', 'pad manipulation', 'sequence manipulation', 'randomization'];

function toggle_more_information() {
	// overlay
}

function start_tutorial() {
	advance('play sequence');
}

function advance(stage) {
	switch (stage) {
		case 'play sequence':
			tutorial_play_sequence();
		case 'shared sequences':
			tutorial_shared_sequences();
		case 'sample selection'
			tutorial_sample_selection();
		case 'tempo':
			tutorial_tempo();
		case 'pad pieces':
			tutorial_pad_pieces();
		case 'clearing selections'
			tutorial_clearing_selections();
		case 'pad manipulation':
			tutorial_pad_manipulation();
		case 'sequence manipulation':
			tutorial_sequence_manipulation();
		case 'randomization'
			tutorial_randomization();
	}
}

function tutorial_play_sequence() {
	advance('shared sequences');
}
			
function tutorial_shared_sequences() {
	advance('sample selection');
}
			
function tutorial_sample_selection() {
	advance('tempo');
}
			
function tutorial_tempo() {
	advance('pad pieces');
}
			
function tutorial_pad_pieces() {
	advance('clearing selections');
}
			
function tutorial_clearing_selections() {
	advance('pad manipulation');
}
			
function tutorial_pad_manipulation() {
	advance('sequence manipulation');
}
			
function tutorial_sequence_manipulation() {
	advance('randomization');
}
			
function tutorial_randomization() {
	advance('');
}