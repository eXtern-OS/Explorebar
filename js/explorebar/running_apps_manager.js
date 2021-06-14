function toggleApp(app) {
    $(".runningApp").removeClass("activeApp");
    $(app).addClass("activeApp");
    
}

function restoreWin(app) {
//new_win.show();
	linuxSetAppActive(app.sysWinId);
//setTimeout(function(){ new_win.restore(); }, 500);
}

function unFocus(appId) {

	for (i = 1; i < win.runningApps.length; i++) {
            if (appId == win.runningApps[i].realID)
		$("#app"+win.runningApps[i].id).removeClass("activeApp");
            
        }
	
}

console.log("process: ",process);

win.unFocus = unFocus;

function minimizeToggle(app) {
	//console.log("minimizeToggle(app)  called");
    if ($(app).hasClass("minimized")) {
        $(app).removeClass("minimized");
        
        for (i = 1; i < win.runningApps.length; i++) {
            if ($(app).attr('id') == "app"+win.runningApps[i].id) {
		//if (win.adaptiveBlurEnabled())
		//win.loadWinBG(win.runningApps[i].windowObject);

		restoreWin(win.runningApps[i]);
		
		}
            
        }
        
        
        toggleApp(app);
    } else {
        
        if ($(app).hasClass("activeApp")) {
            $(".runningApp").removeClass("activeApp");
            $(app).addClass("minimized");
            //app.minimize();
            for (i = 1; i < win.runningApps.length; i++) {
            if ($(app).attr('id') == "app"+win.runningApps[i].id)
                win.runningApps[i].windowObject.minimize();
            
        }
        } else { 
       // $("#app"+app.id).removeClass("minimized");
        //app.restore();

        //Not active
        console.log("focus");

        
          
          for (i = 1; i < win.runningApps.length; i++) {
            if ($(app).attr('id') == "app"+win.runningApps[i].id) {

                //fallback
        restoreWin(win.runningApps[i]);

		toggleApp($("#app"+win.runningApps[i].id)[0]);
		console.log("trying to toggleApp: ",$("#app"+win.runningApps[i].id)[0]);

		//win.runningApps[i].windowObject.focus();
		
		}
            
        }
          
        }
    }
}

//console.log("my win: ",win);
//win.showDevTools();

win.makeAppVisible = function (appID) {
	$("#app"+appID).removeClass("hidden");
	$("#app"+appID).addClass("allowBlur");
}

win.addApp = function (app) {

	//console.log("app added called func: ",app);
    
    var appTitle = app.name;
    if (app.title == "")
        var appTitle = app.name;
    else
        var appTitle = app.title;
    
    //console.log("app added: ",app.windowObject.window);
    $("#runningApps").append('<a id="app'+app.id+'" class="runningApp hidden tooltips" data-placement="right" data-original-title="'+appTitle+'" href="javascript:void(0);" onclick="minimizeToggle(this)"><img class="appIcon" src="'+app.physicalLocation+app.realID+"/"+app.options.icon+'"><span> '+appTitle+'</span></a>');
    toggleApp($("#app"+app.id)[0]);
    //console.log(app.windowObject.sys.getInfo("ids"));
//console.log("ALL APPS",win.runningApps);
    
    if (app.id == 0)
        monitorAppTitles();

        if($('.tooltips')[0]) {
            $('.tooltips').tooltip();
        }


    
}
//win.showDevTools();
win.removeApp = function (app) {
	$('.tooltip').tooltip('hide');
      $("#app"+app.id).fadeOut( "fast", function() {
          $("#app"+app.id).remove();
	$('.tooltip.fade.right.in').addClass('hidden'); //fixing a bug where a tooltip shows up randomly and stays there after the app is closed. Replicated by clicking on the app icon right after launching it, click in the app window and then close the App
  });


    
    if (app.id ==  playerID) {
        
        currentArtist = "";
        currentTrack = "";
        
        if (!$(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).hasClass("hideExtraBar")) {
            toggleActions('currentlyPlayingMini','currentlyPlayingToggle');
    }
        
        $("#toggleAudio").fadeOut();
        activePlayer = false;
    }
    
}

win.setActiveApp = function (app) {
//console.log("set active called");
	//console.log("win.setActiveApp  called");
    //$("#app"+app.id).removeClass("minimized"); //Had to remove this, caused a bug from compiz triggering it when user switched desktops
    toggleApp($("#app"+app.id)[0]); 

    var appTitle = app.name;
    if (app.windowObject.title == "")
        var appTitle = app.name;
    else
        var appTitle = app.windowObject.title;


//console.log("app",app);

/*
    var exec = require('child_process').exec,
                   child;
            child = exec("wmctrl -i -r "+app.windowObject.sysWinId+" -I "+appTitle,function (error, stdout, stderr)
    {
                
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
        

    }       
});*/

/*
if ($("#app"+app.id).hasClass("allowBlur")) {
console.log("yessss");
   var exec = require('child_process').exec,
                   child;
            child = exec('xprop -id '+app.windowObject.sysWinId+' -f _NET_WM_NAME 32a -set _NET_WM_NAME "hb"',function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
    

    }       
});

    var exec = require('child_process').exec,
                   child;
            child = exec('xprop -id '+app.windowObject.sysWinId+' -f WM_NAME 32a -set WM_NAME "hb"',function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
    

    }       
});

    var exec = require('child_process').exec,
                   child;
            child = exec('xprop -id '+app.windowObject.sysWinId+' -f _NET_WM_VISIBLE_ICON_NAME 32a -set _NET_WM_VISIBLE_ICON_NAME "hb"',function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
    

    }       
});

    var exec = require('child_process').exec,
                   child;
            child = exec('xprop -id '+app.windowObject.sysWinId+' -f _NET_WM_VISIBLE_NAME 32a -set _NET_WM_VISIBLE_NAME "hb"',function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
    

    }       
});

}*/


}

win.minimizeApp = function (app) {
//console.log("minimize called");
toggleApp($("#app"+app.id)[0]);
   /* $(".runningApp").removeClass("activeApp");
    $("#app"+app.id).addClass("minimized");
setTimeout(function(){ $("#app"+app.id).addClass("minimized"); }, 2000);*/
setTimeout(function(){ $("#app"+app.id).addClass("minimized"); $("#app"+app.id).removeClass("activeApp"); }, 500);
//console.log("MINIMIZED CALL"+app.id,$("#app"+app.id),app);
}


function monitorAppTitles() {
    for (k = 1; k < win.runningApps.length; k++) {

	
        
        var app = win.runningApps[k];

	//console.log("app: ",app);

	if (app.name != null && app.title != null) {

	//console.log("app.windowObject.title",app.windowObject.title);

        var appTitle = "";
        //console.log("config App", app);
        //console.log("config RunningApps", win.runningApps);
        //console.log("config WinIDs", win.runningApps[k].id);
        if (app.title == "" || app.title === undefined)
        appTitle = app.name;
    else
        appTitle = app.title;
        
        if (appTitle.length > 20) {
        var length = 20;
        var appTitle = appTitle.substring(0, length)+"...";
        }
        
        if ($("#app"+app.id+" > span").text()!= " "+appTitle) {
            $("#app"+app.id+" > span").text(" "+appTitle);
            $("#app"+app.id).attr("data-original-title",appTitle);
	}
        
        
           /* if ($(app).attr('id') == "app"+win.runningApps[i].id)
                win.runningApps[i].windowObject.minimize();*/
	}
            
        }
    
    setTimeout(function(){ monitorAppTitles(); }, 2000);
}

setTimeout(function(){ monitorAppTitles(); }, 2000);
