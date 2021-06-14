function getAudioDevices(callback) {
    //https://askubuntu.com/questions/71863/how-to-change-pulseaudio-sink-with-pacmd-set-default-sink-during-playback
    var exec = require('child_process').exec,
                   child;
            child = exec("pacmd list-sinks",function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
        if (stdout.indexOf("failed") == -1) {
            //console.log("successfully sound",stdout.split("index"));
            var mainDevices = stdout.split("index");
            var deviceInfo = [];
            var audioDevices = [];
            
            for (var i = 1; i < mainDevices.length; i++) {
                var temps = mainDevices[i].split("\n");
                var audioDevice = [];
                var audioDeviceProperties = [];
                var lastSuccessfulKey = -1;
                var tempObject = [];
                var keyDuplicate = "";
                
                for (var j = 1; j < temps.length; j++) {
                    var tempProperties = temps[j].split(':')[1];
                    if (tempProperties !== undefined ) {
                        if (temps[j].indexOf("=") != -1) {
                            if (temps[j].indexOf("=") < temps[j].indexOf(":")) {
                                //Do the same as else (this is really dodgy I know, too tired, literally 1 AM)
                            var tempObjectx = []
                            var tempProperties = temps[j].replace("<","").replace(">","").trim();
                            if (tempProperties.indexOf("=")) {
                                var keyx  = tempProperties.substring(0, tempProperties.indexOf("="));
                                tempObjectx[keyx] = tempProperties.split('=')[1];//.replace('"',"").replace('"',"").trim();
                                tempProperties = tempObjectx;
                            }
                            if (tempObject.length == 0) {
                                var abc  = temps[lastSuccessfulKey].substring(0, temps[lastSuccessfulKey].indexOf(":")).trim();
                                tempObject.push(audioDeviceProperties[abc]);
                            }
                            
                            tempObject.push(tempProperties);
                            //audioDeviceProperties[abc].push(tempProperties);
                                //console.log("GOT ONE",tempProperties);
                                continue; //Skip the rest
                            }
                        }
                        if (tempObject.length != 0) {
                            var keyb  = temps[lastSuccessfulKey].substring(0, temps[lastSuccessfulKey].indexOf(":")).trim();
                            audioDeviceProperties[keyb+keyDuplicate] = tempObject;
                        }
                    var abc  = temps[j].substring(0, temps[j].indexOf(":")).trim();
                    tempObject = [];
                    var tempProperties = tempProperties.replace("<","").replace(">","").trim();
                        keyDuplicate = "";
                        if (audioDeviceProperties[abc] != null)
                            keyDuplicate = "";
                            
                        audioDeviceProperties[abc+keyDuplicate] = tempProperties;
                        tempObject = [];
                        lastSuccessfulKey = j
                    } else {
                        //console.log("null",temps[j]);
                        if (j != 1){
                            //var abc  = temps[lastSuccessfulKey].substring(0, temps[lastSuccessfulKey].indexOf(":")).trim();
                            var tempObjectx = []
                            var tempProperties = temps[j].replace("<","").replace(">","").trim();
                            if (tempProperties.indexOf("=")) {
                                var keyx  = tempProperties.substring(0, tempProperties.indexOf("=")).trim();
                                var tempData = tempProperties.split('=')[1];
                                if (tempData !== undefined)
                                    tempData = tempData.replace('"',"").replace('"',"").trim();
                                tempObjectx[keyx] = tempData;//.replace('"',"").replace('"',"").trim();
                                tempProperties = tempObjectx;
                            }
                            if (tempObject.length == 0) {
                                var abc  = temps[lastSuccessfulKey].substring(0, temps[lastSuccessfulKey].indexOf(":")).trim();
                                tempObject.push(audioDeviceProperties[abc]);
                            }
                            
                            tempObject.push(tempProperties);
                            //audioDeviceProperties[abc].push(tempProperties);
                            
                        }
                    }
                    
                }
                
                audioDevices.push(audioDeviceProperties);
                
                deviceInfo.push(temps);
            }
            
            //console.log("deviceInfo",deviceInfo);
            //console.log(" audioDevices", audioDevices);
            if (callback != null)
                callback(audioDevices);
            
        } //else
           // console.log("failed to sound");
    }       
});
    
}

var currentSpeakerType = "";

function setSpeakerType(audioDevices) {
    //console.log("audioDevices",audioDevices);
    
    for (var i = 0; i < audioDevices.length; i++) {
        //console.log("CALLED!!!",audioDevices[i]['monitor source']);
        if (audioDevices[i]['monitor source'] == 1) {
            
            $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerNameMini")).text(audioDevices[i]['active port'].replace(/-/g, ' '));
            
    if (audioDevices[i]['active port'] == "analog-output-speaker" && currentSpeakerType != "analog-output-speaker") {
        //console.log("audioDevicesA",audioDevices);
        $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerTypeMini")).text("Speaker");
        //$(win.runningApps[0].extrabarObject.window.document.getElementById("speakerNameMini")).text("Analog Output Speaker");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerIconType")).empty();
        $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerIconType")).append('<span class="speakerIcon icon" >&#61921;</span>');
        if (currentSpeakerType != "")
            toggleActions('volumeMini','volumeToggle',true);
        currentSpeakerType = "analog-output-speaker";
    }
            
    if (audioDevices[i]['active port'] == "analog-output-headphones" && currentSpeakerType != "analog-output-headphones") {
        
        //console.log("audioDevicesB",audioDevices);
        $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerTypeMini")).text("Headphones");
        //$(win.runningApps[0].extrabarObject.window.document.getElementById("speakerNameMini")).text("Analog Output Headphones");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerIconType")).empty();
        $(win.runningApps[0].extrabarObject.window.document.getElementById("speakerIconType")).append('<span class="speakerIcon icon" >&#61915;</span>');
        if (currentSpeakerType != "")
            toggleActions('volumeMini','volumeToggle',true);
        currentSpeakerType = "analog-output-headphones";
    }
            
            if (currentSpeakerType == "") {
                toggleActions('volumeMini','volumeToggle',true);
                currentSpeakerType = audioDevices[i]['active port'];
                //console.log("audioDevices",audioDevices);
            }
        }
        
    }
    
}
