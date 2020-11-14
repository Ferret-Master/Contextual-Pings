	ping.addHandler('ContextualPings:', function (msg) {
	
		api.Panel.message(api.Panel.parentId, 'spawnPuppet',msg)
	}, true);
