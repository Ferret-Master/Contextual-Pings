
//not sure how badly id matters so will just use a rounded location value to hopefully get unique numbers

var baseAlert = {"id":367,"magnitude":0,
"is_allied":false,
"watch_type":3,
"unit_types":[0,0,0,0],
"planet_id":0,
"spec_id":"",
"location":{"x":-174.23052978515625,"y":292.1070251464844,"z":-195.543701171875},
"army_id":-1,
"is_hostile":false,
"energy_requirement_met":false,
"ammo_count":0,
"max_ammo_count":0
}


// triggers a ping alert at the location of the ping
handlers.triggerPingAlert = function(payload){
    var location = payload.pos;
    var id = Math.round(location.x+100)
    baseAlert.id = id;
    baseAlert.location = location
    model.processList([baseAlert])
}