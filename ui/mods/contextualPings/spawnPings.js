function createPuppet(puppetName, location,animation,effectsType,color,pingDuration){ //takes in name of unit in file, and contextual info then generates the rest of create puppet
		

	
	color.push(0.98)
		puppetName+=".json";
		var chosenUnit;
		var config = [{}];
		unitKeys = _.keys(model.unitSpecs);
		for(var i = 0;i<unitKeys.length;i++){
			
			if(unitKeys[i].endsWith(puppetName)){
				chosenUnit = unitKeys[i];
			}
		}
		if(!chosenUnit.length>1){return}
		$.getJSON("coui://"+chosenUnit).then(function(data){
			
			unitJSON = data;
			console.log(effectsType)
			if(effectsType != undefined){config[0].fx_offsets =  
				
					{
					  "type": "energy",
					  "filename": "/pa/effects/custom_specs/"+effectsType+".pfx",
					  "offset": [
						0,
						0,
						0
					  ],
					  "orientation": [
						0,
						0,
						0
					  ]
					}
				  
			}
			config[0].model = unitJSON.model;
			if(Array.isArray(config[0].model)){
				config[0].model = config[0].model[0]
			}
			if(animation.length>1){config[0].animate = {"anim_name":animation};}
			config[0].location = location;
			config[0].material = { 
			"shader":"pa_unit_ghost",
			"constants":{
			   "GhostColor":color ,
			   "BuildInfo":[
				  0,
				  0,
				  0,
				  0
			   ]
			},
			"textures":{
			   "Diffuse":"/pa/effects/textures/diffuse.papa"
			}}
		
			api.getWorldView(0).puppet(config, true).then((function(result){
				setTimeout(function() { killPuppet(result[0].id); }, pingDuration*1000);
			}));
		
		
	});
}

function killPuppet(puppetid){

	api.getWorldView(0).unPuppet(puppetid);
}

var mutePings = false;
handlers.spawnPuppet = function(payload) { //modified for ping mod
	

	//if model is an array then spawn a puppet for each one, made to allow multiple colors
	console.log("spawnpuppet called with"+payload)
	payload = JSON.parse(payload);
	var audioFile = payload.audio;
	var model = payload.modelName;
	var color = payload.color;
	var pingDuration = payload.puppetDuration;
	var effect = payload.effect;
	if(effect == undefined){effect = "pingWhite"}
	delete payload.effect;
	delete payload.audio;
	delete payload.duration;
	delete payload.modelName;
	delete payload.color;
	if( audioFile.length>1 & mutePings == false){
		playAudio(audioFile)
	}
	createPuppet(model,payload,"idle",effect,color,pingDuration)
	api.Panel.message(api.panels.unit_alert.id, 'triggerPingAlert',payload)

	};
	


handlers.mutePings = function() {
	mutePings = !mutePings;
}

function playAudio(filename){
	api.audio.playSoundFromFile(filename);
}

function killPuppets(){
	
	
	if(model.maxEnergy() > 0){
		
		clearAllPuppets();
		return;
	}
	else{setTimeout(killPuppets, 1000);
	return;}
	
	
	}

