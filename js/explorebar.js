

//FIXME: RESTOR THIS  -- for process manager


//battery full - #61731;
//battery 2 - #61722;
//battery 3 - #61841;
//battery 3/4 - #61945;
//Aeroplane mode - #61775;
//Volume mute - #61829;
//Volume 1 - #61904;
//Volume 2 - #61921;
//Volume 3 - #61849;
//Headphones - #61915;
//Microphone+Headphone - #61848;
//Microphone - #61922;
//Music A - #61745;
//Webcam - #61824;
//Printer - #61830;
//Recording - #61856;
//Stop Watch - #61868;
//Netwrok 1 - #61875;
//Wifi full - #61954;
//Gaming controller - #61902;
// Aeroplane mode - #61775;


/*var si = require('systeminformation');
var loudness = require('loudness');
const wallpaper = require('wallpaper');

wallpaper.get().then(imagePath => {
	console.log("IMG",imagePath);
	//=> '/Users/sindresorhus/unicorn.jpg'
});

// callback style
si.battery(function(data) {
    console.log('BATTERY-Information:');
    console.log(data);
})

loudness.getVolume(function (err, vol) {
    console.log("VOL:",vol);
});

si.networkInterfaces(function(data) {
    console.log('Network-Information:');
    console.log(data);
})*/

console.log("can do it?",win.canSetVisibleOnAllWorkspaces());

var currentHubOrb = 0;
var previousOrb = 0;

var hubOrbs = $(".appIcon2");

/*hubsInterval = window.setInterval(function(){
	previousOrb = currentHubOrb;
	currentHubOrb++;
	if (currentHubOrb == hubOrbs.length)
		currentHubOrb = 0;
//hubFadeInSpeed
	$(".hubFadeInSpeed").removeClass("hubFadeInSpeed");
	$(hubOrbs[currentHubOrb]).addClass("hubFadeInSpeed");
    $(hubOrbs[currentHubOrb]).removeClass("slightOpacity");
	if ((previousOrb-1) > -1)
		$(hubOrbs[previousOrb-1]).addClass("slightOpacity");
	if (currentHubOrb == 0)
		$(hubOrbs[previousOrb]).addClass("slightOpacity");

}, 4000);*/



var quickLanchApps = [];

function openQuickApp(pos) {
	openApp(quickLanchApps[pos].id);
}

//win.showDevTools();

//console.log("App",App);


/* Function loads the launcher Apps on the bottom left corner of explorebar*/
function setLauncherApps() {

console.log("we are here");

var mostLanchedApps = win.systemSortedApps;
var quickApps = [];

//console.log("mostLanchedApps",mostLanchedApps);

	for (var i = mostLanchedApps.length-1; i > -1; i--) {
		if (quickLanchApps.length < 4 && mostLanchedApps[i][0] != "itai") {
			for (var j = 0; j < win.apps.length; j++) {
				if (win.apps[j].id == "extern."+mostLanchedApps[i][0]+".app") {
					quickLanchApps.push(win.apps[j]);
					var appName = win.apps[j].id.replace("extern.","").replace(".app","");
					quickApps[appName] = mostLanchedApps[i][1];
				}
			}
		}
	}

//console.log("quickLanchApps",quickLanchApps);

			if (quickLanchApps[0] != null) {
				$("#launcherApp2 > img").attr("src",quickLanchApps[0].iconBase64);
				$("#launcherApp2 > img").attr("title",quickLanchApps[0].name);
				$("#launcherApp2").attr("onclick","openQuickApp(0)");
			}

			if (quickLanchApps[1] != null) {
				$("#launcherApp1 > img").attr("src",quickLanchApps[1].iconBase64);
				$("#launcherApp1 > img").attr("title",quickLanchApps[1].name);
				$("#launcherApp1").attr("onclick","openQuickApp(1)");
			}

			if (quickLanchApps[2] != null) {
				$("#launcherApp3 > img").attr("src",quickLanchApps[2].iconBase64);
				$("#launcherApp3 > img").attr("title",quickLanchApps[2].name);
				$("#launcherApp3").attr("onclick","openQuickApp(2)");
			}


		var currentPos = quickLanchApps.length;
		var donePos = -1;

		

		//console.log("currentPos",currentPos);

		for (var i = currentPos; i < 4 && i != 3 ; i++) {
			//console.log("iA = ",i);
			for (j = 0; j < win.apps.length; j++) {
				if (i == donePos)
					break;
				var appName = win.apps[j].id.replace("extern.","").replace(".app","");
				if (typeof win.accessedApps[appName] == 'undefined' && typeof quickApps[appName] == 'undefined' && win.apps[j].id != "extern.itai.app") {
				if (i == 0) {
					$("#launcherApp2 > img").attr("src",win.apps[j].iconBase64);
					$("#launcherApp2 > img").attr("data-original-title",win.apps[j].name);
					$("#launcherApp2").attr("onclick","openQuickApp(0)");
					quickApps[appName] = 0;
					quickLanchApps.push(win.apps[j]);
					donePos = i;
				}

				if (i == 1) {
					$("#launcherApp1 > img").attr("src",win.apps[j].iconBase64);
					$("#launcherApp1 > img").attr("data-original-title",win.apps[j].name);
					$("#launcherApp1").attr("onclick","openQuickApp(1)");
					quickApps[appName] = 0;
					quickLanchApps.push(win.apps[j]);
					donePos = i;
				}

				if (i == 2) {
					$("#launcherApp3 > img").attr("src",win.apps[j].iconBase64);
					$("#launcherApp3 > img").attr("data-original-title",win.apps[j].name);
					$("#launcherApp3").attr("onclick","openQuickApp(2)");
					quickApps[appName] = 0;
					quickLanchApps.push(win.apps[j]);
					donePos = i;
				}
				}
			}
		
	}
if (quickLanchApps.length != 0)
			$("#launcherContainer").removeClass("hidden");


//console.log("quickLanchApps2",quickLanchApps);


}










//https://stackoverflow.com/questions/15878961/how-to-use-jsonparse-without-double-quotes

//Scan for wifi every 20 seconds
wifiScanInterval = window.setInterval(function(){
    /*if (toggleMode  == "time")
        getCOnnections(); */

}, 20000);





function reloadSys() {
    chrome.runtime.reload();
}

customBatteryInfo();

setTimeout(function(){ 
    //getCOnnections(); 
    
    //Allow Manual refresh
    /*win.runningApps[0].extrabarObject.window.document.getElementById("refreshWifi").addEventListener('click', getCOnnections, false);
    
    
    win.runningApps[0].extrabarObject.window.document.getElementById("startScreenCap").addEventListener('click', startRecording, false);

    win.runningApps[0].extrabarObject.window.document.getElementById("stopScreenCap").addEventListener('click', stopRecording, false);
    
    win.runningApps[0].extrabarObject.window.document.getElementById("startScreenShot").addEventListener('click', screenshots, false);
    
    win.runningApps[0].extrabarObject.window.document.getElementById("shutdownButton").addEventListener('click', shutdownSys, false);
    
    win.runningApps[0].extrabarObject.window.document.getElementById("reloadButton").addEventListener('click', reloadSys, false);
    
    listAvailableDrives();*/
    
    //Scan for drives every 5 seconds
//wifiScanInterval = window.setInterval(function(){listAvailableDrives(); }, 5000);

    
    audioDevicesScanInterval = window.setInterval(function(){ getAudioDevices(setSpeakerType); }, 5000);
    
    
    batteryScanInterval = window.setInterval(function(){ customBatteryInfo(); }, 5000);
    
    //getAudioDevices(setSpeakerType);
    /*
    win.runningApps[0].extrabarObject.window.document.getElementById("timeToStopRecording").addEventListener('input', function()
{
    console.log('input changed to: ', win.runningApps[0].extrabarObject.window.document.getElementById("timeToStopRecording").value);
});
    
    */
    
    /*
    on('input', function() { 
    console.log("Time to stop: "); // get the current value of the input field. $(this).val()
});*/

if (win.canOpenHub) {
	setLauncherApps();
	$("#shutdownIcon").addClass("hidden");
}



    
}, 3000);

win.loadExplorebar = function() {
if (win.canOpenHub) {
	setLauncherApps();
	$("#shutdownIcon").addClass("hidden");
}
}











/*
(function () {
  var blockContextMenu, myElement;

  blockContextMenu = function (evt) {
    evt.preventDefault();
  };

  myElement = document.querySelector('body');
  myElement.addEventListener('contextmenu', blockContextMenu);
})();*/


var hoveredQuickApp = false;

$( ".launcherApp" )
  .mouseover(function() {
  $("#launcherApp2").removeClass("middleAppLancher");
  })
  .mouseout(function() {
    $("#launcherApp2").addClass("middleAppLancher");

//This code below is to fix a bug where mouseout isn't triggered at random times
   setTimeout(function() {

   if (!$("#launcherApp1").is(":hover") && !$("#launcherApp3").is(":hover"))
	$("#launcherApp2").addClass("middleAppLancher");
   }, 1000);
  });

setTimeout(function() {
 
	hideExtrabar(); //Trying to force hide cos it somehow sometimes starts automatically showing
    
    }, 10000);

function lool() {
//console.log("SUCCCCESSS");
}

 document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);


//http://docs.nwjs.io/en/latest/References/Shortcut/

//https://www.w3.org/TR/DOM-Level-3-Events-code/

var option = {
  key : "F",
  active : function() {
    console.log("Global desktop keyboard shortcut: " + this.key + " active."); 
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};
/*
// Create a shortcut with |option|.
var shortcut = new nw.Shortcut(option);

// Register global desktop shortcut, which can work without focus.
nw.App.registerGlobalHotKey(shortcut);

// If register |shortcut| successfully and user struck "Ctrl+Shift+A", |shortcut|
// will get an "active" event.

// You can also add listener to shortcut's active and failed event.
shortcut.on('active', function() {
  console.log("Global desktop keyboard shortcut: " + this.key + " active."); 
});

shortcut.on('failed', function(msg) {
  console.log(msg);
});
*/
/*
window.addEventListener("keyup", function(e) {
 console.log("keup");
  if (e.keyCode == 44) {
    console.log("The 'print screen' key is pressed");
  }
});*/

/*
const ioHook = require('iohook');

ioHook.on("keydown", event => {
  console.log("keydown",event);

});

//Register and start hook
ioHook.start();

//https://github.com/WilixLead/iohook

*/

/*var asound = require('node-asound');

asound.getPlaybackDevices(function (audioDevices) {
    console.log("RS",audioDevices);
    
    for (var i = 0; i < audioDevices.length; i++)
        console.log("RS"+i,audioDevices[i].getName());
});*/

win.showDevTools();



//win.showDevTools();

function checkForShutDown() {
setTimeout(function(){ 
	if (!$("#shutdownIcon").hasClass("hidden")) {
		win.loadExplorebar(); //fail safe
		console.log("try again");
		checkForShutDown(); //keep trying
	} else {
		
	}
}, 10000);
}

checkForShutDown();
// Prevent capturing focus by the button.
$('a').on('mousedown', 
    /** @param {!jQuery.Event} event */ 
    function(event) {
        event.preventDefault();
    }
);

    


//https://gitlab.com/apfritts/node-asound#README

//https://github.com/lionep/amixer-parser

//https://www.npmjs.com/package/amixer-parser
