


        

            var cursor_x = -1;
            var cursor_y = -1;
            document.onmousemove = function(event)
            {
       
            cursor_x = event.pageX;
            cursor_y = event.pageY;
            }
            
            // Pings are defined below in the following format
            /*
            
            ping_name = {

                modelName: "model_name",
                color : [R,G,B],
                sound : "sound_file_path",
                scale: 5, //size of the model compared to base
                duration : 10, //length of ping
                effect: effectname, //the name of the desired effect to be attached to the ping
                global: bool //optional value that if set to true will use let all players see the ping

            }
            */ 

            var defensePing = {
                modelName: "ping_shield",
                color : [0,0,100],
                sound : "/pa/audio/defense.wav",
                scale: 5,
                duration : 10,
                effect: "pingBlue"

            };
            var attackPing = {
                modelName: "ping_sword",
                color : [100,0,0],
                sound : "/pa/audio/sword.wav",
                scale: 6,
                duration : 10,
                effect: "pingRed"
            };
            var comPing = {
                modelName: "ping_com",
                color : [0.7,0.7,0.7],
                sound : "/pa/audio/commander.wav",
                scale: 6,
                duration : 10
            };
            var moneyPing = {
                modelName: "ping_money",
                color : [0,100,0],
                sound : "/pa/audio/cash.wav",
                scale: 5,
                duration : 10,
                effect: "pingGreen"
            };
            var antiNukePing = {
                modelName: "anti_nuke_launcher",
                color : [20,50,100],
                sound : "/pa/audio/antiNuke.wav",
                scale: 2,
                duration : 10
            };
            var flagPing = {
                modelName: "ping_flag",
                color : [100,100,100],
                sound : "/pa/audio/peace.wav",
                scale: 0.2,
                duration : 10,
                global: true

            };

            pingNameMap = {"defensePing":defensePing,"attackPing":attackPing,"comPing":comPing,"moneyPing":moneyPing,"antiNukePing":antiNukePing,"peacePing":flagPing}
            var selectedPing = defensePing; 
            
            function contextual_ping(){  
                var hdeck = model.holodeck;
                hdeck.raycastTerrain(cursor_x, cursor_y).then(function(loc3D) {
                    if (loc3D.pos) {
                        var puppetObject ={
            
                            planet: loc3D.planet || 0,
                            pos: loc3D.pos,
                            orient_rel: true,
                            scale: selectedPing.scale,
                            snap: true,
                            color:selectedPing.color,
                            modelName:selectedPing.modelName,
                            audio: selectedPing.sound,
                            puppetDuration: selectedPing.duration,
                            effect: selectedPing.effect

                        
                        }
                         var global = selectedPing.global;
                         if(global == true){
              
                         model.send_message("chat_message", {message: ("ContextualPings:"+JSON.stringify(puppetObject))});
                         model.send_message("chat_message", {message: " "})}
                         else{
                             
                            model.send_message("team_chat_message", {message: ("ContextualPings:"+JSON.stringify(puppetObject))});
                            model.send_message("team_chat_message", {message: " "})}
                    }});

        }
        
        var pingtime = 0;
        var map = {18: false, 80: false};
        var spamCheck = {
            previousMinuteNumber:0,
            pingsCount :0,
            minuteNumber :0
        }
        $(document).keydown(function(e) {
            if (e.keyCode in map) {
                map[e.keyCode] = true;
                var currentTime = new Date().getTime()/1000;
                var currentMinute = Math.round(currentTime/60);
                if(spamCheck.minuteNumber != currentMinute){spamCheck.previousMinuteNumber = spamCheck.minuteNumber;spamCheck.pingsCount = 0}
                spamCheck.minuteNumber = currentMinute;
                
            
                var timeSinceLastPing = (currentTime-pingtime)
                if (map[18] && map[80] & timeSinceLastPing > 2 & spamCheck.pingsCount<8) {
                   contextual_ping();
                   spamCheck.pingsCount+=1;
                   pingtime = new Date().getTime()/1000;
                }
            }
        }).keyup(function(e) {
            if (e.keyCode in map) {
                map[e.keyCode] = false;
            }
        });
        
        handlers.chosenPing = function(payload){
           
            selectedPing = pingNameMap[payload];

        }
                    
                    
                    
                
               
         
     


