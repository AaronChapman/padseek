(function($) {
	$.extend({play_sound: function() {
		return $('<audio class="sound-player" autoplay="autoplay" style="display: none;">' +
						 '<source src="' + arguments[0] + '" />' +
						 '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>' +
						 '</audio>').appendTo('body');
	}, stop_sound: function() { $(".sound-player").remove(); }});
})(jQuery);