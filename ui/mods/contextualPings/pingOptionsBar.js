
//currently this is just for adding a button to mute the ping audio, may add another button for disabling pings entirely
var pingArray = ["pingUnmuted","pingMuted"];
var defaultPing = pingArray[0];
var Ping_bar = (function () {
		var Ping_bar = {};
		Ping_bar.chosenPing = ko.observable(defaultPing);

	    return Ping_bar;
})();

base_path = "coui://ui/mods/contextualPings/icons/"
var counter = 0;

ping_source = base_path + Ping_bar.chosenPing()+".png";

(function () {
    "use strict";
    model.Ping_bar = Ping_bar;
	self.ping_source = ko.computed(function(){
	
		return base_path + Ping_bar.chosenPing()+".png";
	
	}, self);

    //adds a toggle for sounds to live_game action bar
	$(".div_ingame_options_bar_cont").prepend("<div class=\"btn_ingame_options div_ping_bar_cont\"><a href=\"#\" data-bind=\"click: function () {if(counter<pingArray.length-1){counter++}else{counter = 0};Ping_bar.chosenPing(pingArray[counter]);api.Panel.message(api.Panel.parentId, 'mutePings','');}\"><img data-bind='attr : {src: ping_source()}' /></a></div>");
	
})();
