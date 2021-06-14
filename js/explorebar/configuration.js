var win = nw.Window.get();
//win.showDevTools();
win.additionalIconsPixels = 0; //Store additional right panel icon pixels in order to adjust background accordingly
var nextFilesProcessId;
var nextGenericProcessId;
var hudProcessId;
var hudCommsChannel;

//console.log("win.showDevTools();");
win.canOpenHub = false;
var modeOpen = false;
var extrabarOpen = false;
var toggleMode  = "time"; //store id of currently displayed side details
var volumes = require('volumes');
var si = require('systeminformation');
var noOfDrives = 0
//var monitor = require('node-usb-detection');
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
//https://www.npmjs.com/package/node-usb-detection
var stopCheckingForRecordingTIme = false;
var screenRecordingLive = false;
var wifiConnections = [];
function convertBytes(input) {
    current_filesize = input.toFixed(2);
    var size_reduction_level = 0;
    while (current_filesize >= 1000)
      {
          current_filesize /=1000;
          size_reduction_level++;
      }
      
          /*Check if its a whole number or not*/
          if (current_filesize % 1 !== 0)
      current_filesize = current_filesize.toFixed(2);
          
      
      switch(size_reduction_level){
          case 0: current_filesize +=" B"; break;
          case 1: current_filesize +=" KB"; break;
          case 2: current_filesize +=" MB"; break;   
          case 3: current_filesize +=" GB"; break;
          case 4: current_filesize +=" TB"; break;
          case 5: current_filesize +=" PB"; break;
          case 6: current_filesize +=" EB"; break;
          case 7: current_filesize +=" ZB"; break;
      }
    
    return current_filesize;
}

setTimeout(function() {
 
/*
console.log("Process jsHeapSizeLimit",convertBytes(window.performance.memory.jsHeapSizeLimit));
console.log("Process totalJSHeapSize",convertBytes(window.performance.memory.totalJSHeapSize));
console.log("usedJSHeapSize",convertBytes(window.performance.memory.usedJSHeapSize));
*/
    
    }, 10000);

function executeNativeCommand(request,callback) {
    var exec = require('child_process').exec,
                   child;
            child = exec(request,function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
	//throw error;
      //console.log('exec error: ' + error);
	if (callback != null)
		callback(null,error);
    } else {

	if (callback != null)
		callback(stdout);
    

    }       
});
}

var playerID = "";
var alreadyAdjusted = false;

const commsChannel = new BroadcastChannel("explorebareXternChannel");
const extrabarCommsChannel = new BroadcastChannel("extrabareXternChannel");
function manageProcessComms(functionName,data) {

	if (functionName == null) { //init if null
		commsChannel.postMessage({type: "explorebarReady"});
		console.log("sent");
		commsChannel.onmessage = function (ev) {
			//console.log("message recieved: ",ev)

			if (ev.data.type == "workspace-switched") {
				console.log("force checking desktop");
				checkIfDesktopChanged(true);
			}

			if (ev.data.type == "update-sys-generic-instance") {
				console.log("update-generic-instance recieved");
				nextGenericProcessId = ev.data.nextGenericProcessId;
			}

			if (ev.data.type == "update-sys-files-instances") {
				console.log("update-sys-files-instances recieved");
				nextFilesProcessId = ev.data.nextFilesProcessId;
			}
			
			if (ev.data.type == "update-sys-hud-instance") {
				console.log("update-sys-hud-instance recieved: ",ev.data.hudProcessId);
				hudProcessId = ev.data.hudProcessId;
				hudCommsChannel = new BroadcastChannel("eXternOSApp"+hudProcessId);
			}
			
			if (ev.data.type == "increase-volume") {
				win.increaseAudioVolume(true);
			}
			
			if (ev.data.type == "decrease-volume") {
				win.increaseAudioVolume(false);
			}

			if (ev.data.type == "init-objects") {
				win.systemSortedApps = ev.data.systemSortedApps;
				win.accessedApps = ev.data.accessedApps;
				win.canOpenHub = ev.data.canOpenHub;
				win.runningApps = ev.data.runningApps;
				win.apps = ev.data.apps;
				win.sysWin.height = ev.data.height;
				win.sysWin.width = ev.data.width;
				win.sysWin.opened = ev.data.opened;
				win.sysWin.id = ev.data.sysWinId;
				//console.log("win.canOpenHub",win.canOpenHub);
				if (!alreadyAdjusted) {
					setTimeout(function() { adjustWalpaperPosition();}, 3000);
					alreadyAdjusted = true;
				}
			} else if (ev.data.type == "add-app") {
				console.log("app added called");
				win.addApp(ev.data.app);
			} else if (ev.data.type == "remove-app") {
				console.log("remove-app called: ",ev.data.app);
				win.removeApp(ev.data.app);
			} else if (ev.data.type == "show-app") {
				win.makeAppVisible (ev.data.appId);
			} else if (ev.data.type == "minimize-app") {
				win.minimizeApp (ev.data.app);
			} else if (ev.data.type == "focus-app") {
				toggleApp("#app"+ev.data.app.id);
			} else if (ev.data.type == "unfocus-app") {
				$("#app"+ev.data.app.id).removeClass("activeApp");
			} else if (ev.data.type == "update-audio-notification") {
				win.updateAudioInfo(ev.data.data);
			} else if (ev.data.type == "toggle-network-options") {
				toggleActions('networkOptionsMini','networkToggle');
			}
			
		};
	} else {
		toSendObject = {
			type: "function",
			name: functionName,
			data: data
		};

		commsChannel.postMessage(toSendObject);
		
	}
}
manageProcessComms();

extrabarCommsChannel.onmessage = function (ev) {
			console.log("message recieved: ",ev)
		if (ev.data.type == "now-recording") {
			if (ev.data.status) {
				$("#screenCapToggle").addClass("recordingColour");
			} else {
				$("#mainBar")[0].click();
				$("#screenCapToggle").removeClass("recordingColour");
			}
		} else if (ev.data.type == "toggleActions") {
			toggleActions(ev.data.modeId,ev.data.togglerId,ev.data.auto,ev.data.playerApp);
		} else if (ev.data.type == "hideShowing") {
			hideShowing();
		}
}//commsChannel.postMessage({type: "now-recording",status: true});

function showItai(show) {
	commsChannel.postMessage({type: "show-itai", show: show});
}

function openApp(appId) {
	commsChannel.postMessage({type: "open-app", appId: appId});
}

function showExtraContents(show,extendBar,type) {
	extrabarCommsChannel.postMessage({type: type,extendBar: extendBar,show: show});
}

function sendMinimizeSignal(app) {
	extrabarCommsChannel.postMessage({type: "minimize-this-app",app: app});
}

function sendVariable(varName,data) {
	manageProcessComms("set"+varName,varName);
}

function hideExtrabar() {
	manageProcessComms("hideExtrabar");
}

function adjustWalpaperPosition() {
	console.log("adjustWalpaperPosition called:");
    	var x = -window.screenX;//window.x; //Bug fixing after moving apps to iframe
	var y = -window.screenY;//window.y; //Bug fixing after moving apps to iframe

	var width = (screen.width)*3;
	var height = screen.height;
	x -=  (width/3);
	console.log("adjustWalpaperPosition B called:");
	$("#launcherContainer")[0].style['background-size'] =  width+"px "+height+"px";
        $("#launcherContainer")[0].style['background-position'] = (x-51)+"px "+y+"px";
	console.log("adjustWalpaperPosition C called:");
	$("#rightPanelContainer")[0].style['background-size'] =  width+"px "+height+"px";
        $("#rightPanelContainer")[0].style['background-position'] = ((width/3)+192+216+win.additionalIconsPixels)+"px "+y+"px";
	console.log("adjustWalpaperPosition D called: "+((width/3)+192+216+win.additionalIconsPixels)+"px "+y+"px");
}

function hideHubView() {
	manageProcessComms("hideHubView");
}

function toggleHub() {
	manageProcessComms("toggleHub");
}

function showHubView() {
	console.log("sending: showHubView");
	manageProcessComms("showHubView");
}

//Mived from migrated recording script
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
