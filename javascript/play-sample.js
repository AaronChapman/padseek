(function($) {
	$.extend({play_sound: function() {
		return $('<audio class="sound-player" autoplay="autoplay" style="display: none;">' +
						 '<source src="' + arguments[0] + '" />' +
						 '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>' +
						 '</audio>').appendTo('body');
	}, stop_sound: function() { $(".sound-player").remove(); }});
})(jQuery);


function sample_sample(select_index) {
	var sound_path = 'samples/';
	var selected_select = $('.select').eq(select_index);
	var selected_select_class = selected_select.attr('class').split(" ")[0];
	var class_trim = selected_select_class.substring(0, selected_select_class.length - 7).replace(/_/g, '-');

	sound_path += class_trim + '/' + selected_select.find('option:selected').text().replace(/ /g, '-') + '.mp3';

	$.play_sound(sound_path);
	
	setTimeout(function() {
		$('audio.sound-player:first').remove();
	}, calculated_tempo * 8);
}