var picturesLocation = process.env['HOME']+"/Pictures/";

function screenshots() {
    $("#screenCapToggle").addClass("recordingColour");
    
    toggleActions('screencapOptionsMini','screenCapToggle');
    setTimeout(function(){
        $("#mainBar")[0].click();
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var dateTime = '-'+date+' '+time;
    
        screenshot(picturesLocation+"screenshot"+dateTime+".png", function(error, complete) {
            if(error)
                console.log("Screenshot failed", error);
            else
                console.log("Screenshot succeeded");
            
            if (!screenRecordingLive)
                $("#screenCapToggle").removeClass("recordingColour");
        });
    }, 3000);
}

function handleRecordingTime() {
    //console.log('input changed to: ', win.runningApps[0].extrabarObject.window.document.getElementById("timeToStopRecording").value);
    var secondsSelected = win.runningApps[0].extrabarObject.window.document.getElementById("timeToStopRecording").value;
    if (secondsSelected == 0)
        win.runningApps[0].extrabarObject.window.document.getElementById("startScreenCap").disabled = true;
    else
        win.runningApps[0].extrabarObject.window.document.getElementById("startScreenCap").disabled = false;
    
    if (!stopCheckingForRecordingTIme)
        setTimeout(function(){ handleRecordingTime();}, 50);
}

document.getElementById("screenCapToggle").onmousedown = function(event) {
    event.preventDefault(); //This is to make sure the red colour for recording shows up
    
    //handleRecordingTime(); FIXME Just disabled this
    
    /*
    recTimeCheckInterval = window.setInterval(function(){
  // Constantly check for internet connection
            console.log("CHECK....");
        
        if (stopCheckingForRecordingTIme)
            window.clearInterval(recTimeCheckInterval);
        else
            handleRecordingTime();

                
    
        }, 1000);*/
    
    //console.log('input cc changed to: ', win.runningApps[0].extrabarObject.window.document.getElementById("timeToStopRecording").value);
}


var psTree = require('ps-tree');

var kill = function (pid, signal, callback) {
    signal   = signal || 'SIGINT';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

var recorderPID;
var currentlyRecording = false;

function stopRecording() {
kill(recorderPID);
currentlyRecording = false;
}

function toHHMMSS(time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function startCounter() {
var currentCounterTime = 0;
            timer = window.setInterval(function(){
                if (!currentlyRecording) {
                    clearInterval(timer);
                    //timer ended
                    return;
                }

		currentCounterTime++;
                
                $(win.runningApps[0].extrabarObject.window.document.getElementById("recordingTimeRemaining")).text(toHHMMSS(currentCounterTime));
            
        }, 1000);
}

var screenRecordingLive = false;

function startRecording () {
    //https://stackoverflow.com/questions/10232192/exec-display-stdout-live
    //avconv -f x11grab -s 1024x768 -r 50 -t 500 -i :0.0 ~/Videos/name.mp4
    console.log("GOT here rc");
    
    if (!screenRecordingLive) {
        
        screenRecordingLive = true;
        var recordingStarted = false;
    
    toggleActions('screencapOptionsMini','screenCapToggle');
    $("#mainBar")[0].click();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var dateTime = '-'+date+'-'+time;
    console.log("dateTime: "+dateTime);
    
    //var secondsSelected = win.runningApps[0].extrabarObject.window.document.getElementById("timeToStopRecording").value;



var exec = require('child_process').exec;
var child = exec('avconv -f x11grab -s '+screen.width+'x'+screen.height+' -r 25 -i :0.0 ~/Videos/ScreenCapture'+dateTime+'.mp4');
child.stdout.on('data', function(data) {


    //console.log('stdout: ' + data);


		


});
child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
        $("#screenCapToggle").removeClass("recordingColour");
        recordingStarted = false;
        screenRecordingLive = false;
         $(win.runningApps[0].extrabarObject.window.document.getElementById("recordingLive")).addClass("hidden");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("recordSettings")).removeClass("hidden");

});

recorderPID = child.pid;

            $(win.runningApps[0].extrabarObject.window.document.getElementById("recordSettings")).addClass("hidden");
            $(win.runningApps[0].extrabarObject.window.document.getElementById("recordingLive")).removeClass("hidden");
            recordingStarted = true;
            $("#screenCapToggle").addClass("recordingColour");

		if (!currentlyRecording) {
		currentlyRecording = true;
		startCounter();
		console.log("recording...");
		}

//setTimeout(function(){ console.log("force stop record"); kill(child.pid);}, 10000);



/*
    var exec = require('child_process').exec;
var coffeeProcess = exec('avconv -f x11grab -s '+screen.width+'x'+screen.height+' -r 50 -t '+secondsSelected+' -i :0.0 ~/Videos/ScreenCapture'+dateTime+'.mp4');

coffeeProcess.stdout.on('data', function(data) {
    console.log("Recording....",data); 
});
    
    coffeeProcess.stderr.on('data', function(data) {
    console.log("Recording Error....",data); 
        
        if (data.indexOf("already exists.") != -1) {
                //Do something
            }
        
        if (data.indexOf("frame=") != -1 && !recordingStarted) {
            
            $(win.runningApps[0].extrabarObject.window.document.getElementById("recordSettings")).addClass("hidden");
            $(win.runningApps[0].extrabarObject.window.document.getElementById("recordingLive")).removeClass("hidden");
            recordingStarted = true;
            var count = secondsSelected;
            $("#screenCapToggle").addClass("recordingColour");
            
            timer = window.setInterval(function(){
                count=count-1;
                if (count <= 0) {
                    clearInterval(timer);
                    //counter ended
                    return;
                }
                
                $(win.runningApps[0].extrabarObject.window.document.getElementById("recordingTimeRemaining")).text(count);
            
        }, 1000);
            
            }
});
    
    coffeeProcess.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
        $("#screenCapToggle").removeClass("recordingColour");
        recordingStarted = false;
        screenRecordingLive = false;
         $(win.runningApps[0].extrabarObject.window.document.getElementById("recordingLive")).addClass("hidden");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("recordSettings")).removeClass("hidden");
});*/
    } else {
        //Stop Recording
        //screenRecordingLive = false;
    }
    
    
}

