(function() {
	createFloatingFrame("ping_icon_frame", 100, 100, {"offset": "middleRight", "left": -20});
	
	
	//do a computed to show selected icon
	
	


/*
"<div class='data_util_select_opponent' data-bind='click: function() { api.select.commander(); api.camera.track(true); }'>" +
									"<img src='coui://ui/mods/ArmyUtil/floatzone/icon_si_commander.png'/>" +
									
								"</div>" +
								
								
								"<div class='status_bar_frame_commanderHP'>" +
										"<div class='status_bar_commanderHP' data-bind='style: {width: \"\" + (model.commanderHealth() * 158) + \"px\"}'></div>" +
									"</div>" +


*/



	$("#ping_icon_frame_content").append(
"<div class='div_ping_bar'>"+
"<div class='row'>"+
  "<div class='column'>"+
   "<img data-bind='click: function() {model.attackPing();}' src='coui://ui/mods/contextualPings/icons/attackPing.png' style='width:100%'/>"+
   "<img data-bind='click: function() {model.defensePing();}' src='coui://ui/mods/contextualPings/icons/defensePing.png' style='width:100%'/>"+
   "</div>"+
  "<div class='column'>"+
  "<img data-bind='click: function() {model.moneyPing();}' src='coui://ui/mods/contextualPings/icons/moneyPing.png' style='width:100%'/>"+
  "<img data-bind='click: function() {model.comPing();}' src='coui://ui/mods/contextualPings/icons/comPing.png' style='width:100%'/>"+
  "</div>"+
  "<div class='column'>"+
  "<img data-bind='click: function() {model.AntiNukePing();}' src='coui://ui/mods/contextualPings/icons/antiNukePing.png' style='width:100%'/>"+
  "<img data-bind='click: function() {model.flagPing();}' src='coui://ui/mods/contextualPings/icons/peacePing.png' style='width:100%'/>"+
  "</div>"+
  "<img id='ping_info_lock' src='' data-bind='click: function() { model.pingLockEvent(); }' class='ping_lock_icon'/>" +
"</div>"+
"</div>");
	
	if (localStorage["frames_ping_icon_frame_lockStatus"] == "true") {
		$("#ping_info_lock").attr("src", "coui://ui/mods/contextualPings/icons/lock-icon.png");
	} else  {
		$("#ping_info_lock").attr("src", "coui://ui/mods/contextualPings/icons/unlock-icon.png");
	}
})();

model.pingLockEvent = function() {
	if (localStorage["frames_ping_icon_frame_lockStatus"] == "true") {
		$("#ping_info_lock").attr("src", "coui://ui/mods/contextualPings/icons/unlock-icon.png");
		unlockFrame("ping_icon_frame");
	} else  {
		$("#ping_info_lock").attr("src", "coui://ui/mods/contextualPings/icons/lock-icon.png");
		lockFrame("ping_icon_frame");
	}
};
//probably a better method but manually making a function per ping for now

model.AntiNukePing = function(){
	
	api.Panel.message(api.Panel.parentId,'chosenPing','antiNukePing')
}
model.attackPing = function(){
	
	api.Panel.message(api.Panel.parentId,'chosenPing','attackPing')
}
model.defensePing = function(){
	
	api.Panel.message(api.Panel.parentId,'chosenPing','defensePing')
}
model.moneyPing = function(){
	
	api.Panel.message(api.Panel.parentId,'chosenPing','moneyPing')
}
model.comPing = function(){
	
	api.Panel.message(api.Panel.parentId,'chosenPing','comPing')
}
model.flagPing = function(){
	
	api.Panel.message(api.Panel.parentId,'chosenPing','peacePing')
}
