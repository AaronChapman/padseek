var tutorial_stages = ['play sequence', 'shared sequences', 'sample selection', 'tempo', 'pad pieces', 'pad manipulation', 'sequence manipulation', 'clearing selections', 'randomization', 'finished tutorial', 'close tutorial'];
var current_stage = 'play sequence';

function toggle_more_information() {
	// overlay
}

function fire() {
	advance(tutorial_stages[tutorial_stages.indexOf(current_stage)]);
}

function advance(stage) {
	console.log(stage);
	if (stage == 'play sequence') { tutorial_play_sequence(); }
	else if (stage == 'shared sequences') { tutorial_shared_sequences(); }
	else if (stage == 'sample selection') { tutorial_sample_selection(); }
	else if (stage == 'tempo') { tutorial_tempo(); }
	else if (stage == 'pad pieces') { tutorial_pad_pieces(); }
	else if (stage == 'clearing selections') { tutorial_clearing_selections(); }
	else if (stage == 'pad manipulation') { tutorial_pad_manipulation(); }
	else if (stage == 'sequence manipulation') { tutorial_sequence_manipulation(); }
	else if (stage == 'randomization') { tutorial_randomization(); }
	else if (stage == 'finished tutorial') { console.log('running tutorial_finished'); tutorial_finished(); }
	else if (stage == 'close tutorial') { tutorial_close(); }
}

function tutorial_play_sequence() {
	$('.advance_tutorial').val('next');
	$('.tutorial_text').text('use this button to play the drum sequence that is currently loaded');
	
	$('.play_sequence').css({'animation':'tutorial_float 1s ease-in-out infinite'});
	
	$('body').find('h1, .github_button, .sequence_controls *:not(".play_sequence"), .sequence_sharing, .tempo_tool, .randomization_module, .labels, .selects, .pad').css('opacity', '0.2');
	
	current_stage = 'shared sequences';
}
			
function tutorial_shared_sequences() {
	$('.tutorial_text').text('here you can load up some drum sequences that have been shared by other users');
	
	$('.play_sequence').css({'animation':'tutorial_float 2s ease-in-out infinite'});
	$('.shared_sequence:first').css({'animation':'tutorial_float 1s ease-in-out infinite'});
	
	$('body').find('.sequence_sharing, .sequence_sharing .shared_sequences').css({'opacity':'1.0'});
	$('body').find('h1, .github_button, .sequence_controls, .share_sequence, .tempo_tool, .randomization_module, .labels, .selects, .pad').css('opacity', '0.2');
	
	current_stage = 'sample selection';
}
			
function tutorial_sample_selection() {	
	$('.tutorial_text').text('choose a set of samples that sounds good to your ears');
	
	$('.shared_sequence:first').css({'animation':'unset'});
	$('.labels, .selects').css({'opacity':'1.0', 'animation':'tutorial_samples 2s ease-in-out infinite'});
	
	$('body').find('h1, .github_button, .sequence_controls, .sequence_sharing, .randomization_module, .pad').css('opacity', '0.2');
	
	current_stage = 'tempo';
}
			
function tutorial_tempo() {
	$('.tutorial_text').text('set the tempo of the drum sequence using the tempo field or keyboard commands (tempo is calculated as beats per minute)');
	
	$('.labels, .selects').css('animation', 'unset');
	$('.tempo_field, .tempo_tool').css({'animation':'tutorial_float 2s ease-in-out infinite'});
	
	$('.sequence_controls, .tempo_tool, .tempo_field').css({'opacity':'1.0'});
	$('body').find('.tempo_tool, .tempo_field').css({'opacity':'1.0'});
	$('body').find('h1, .github_button, .sequence_controls *:not(".tempo_field"), .sequence_sharing, .randomization_module, .labels, .selects, .pad').css('opacity', '0.2');
	
	current_stage = 'pad pieces';
}
			
function tutorial_pad_pieces() {
	$('.tutorial_text').text('activate or deactivate pad pieces to edit up your drum sequence. the rows are for each sample type and the columns match the tempo');
	
	$('.tempo_field, .tempo_tool').css('animation', 'unset');
	$('.pad, .pad *').css({'opacity':'1.0'});
	$('.pad_piece[data-state="active"]').css({'opacity':'1.0', 'animation':'tutorial_pad_pieces 2s ease-in-out infinite'});
	
	$('body').find('h1, .github_button, .sequence_controls, .sequence_sharing, .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .tempo_tool, .randomization_module, .labels, .selects').css('opacity', '0.2');
	
	current_stage = 'pad manipulation';
}
			
function tutorial_pad_manipulation() {
	$('.tutorial_text').text('you can remove or duplicate individual drum pads with by clicking on the options directly above each pad');
	
	$('.clear_selections').css('animation', 'unset');
	$('.pad, .remove_pad, .duplicate_pad').css({'opacity':'1.0'});
	
	$('body').find('h1, .github_button, .sequence_controls, .sequence_sharing, .duplicate_sequence, .remove_all_pads, .tempo_tool, .randomization_module, .labels, .selects').css('opacity', '0.2');
	
	current_stage = 'sequence manipulation';
}
			
function tutorial_sequence_manipulation() {
	$('.tutorial_text').text('you can also duplicate the entire sequence (up to 16 pads (maximum number of pads is 32)), or remove all drum pads but the first');
	
	$('.remove_pad, .duplicate_pad').css('animation', 'unset');
	$('.pad, .duplicate_sequence, .remove_all_pads').css({'opacity':'1.0'});
	$('.duplicate_sequence, .remove_all_pads').css({'animation':'tutorial_float 2s ease-in-out infinite'});
	
	$('body').find('h1, .github_button, .sequence_controls, .sequence_sharing, .duplicate_pad, .remove_pad, .tempo_tool, .randomization_module, .labels, .selects').css('opacity', '0.2');
	
	current_stage = 'clearing selections';
}
			
function tutorial_clearing_selections() {
	$('.tutorial_text').text('to deactivate all the pad pieces you\'ve activated, use this button');
	
	$('.duplicate_sequence, .remove_all_pads').css('animation', 'unset');
	$('.sequence_controls, .clear_selections').css({'opacity':'1.0'});
	$('.clear_selections').css({'animation':'tutorial_pad_pieces 2s ease-in-out infinite, tutorial_float 2s ease-in-out infinite'});
	
	$('body').find('h1, .github_button, .sequence_controls *:not(".clear_selections"), .sequence_sharing, .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .tempo_tool, .randomization_module, .labels, .selects, .pad').css('opacity', '0.2');
	
	current_stage = 'randomization';
}
			
function tutorial_randomization() {
	$('.tutorial_text').text('randomize your sequence using this module. there are plenty of options to choose from');
	
	$('.clear_selections').css('animation', 'unset');
	$('.randomization_module').css({'opacity':'1.0'});
	$('.randomization_module').css({'animation':'tutorial_float_shadowless 2s ease-in-out infinite'});
	
	$('body').find('h1, .github_button, .sequence_controls, sequence_controls .sequence_sharing, .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .tempo_tool, .labels, .selects, .pad').css('opacity', '0.2');
	
	current_stage = 'finished tutorial';
}

function tutorial_finished() {
	$('.randomization_module').css({'animation':'unset', 'opacity':'0.2'});
	$('.tutorial_text').text('that\'s basically it. you can take it from here!');
	$('.advance_tutorial').val('done');
	
	current_stage = 'close tutorial';
}

function tutorial_close() {
	close_walkthrough_options();
}

function close_walkthrough_options() {
	$('.tutorial_overlay').css({'opacity':'0'});
	
	$('body').find('h1, .github_button, .sequence_controls, .sequence_controls *, .sequence_sharing, .sequence_sharing *:not(".name_sequence_overlay"), .duplicate_sequence, .remove_all_pads, .remove_pad, .duplicate_pad, .randomization_module, .tempo_tool, .labels, .selects, .pad, .currently_loaded_sequence').css('opacity', '1.0');
	
	$('.clear_selections, .randomization_module, .duplicate_sequence, .remove_all_pads, .clear_selections, .tempo_field, .tempo_tool, .shared_sequence, .labels, .selects, .remove_pad, .duplicate_pad, .pad_piece').css('animation', 'unset');
	
	set_sequence_from_JSON('{"active_pieces":["2-1","6-1","1-2","2-4","3-5","4-5","6-5","7-5","5-7","1-8","8-8","14-1","16-1","13-7","18-1","22-1","17-2","18-4","19-5","20-5","22-5","23-5","21-7","17-8","24-8","30-1","32-1","31-4","26-5","29-7","31-7","27-8"],"name":"clean & simple - stacking test","sample_paths":["wooden-chair.mp3","time-cymbal.mp3","tribal-ride.mp3","meaty-hi-hat.mp3","firm-hi-hat.mp3","lofi-crunk-snare.mp3","well-rounded-snare.mp3","disruptive-kick.mp3"],"tempo":"198"}');
	
	setTimeout(function() {
		$('.advance_tutorial').val('start tour');
		$('.tutorial_text').text("click 'start tour' below for a quick walkthrough");
		
		current_stage = 'play sequence';
	}, 1000);
}

$(document).ready(function() {
	$('.what_is_this').click(function(event) {
		event.preventDefault();
		
		$('.tutorial_overlay').css({'z-index':'5', 'opacity':'1.0'});
	});
});