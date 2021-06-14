//nw.Window.get().evalNWBin(null, '/usr/eXtern/iXAdjust/apps/extern.photos.app/js/binary.bin');

//https://www.npmjs.com/package/get-gtk-icon

//temp: paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'

var x11 = require('x11');

var gui = require('nw.gui');
//init must be called once during startup, before any function to gui.Screen can be called
gui.Screen.Init();
var string = "";
var screens = gui.Screen.screens;
var enableBlurOnLinuxApps = false;

var fs = require('fs');

var maximizedWindows = [];

var maimizedWindowsInDesktops = [[],[],[]];

var currentlyMaximized = false;

var currentlyMaximizedId = -1;

var currentDesktopX = -1;

var currentlyProcessingWindows = false;

//var ignoreFocusChanges = false;

var tempStorage = null;
//console.log("maimizedWindowsInDesktops: ",maimizedWindowsInDesktops);

function checkIfDesktopChanged(forceCheck) {
	runLinuxCommand("xdotool get_desktop",function (deskNox) {
	var dontCheckForActiveWindow = false;
		console.log("DESSSSK: ",deskNox);
console.log("DESSSSK currentDesktopX: ",currentDesktopX);
		if (forceCheck) {
			if (currentDesktopX != deskNox) {
				currentlyProcessingWindows = true;
				console.log("move prepared App");
				dontCheckForActiveWindow = true;
					if (nextFilesProcessId != null)
						executeNativeCommand('wmctrl -i -R '+nextFilesProcessId, function () {
							executeNativeCommand('xdotool windowactivate '+currentActive);
						});
					if (nextGenericProcessId != null) {
						executeNativeCommand('wmctrl -i -R '+nextGenericProcessId, function () {
							executeNativeCommand('xdotool windowactivate '+currentActive);
							currentlyProcessingWindows = false;
							loadWIndows(true);
							//setTimeout(function(){ getActiveLinuxWIndow(); }, 500);
							
						});
					}

			}
/*
				try {
				executeNativeCommand('xdotool getactivewindow', function (currentActive, error) {
					console.log("we are in here");
					if (!error) {
					currentActive = currentActive.replace(/(\r\n|\n|\r)/gm, "");
					console.log("currentActive: '"+currentActive+"'");

					if (nextFilesProcessId != null)
						executeNativeCommand('wmctrl -i -R '+nextFilesProcessId, function () {
							executeNativeCommand('xdotool windowactivate '+currentActive);
						});
					if (nextGenericProcessId != null) {
						executeNativeCommand('wmctrl -i -R '+nextGenericProcessId, function () {
							executeNativeCommand('xdotool windowactivate '+currentActive);
							currentlyProcessingWindows = false;
							loadWIndows(true);
							setTimeout(function(){ getActiveLinuxWIndow(); }, 500);
							
						});
					} else {
						console.log("here 2");
						currentlyProcessingWindows = false;
						getActiveLinuxWIndow();
					}
					} else {
						getActiveLinuxWIndow();
					}

					
				});
				} catch (error) {
					console.log("caught the error");
				}
*/
				


			
			currentDesktopX = deskNox;
			
		} else if (deskNox != currentDesktopX) {
			currentDesktopX = deskNox;
			console.log("new desk",deskNox)
			loadWIndows(true);
			getActiveLinuxWIndow();
		} else {
			console.log("not new desk",deskNox);
			loadWIndows(false);
			getActiveLinuxWIndow();
		}

		if (!dontCheckForActiveWindow) {
			//getActiveLinuxWIndow();
		}
	});
}

function checkIfToMaximize() {
	
		//allActiveWindows.map(function(e) { return e.height; }) === -1 &&  ? allActiveWindows.push(windowObject) : //console.log("Window already exists"); 
//console.log("so.....");
	var maximizedWindows = allActiveWindows.filter(function (windowX) {
  		return windowX.height > (window.screen.height-100) && windowX.yOffset < 50 && windowX.workspace == currentDesktopX;
	});

	//console.log("meeee....",maximizedWindows);

	if (maximizedWindows.length > 0) {
		if (!currentlyMaximized) {
				currentlyMaximized = true;
				$(".panels").addClass("hiddenOpacity");
				$(".panelIndicator").removeClass("hidden");
				win.height = 25;
				$("#mainBlock").addClass("smallBarBG");
				win.y = window.screen.height-25;
				//setTimeout(function(){ executeNativeCommand('xprop -id '+win.sysWin.id+' -f _NET_WM_STRUT_PARTIAL 32cccccccccccc -set _NET_WM_STRUT_PARTIAL "0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0"');
				// }, 100);

				executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id '+win.sysWin.id);
				
		}
	} else {
		if (currentlyMaximized) {
			currentlyMaximized = false;
			$("#mainBar").removeClass("maximizedWindow");
			win.height = 49;
			$("#mainBlock").removeClass("smallBarBG");
			win.y = window.screen.height-49;
			$(".panelIndicator").addClass("hidden");
			$(".panels").removeClass("hiddenOpacity");
			////console.log("we have maxiized finished",currentDesktopX);
			//executeNativeCommand('xprop -id '+win.sysWin.id+' -f _NET_WM_STRUT_PARTIAL 32cccccccccccc -set _NET_WM_STRUT_PARTIAL "0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0"');
			executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -remove _KDE_NET_WM_BLUR_BEHIND_REGION -id '+win.sysWin.id);
		}
	}
	

	//console.log("maximizedWindows: ",maximizedWindows);
	//console.log("allActiveWindows: ",allActiveWindows);
	//console.log("currentDesktop: ",currentDesktopX);


}

//Install unbuffer

var currentDesktop = -1;



//function monitorWindows() {
function enbleFullScreenAdaption() {
//console.log("monitoring");
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var child = spawn('unbuffer', ['python','-u','/usr/eXtern/systemX/extern.explorebar/js/windowEvents.py']);

child.stdout._handle.setBlocking(true);

////console.log("spawned: " + child.pid);

child.stdout.on('data', function(data) {
  ////console.log("Child data: " + data);
var obj = JSON.parse(data)
  //console.log("Child data obj: ", obj);
	if (!currentlyProcessingWindows) {
	if (obj.type == "focus_change") {
	checkIfDesktopChanged();
	getActiveLinuxWIndow();
	} else if (obj.type == "dimension_change") {
		//console.log("dimension change");
		loadWIndows(true);
	}

	}

	//force on dimensio change

});
child.on('error', function () {
  console.log("Failed to start child.");
});
child.on('close', function (code) {
  console.log('Child process exited with code ' + code);
	//enbleFullScreenAdaption();
});
child.stdout.on('end', function () {
  console.log('Finished collecting data chunks.');
	enbleFullScreenAdaption();
});
}


function focusAndTitleChangeDetection() {
//console.log("monitoring");
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var child = spawn('unbuffer', ['python','-u','/usr/eXtern/systemX/extern.explorebar/js/focusAndTitleChange.py']);

child.stdout._handle.setBlocking(true);

////console.log("spawned: " + child.pid);

child.stdout.on('data', function(data) {
	//console.log("it's working");
  ////console.log("Child data: " + data);
//var obj = JSON.parse(data)
  ////console.log("Child data objx: ", obj);
	if (!currentlyProcessingWindows) {
	checkIfDesktopChanged(true);
	getActiveLinuxWIndow();
	}

});
child.on('error', function () {
  //console.log("Failed to start child.");
});
child.on('close', function (code) {
  console.log('Child process exited with code ' + code);
	//focusAndTitleChangeDetection();
});
child.stdout.on('end', function () {
  console.log('Finished collecting data chunks.');
	focusAndTitleChangeDetection();
});
}


/*
const spawn = require('child_process').spawn,
 child = spawn('python', ['/usr/eXtern/systemX/extern.explorebar/js/windowEvents.py'], { shell: true });
child.stdout.on('data', function(data) {
    //console.log('stdout: ', data.toString());
});
child.stderr.on('data', function(data) {
    //console.log('stdout: ', data.toString());
});
child.on('exit', function(code) {
    //console.log('closing code: ', code.toString());

});*/
//}
//monitorWindows();

enbleFullScreenAdaption();
setTimeout(function(){focusAndTitleChangeDetection();}, 2000);

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

/* Function: Get differences between arrays and return the difference*/
Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) === -1;
    });
};

//win.showDevTools();
////console.log("win.showDevTools();");

//var base64str = base64_encode('icon.pam');

//var base64str = fs.readFileSync('icon.pam', 'base64');

//$("#appIcon").attr("src","data:image/pam;base64,"+base64str);


function functionb(err, tree) {
  ////console.log("root2",tree);
  
  X.GetWMName(tree.children[10], function(err, treeb) {
        ////console.log("treeb",treeb);
      });
}

var dontHideLeftContainter = false;
var dontHideRightContainer = false;

$( "#rightPanelContainer" ).hover(function() {
			if (currentlyMaximized) {
			dontHideRightContainer = true;
			$("#mainBar").removeClass("maximizedWindow");
			win.height = 49;
			$("#mainBlock").removeClass("smallBarBG");
			win.y = window.screen.height-49;
			$("#rightPanelMinimalIndicator").addClass("hidden");
			$("#rightPanelContainer").removeClass("hiddenOpacity");
			//executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -remove _KDE_NET_WM_BLUR_BEHIND_REGION -id '+win.sysWin.id);
			}

			}, function() {
				dontHideRightContainer = false;
				setTimeout(function(){

				if (currentlyMaximized && !dontHideRightContainer) {
				$(".panels").addClass("hiddenOpacity");
				$(".panelIndicator").removeClass("hidden");
				win.height = 25;
				$("#mainBlock").addClass("smallBarBG");
				win.y = window.screen.height-25;
				//executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id '+win.sysWin.id);
				}
				}, 2000);
				
				
			});

$( "#launcherContainer" ).hover(function() {
			if (currentlyMaximized) {
			dontHideLeftContainter = true;
			$("#mainBar").removeClass("maximizedWindow");
			win.height = 54;
			$("#mainBlock").removeClass("smallBarBG");
			win.y = window.screen.height-49;
			$("#leftMinimalIndicator").addClass("hidden");
			$("#launcherContainer").removeClass("hiddenOpacity");
			$("#runningApps").removeClass("hiddenOpacity");
			//executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -remove _KDE_NET_WM_BLUR_BEHIND_REGION -id '+win.sysWin.id);
			}

			}, function() {
				dontHideLeftContainter = false;
				setTimeout(function(){

				if (currentlyMaximized && !dontHideRightContainer) {
				$(".panels").addClass("hiddenOpacity");
				$(".panelIndicator").removeClass("hidden");
				win.height = 25;
				$("#mainBlock").addClass("smallBarBG");
				win.y = window.screen.height-25;
				//executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id '+win.sysWin.id);
				}
				}, 2000);
				
			});

$( "#runningApps" ).hover(function() {
			if (currentlyMaximized) {
			dontHideLeftContainter = true;
			$("#mainBar").removeClass("maximizedWindow");
			win.height = 54;
			$("#mainBlock").removeClass("smallBarBG");
			win.y = window.screen.height-49;
			$("#leftMinimalIndicator").addClass("hidden");
			$("#launcherContainer").removeClass("hiddenOpacity");
			$("#runningApps").removeClass("hiddenOpacity");
			//executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -remove _KDE_NET_WM_BLUR_BEHIND_REGION -id '+win.sysWin.id);
			}

			}, function() {
				dontHideLeftContainter = false;
				setTimeout(function(){

				if (currentlyMaximized && !dontHideRightContainer) {
				$(".panels").addClass("hiddenOpacity");
				$(".panelIndicator").removeClass("hidden");
				win.height = 25;
				$("#mainBlock").addClass("smallBarBG");
				win.y = window.screen.height-25;
				//executeNativeCommand('xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id '+win.sysWin.id);
				}
				}, 2000);
				
			});

function getIcon(windowID,pid) {



	
  var strx = 'xprop -id '+windowID+' -notype 32c _NET_WM_ICON |   perl -0777';
  var stra = " -pe '@_=/\\d+/g;";
  var strb = ' printf "P7\\nWIDTH %d\\nHEIGHT %d\\nDEPTH 4\\nMAXVAL 255\\nTUPLTYPE RGB_ALPHA\\nENDHDR\\n", splice@_,0,2; $_=pack "N*", @_;';
  var strc = " s/(.)(...)/$2$1/gs' > Shared/ProccessIcons/"+pid+".pam";
  
  var fullString = strx+stra+strb+strc;
  fullString = String.raw`${fullString}`;
  
  ////console.log("command: "+fullString);
  
    var exec = require('child_process').exec,
                   child;
            child = exec("export LC_ALL=C && "+fullString,function (error, stdout, stderr)
    {
    if (error !== null) {
      //console.log('exec error: ' + error);
    } else {
      

      iconToPng('Shared/ProccessIcons/'+pid+'.pam', pid);

      
      
    }
    });
}

//Just realised might as well have this and stop copying and pasting code haha

function runLinuxCommand(command,callback,variableToPassAlong,variableToPassAlongB) {
  
  var exec = require('child_process').exec,
                   child;
            child = exec(command,function (error, stdout, stderr)
    {
    if (error !== null) {
      //console.log('exec error: ' + error);
    } else {
      
	
	if (callback != null)
		callback(stdout,variableToPassAlong,variableToPassAlongB);
      
      
    }
    });

}

function linuxSetAppActive(windowID) {
  
  var exec = require('child_process').exec,
                   child;
            child = exec("wmctrl -ia "+windowID,function (error, stdout, stderr)
    {
    if (error !== null) {
      //console.log('exec error: ' + error);
    } else {
      
	
	$(".runningApp").removeClass("activeApp");
		$("#app"+windowID).addClass("activeApp");
	

      
      
    }
    });

}


function getActiveLinuxWIndow() {

try {
  
    var exec = require('child_process').exec,
                   child;
            child = exec("xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW",function (error, stdout, stderr)
    {
    if (error !== null) {
      //console.log('exec error: ' + error);
    } else {
      
	var activeLinuxWin = stdout.replace("_NET_ACTIVE_WINDOW(WINDOW)	","");
      //console.log("window:."+activeLinuxWin+".");

	////console.log("sys window ids:",systemWindowsIDs);
	

	var iseXternOSApp = false;

	for (var i = 0; i < systemWindowsIDs.length; i++) {
		//Parsing to int because there is usually an additional 0 in hex difference between these.
		if (parseInt(activeLinuxWin, 16) == parseInt(systemWindowsIDs[i], 16)) {
			iseXternOSApp = true;
		}
			
	}

	//console.log("aint extern os app check: ",activeLinuxWin.replace("x","x0"));

	if (!iseXternOSApp) {
		/*executeNativeCommand("xdotool getactivewindow getwindowname", function (data) {
			var winTitle = data.title.substring(0, 14)+"...";
			$("#app"+activeLinuxWin.replace("x","x0")+" > span").text(winTitle);
			$("#app"+activeLinuxWin.replace("x","x0")).attr("data-original-title",data);
		});*/

		//console.log("checking for class: ",activeLinuxWin.replace("x","x0"));

		if ($("#app"+activeLinuxWin.replace("x","x0")).hasClass("activeApp")) {

		} else {
			console.log("we are updating now")
			$(".runningApp").removeClass("activeApp");
			$("#app"+activeLinuxWin.replace("x","x0")).addClass("activeApp");
		}
	} else {
		////console.log("window ss a system one:"+activeLinuxWin);
	}
	
	

      
      
    }
    });

}
catch(err) {
  //console.log("trying to handle errors here");
}
}



function iconToPng(iconPath, PID) {
    var exec = require('child_process').exec,
                   child;
            child = exec("ffmpeg -i "+iconPath+" Shared/ProccessIcons/"+PID+".png",function (error, stdout, stderr)
    {
    if (error !== null) {
      //console.log('exec error: ' + error);
    } else {

	var base64Icon = "data:image/png;base64,"+fs.readFileSync("Shared/ProccessIcons/"+PID+".png", 'base64');//base64_encode("Shared/ProccessIcons/"+PID+".png");

	fs.unlink("Shared/ProccessIcons/"+PID+".png", (err) => {
  		if (err) throw err;
	  });
	
	  fs.unlink("Shared/ProccessIcons/"+PID+".pam", (err) => {
  		if (err) throw err;
	  });
      
      for (var m = 0; m < allActiveWindows.length; m++) {
        if (allActiveWindows[m].PID == PID) {
          allActiveWindows[m].icon = base64Icon;
	  $("#app"+allActiveWindows[m].id+" > .appIcon").attr("src",allActiveWindows[m].icon);
	  //fs.unlink("Shared/ProccessIcons/"+PID+".png");
	  
	  $("#appIcon").attr("src",allActiveWindows[m].icon);
        }
      }
      
    }
    });
}



function meme() {

  x11.createClient(function(err, display) {
    X = display.client;
    root = display.screen[0].root;
    
    //////console.log("root",root);
    
    
    
    X.GetInputFocus(root, function(err, winds) {
      
      ////console.log("winds",winds);
      
      X.GetWMName(winds.focus, function(err, wind_name) {
        
        ////console.log("got here");
        
        if (err) {
    		throw err;
    	}
        
        ////console.log("wind_name",wind_name);
        
      });
      
    });
    
    
/*
    X.QueryTree(root, function(err, tree) {
        //console.log(tree.children); //output all windows tree
      
      X.FetchName(tree.children[5], function(err, treeb) {
        //console.log("treebs",treeb);
      });
      
      
      
      
    },functionb);*/
});
  
  /*for (var i = 0; i < tree.children.length; i++) {
        
        X.ChangeWindowAttributes(tree.children[i], { eventMask: x11.eventMask.EnterWindow|x11.eventMask.KeyPress });
    X.on('event', function(ev) {
        //console.log(ev);
    });
        
      }*/
  
}

/*
var EWMH = require('ewmh');

  function meme() {
    
   x11.createClient(function(err, display) {
    if (err) {
        throw err;
    }

    var ewmh = new EWMH(display.client, display.screen[0].root);
    ewmh.on('CurrentDesktop', function(d) {
        //console.log('Client requested current desktop to be: ' + d);
    });
  
   ewmh.set_number_of_desktops(4, function(err) {
    	if (err) {
    		throw err;
    	} else //console.log("success desktop");

    	ewmh.set_current_desktop(2);
    });
     
     var list = [];
     
     ewmh.update_window_list(list, function(err) {
    	if (err) {
    		throw err;
    	} else //console.log("success windows",list);

    	//ewmh.set_current_desktop(2);
    });
  
  

  





  });
    
  }*/

var allActiveWindows = [];
var allActiveWIndowsPIDs = [];
var allUnfilteredNumberOfWindows = [];
var mainDesktopPID = -1;
var systemWindowsIDs = [];
//win.showDevTools();

function loadWIndows(forceLoadChanges) {
	currentlyProcessingWindows = true;
  var exec = require('child_process').exec,
                   child;
            child = exec("wmctrl -l -p -G",function (error, stdout, stderr)
    {
    if (error !== null) {
      //console.log('exec error: ' + error);
    } else {
      
	var unfilteredSplit = stdout.split("\n");

//checkIfToMaximize


	
	//Check if any changes to avoid unecessary processing
      if (unfilteredSplit.length > allUnfilteredNumberOfWindows.length || (forceLoadChanges && (unfilteredSplit.length == allUnfilteredNumberOfWindows.length))) { //(unfilteredSplit.length == allUnfilteredNumberOfWindows.length && unfilteredSplit != allUnfilteredNumberOfWindows)
        
        allUnfilteredNumberOfWindows = unfilteredSplit;

	//totalUnfilteredNumberOfWindows = unfilteredSplit.length;
//allActiveWindows = [];
	
      stdout.split("\n").forEach(function (allWindows, index) {
        
        if (allWindows.length > 3) { //Safe guard from empty strings
          
          var removeExtendedSpaces = allWindows.replace(/\s\s+/g,' ');
           var item = removeExtendedSpaces.split(' ');

		 windowTitle = removeExtendedSpaces.split(item[6]+" "+item[7]+" ")[1];

		if (windowTitle == "eXtern explorebar3332bn334") //explorebar 
		   mainDesktopPID = item[2]; //set system PID
          
          if (item[1] != -1) { //Not a sticky window i.e a desktop
            
           

 
        
        var windowObject = {
          id: item[0],
	  idAsInt: parseInt(item[0]),
          workspace: parseInt(item[1]),
          title: windowTitle,
          PID: item[2],
          xOffset: item[3],
          yOffset: item[4],
          width: item[5],
          height: item[6],
          processed: false
        }
            
            var processObject = {
              PID: windowObject.PID,
              sampleWindowID: windowObject.id
            }

		

//allActiveWindows.push(windowObject) 

		/*allActiveWindows.map(function(e) { return e.id; }).indexOf(windowObject.id) === -1 ? allActiveWindows.push(windowObject) : e.title = windowTitle; e.xOffset = windowObject.xOffset;//console.log("Window already exists");
*/

	var activeWindow = allActiveWindows.filter(function (windowX) {
  		return windowX.id.indexOf(windowObject.id) != -1;
	});

	//console.log("activeWindow :",activeWindow);
	if (activeWindow.length == 1) {
		if (activeWindow[0].title != windowObject.title) {
			activeWindow[0].title = windowObject.title;
			var winTitle = activeWindow[0].title.substring(0, 14)+"...";
			$("#app"+activeWindow[0].id+" > span").text(winTitle);
			$("#app"+activeWindow[0].id).attr("data-original-title",activeWindow[0].title);
		}
		activeWindow[0].xOffset = windowObject.xOffset;
		activeWindow[0].yOffset = windowObject.yOffset;
		activeWindow[0].width = windowObject.width;
		activeWindow[0].height = windowObject.height; //lol
	} else {
		allActiveWindows.push(windowObject);
	}


                
                allActiveWIndowsPIDs.map(function(e) { return e.PID; }).indexOf(processObject.PID) === -1 ? allActiveWIndowsPIDs.push(processObject) : tempStorage = null;



		//console.log("next step A");
            
            //allActiveWIndowsPIDs.indexOf(processObject) === -1 ? allActiveWIndowsPIDs.push(processObject) : //console.log("PID already exists");
            
          }
        

          
          
            
            
        }

        
      });

			
      
      /*var singleWindowSplit = activeWindowsRaw[0].split(" ");
      
      
      
      //console.log("trial title",result);
      
      //console.log("id: ",singleWindowSplit);*/
      ////console.log("window Objects",allActiveWindows);
      ////console.log("window PIDs",allActiveWIndowsPIDs);
//console.log("next step Ax");


	for (var k = 0; k < allActiveWindows.length;k++) {
		if (allActiveWindows[k].PID != mainDesktopPID) {
			if (!$("#app"+allActiveWindows[k].id).length) {
				var winTitle = allActiveWindows[k].title;

			if (allActiveWindows[k].title.length > 14) {
				winTitle = allActiveWindows[k].title.substring(0, 14)+"...";
			}
			$("#runningApps").append('<a id="app'+allActiveWindows[k].id+'" class="runningApp tooltips" data-placement="right" data-original-title="'+allActiveWindows[k].title+'" href="javascript:void(0);" onclick="linuxSetAppActive(&quot;'+allActiveWindows[k].id+'&quot;)"><img class="appIcon" src="../apps/extern.files.app/icons/flash package.png"><span> '+winTitle+'</span></a>');

	if (allActiveWindows[k].title == "Install") {
		win.installerStartedEvent();
	}

//console.log("winTitle: ",allActiveWindows[k].title);
	if (enableBlurOnLinuxApps) {
      		runLinuxCommand("xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id "+allActiveWindows[k].id); //use blur and transparency
		//runLinuxCommand("xprop -id "+allActiveWindows[k].id+" -f _NET_WM_WINDOW_OPACITY 32c -set _NET_WM_WINDOW_OPACITY 3600000000"); //use blur and transparencyr
	} else {
      		runLinuxCommand("xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -remove _KDE_NET_WM_BLUR_BEHIND_REGION -id "+allActiveWindows[k].id); //use blur and transparency
		runLinuxCommand("xprop -id "+allActiveWindows[k].id+" -f _NET_WM_WINDOW_OPACITY 32c -remove _NET_WM_WINDOW_OPACITY"); //use blur and transparencyr
	}
			}

			
  
		} else {
			if (!allActiveWindows[k].processed) {
				allActiveWindows[k].processed = true;
				systemWindowsIDs.push(allActiveWindows[k].id);
			}
		}
	 }

	 //console.log("next step Axm");

        if($('.tooltips')[0]) {
            $('.tooltips').tooltip();
        }
      
      for (var k = 0; k < allActiveWIndowsPIDs.length;k++) {
	if (allActiveWIndowsPIDs[k].PID != mainDesktopPID && !allActiveWIndowsPIDs[k].processed) {
        	getIcon(allActiveWIndowsPIDs[k].sampleWindowID,allActiveWIndowsPIDs[k].PID);
		allActiveWIndowsPIDs[k].processed = true;
	}
      }

			//console.log("next step Axmm");

	checkIfToMaximize();
	//console.log("systemWindowsIDs",systemWindowsIDs);


      } else if (unfilteredSplit.length < allUnfilteredNumberOfWindows.length ){
        
        var n_unfilteredSplit = [];
        
        var n_allUnfilteredNumberOfWindows = [];
        
        for (var i = 0; i < unfilteredSplit.length; i++) {
          if (unfilteredSplit[i] != "")
          n_unfilteredSplit.push(unfilteredSplit[i].substring(0, unfilteredSplit[i].indexOf(' ')));
        }
        
        for (var i = 0; i < allUnfilteredNumberOfWindows.length; i++) {
          if (allUnfilteredNumberOfWindows[i] != "")
          n_allUnfilteredNumberOfWindows.push(allUnfilteredNumberOfWindows[i].substring(0, allUnfilteredNumberOfWindows[i].indexOf(' ')));
        }
        
        var closedWIndows = n_allUnfilteredNumberOfWindows.diff(n_unfilteredSplit);

//console.log("next step B");
        
        ////console.log("n_allUnfilteredNumberOfWindows",n_allUnfilteredNumberOfWindows);
        
        ////console.log("n_unfilteredSplit",n_unfilteredSplit);
         
      ////console.log("TO BE REMOVED closedWIndows: ", closedWIndows);
        
        for (var i = 0; i < closedWIndows.length; i++) {
          
          for (var j = 0; j < allActiveWindows.length; j++) {
            if (allActiveWindows[j].id == closedWIndows[i]) {
		//let windowIdInMaximized = maimizedWindowsInDesktops.find(o => o === allActiveWindows[j].idAsInt);
		var checkID = allActiveWindows[j].idAsInt;
		 
		maimizedWindowsInDesktops.forEach(function(workspace, index) {
			var windowIdInMaximized = workspace.indexOf(checkID);
			if (windowIdInMaximized == -1)
				windowIdInMaximized = workspace.indexOf((checkID+1));//+1 because for some strange reason it's sometimes -1 with the ID value. Like how does that even happen? It's an ID. This fix is dodgy as, but I have no idea why.
			//console.log("secondCheck used: ",(checkID+1));
			//console.log("found it now removing it check: ",windowIdInMaximized);
			//console.log("found it now removing it workspace: ",workspace);
			//console.log("found it now removing it workspace index: ",index);
			
		});

		//console.log("to splice: ",allActiveWindows[j]);
		//console.log("should match: ",checkID);
						
		
              allActiveWindows.splice(j, 1);
              //console.log("SPlicing: ",closedWIndows[i]);
              $("#app"+closedWIndows[i]).remove();
              break;
          }
		}
          
        }
        
//console.log("next step C");
	/*for (var i = 0; i < closedWIndows.length; i++) {
      var removeExtendedSpaces = closedWIndows[i].replace(/\s\s+/g,' ');
           	var item = removeExtendedSpaces.split(' ');
      
      //console.log("TO BE REMOVED item: ", item);
      
      //console.log("TO BE REMOVED id: ", item[0]);
      //console.log("TO BE REMOVED Pid: ", item[2]);
      ////console.log("TO BE REMOVED Pid: ", item[2]);

		if (item[2] != mainDesktopPID) { //Is PID the eXtern OS desktop PID
			$("#app"+item[0]).remove(); // item[0] is the id of the window
          //console.log("REMOVED");
          
          for (var j = 0; j < allActiveWindows.length; j++) {
            if (allActiveWindows[j].id == item[0]) {
              allActiveWindows.splice(j, 1);
              //console.log("SPlicing");
          }
		}
    }
	

	}*/
        allUnfilteredNumberOfWindows = unfilteredSplit;
        ////console.log("differences: ",allActiveWindows);

	
        //console.log("next step D");
        
        checkIfToMaximize();
        
      }

			
      
    }
		currentlyProcessingWindows = false;
    });
}

setTimeout(function(){// loadWIndows(); //getActiveLinuxWIndow();

//setInterval(function(){ loadWIndows(); getActiveLinuxWIndow();}, 4000);
}, 8000);







