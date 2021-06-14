//nw.Window.get().evalNWBin(null, '/usr/eXtern/iXAdjust/extern.explorebar/js/explorebar/extrabar_controller.bin');

//ex1 was here


window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);



//function showExtraContents(show,extendBar,type) {
    /*if (show && !extrabarOpen) { //show
        win.runningApps[0].extrabarObject.show();
        if (extendBar) {
            $(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).addClass("extendBar");
		win.runningApps[0].extrabarObject.height = 310;
		win.runningApps[0].extrabarObject.y = screen.height-404;
		win.runningApps[0].extrabarObject.x = screen.width-320;
        } else {
            $(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).removeClass("extendBar"); //Just incase
		win.runningApps[0].extrabarObject.height = 160;
		win.runningApps[0].extrabarObject.y = screen.height-254;
		win.runningApps[0].extrabarObject.x = screen.width-320;

	}
        
        $(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).removeClass("hideExtraBar");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("extraContents")).fadeIn();
        $(win.runningApps[0].extrabarObject.window.document.getElementsByClassName("extrabars")).addClass("hidden");
        $(win.runningApps[0].extrabarObject.window.document.getElementById(type)).removeClass("hidden");
        extrabarOpen = true;
        
    } else { //hide
        if (extrabarOpen) {
        $(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).addClass("extendBar");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).addClass("hideExtraBar");
        $(win.runningApps[0].extrabarObject.window.document.getElementById("extraContents")).fadeOut();
        
        win.runningApps[0].extrabarObject.hide();
        extrabarOpen = false;
        }*/
        //win.y = screen.height-(66);
        
        
        //win.y = screen.height-(66);
       /* setTimeout(function(){ 
        win.height = 66;
        win.y = screen.height-(66);
        //win.height = 66;
        
        }, 1000);*/
        
    //}
    
    
    /*setTimeout(function(){ win.runningApps[0].windowObject.sysWin.bgAdjust(win,true); }, 100);
    setTimeout(function(){ win.runningApps[0].windowObject.sysWin.bgAdjust(win,true); }, 500);
    setTimeout(function(){ win.runningApps[0].windowObject.sysWin.bgAdjust(win,true); }, 1500);*/
    
//}

$("#runningApps").click(function() {
              //win.closeAllNotifications(true);
});

var notifications = [];

function activateNotification(event) {

	var notificationID = $(this).attr("notificationid");

	console.log("activateNotification",event);

	console.log("notificationid",notificationID);

	win.notificationTriggered(notifications[notificationID].notificationButtons[0].id,notifications[notificationID].notificationAppInfo);

}



function selectNotification() {
	var notificationID = $(this).attr("notificationid");
	var notificationAppInfo = notifications[notificationID].notificationAppInfo;
	var notificationText = notifications[notificationID].notificationText;
	var notificationButtons = notifications[notificationID].notificationButtons;
	var notificationIcon = notifications[notificationID].notificationIcon;

	 	$(win.runningApps[0].extrabarObject.window.document).find(".activeNotification").removeClass("activeNotification"); //Remove The current Active Notification highlight

	$(this).addClass("activeNotification"); 


	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).removeClass("hidden");

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).attr("title",notificationText);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).attr("notificationid",notificationID);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("notificationAppName")).text(notificationAppInfo.name);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("notificationIcon")).attr("src",notificationIcon);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("NotificationText")).empty();

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("NotificationText")).append(notificationText); //FIXME This is probably dangerous, try to find a a way to avoid people screwing this up

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("notificationButton")).text(notificationButtons[0].text);
}

function clearNotifications () {
	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).addClass("hidden");

		$(win.runningApps[0].extrabarObject.window.document.getElementById("notificationList")).empty();

		notifications = [];

		$(win.runningApps[0].extrabarObject.window.document.getElementById("notificationList")).append('<p class="text-muted" style="text-align: center; font-size: 18px; margin-top: 40px;"> No notifications </p>');
}




win.newNotification = function (notificationAppInfo, notificationText, notificationButtons, notificationTimeOut,notificationIcon) {

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).removeClass("hidden");

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).attr("title",notificationText);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("topNotification")).attr("notificationid",notifications.length);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("notificationAppName")).text(notificationAppInfo.name);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("notificationIcon")).attr("src",notificationIcon);

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("NotificationText")).empty();

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("NotificationText")).append(notificationText); //FIXME This is probably dangerous, try to find a a way to avoid people screwing this up

	    $(win.runningApps[0].extrabarObject.window.document.getElementById("notificationButton")).text(notificationButtons[0].text);


	if (notifications.length == 0) {
		$(win.runningApps[0].extrabarObject.window.document.getElementById("notificationList")).empty();

	        var notificationElement = win.runningApps[0].extrabarObject.window.document.getElementById("topNotification");

        notificationElement.addEventListener('click', activateNotification, false);


	        var notificationClearButtonElement = win.runningApps[0].extrabarObject.window.document.getElementById("clearNotifications");

        notificationClearButtonElement.addEventListener('click', clearNotifications, false);

	}

	var notificationObject = {
		notificationAppInfo: notificationAppInfo,
		notificationText: notificationText,
		notificationButtons: notificationButtons,
		notificationTimeOut: notificationTimeOut,
		notificationIcon: notificationIcon
	}

	notifications.push(notificationObject);

	console.log("notifications",notifications);

	 	$(win.runningApps[0].extrabarObject.window.document).find(".activeNotification").removeClass("activeNotification"); //Remove The current Active Notification highlight

			$(win.runningApps[0].extrabarObject.window.document.getElementById("notificationList")).prepend('<a href="#" id="notificationID'+(notifications.length-1)+'" title="'+notificationText+'" notificationid='+(notifications.length-1)+' class="media p-l-5 activeNotification" style="        float: left; width: 100%;"><div class="pull-left"><img width="40" src="'+notificationIcon+'" alt=""></div><div class="media-body"><small class="text-muted t-overflow">'+notificationAppInfo.name+'</small><br/><p class="t-overflow" onclick="">'+notificationText+'</p></div></a>');

	


        var notificationElement = win.runningApps[0].extrabarObject.window.document.getElementById("notificationID"+(notifications.length-1));

	//console.log("secureConnect",notificationElement);
        notificationElement.addEventListener('click', selectNotification, false);

	toggleActions('notificationsMini','notificationsToggle');


	
}

win.closeAllNotifications = function (fromExtrabar) {
    if (fromExtrabar)
        win.runningApps[0].extrabarObject.hide();
    
    toggleActions(toggleMode);
}
var hiding = false;
var volumeToggleTimeout;

function hideShowing() {
	if (!hiding) {
		toggleActions(toggleMode); //hide
	}
}

function toggleActions(modeId,togglerId,auto,playerApp) {

    //win.runningApps[0].windowObject.sysWin.bgAdjust(win,true);
    if (toggleMode == modeId) {
if (!hiding) {
        if (modeOpen) { //Avoid wasting resources from system toggle trigger
        $(".toggleIcon").removeClass("inactiveIcon");
	if (toggleMode == "timeCalendarMini") {
		toggleMode = "time";
	    	$("#itaiButton").fadeIn();
	    	$("#workspacesButton").fadeIn();
	} else {
        $("#"+toggleMode).fadeOut("fast", function() {
            $("#time").fadeIn();
            toggleMode = "time";
	    $("#itaiButton").fadeIn();
	    $("#workspacesButton").fadeIn();
        }); //|| modeId == "volumeMini"  removing the extra volume hud for now
	}
        
        if (modeId == "currentlyPlayingMini" || modeId == "shutdownOptionsMini" || modeId == "networkOptionsMini" || modeId == "bluetoothOptionsMini" || modeId == "screencapOptionsMini" || modeId == "drivesOptionsMini" || modeId == "notificationsMini" || modeId == "companionOptionsMini" || modeId ==  "volumeMini" || modeId ==  "timeCalendarMini") {
            stopCheckingForRecordingTIme = true; //Clear the checing for input interval
            showExtraContents(false);
        }
        modeOpen = false;
        }
}
        
    } else {
console.log("OLD toggleMode"+togglerId,toggleMode);
        modeOpen = true;
showExtraContents(false);
hiding = true;
/*
$("#itaiButton").fadeOut();
$("#workspacesButton").fadeOut();
*/

        
        //setTimeout(function(){ 
/*
$(".toggleIcon").addClass("inactiveIcon");
        $("#"+togglerId).removeClass("inactiveIcon");
        $("#"+toggleMode).fadeOut("fast", function() {
            $("#"+modeId).fadeIn();
console.log("OLD toggleModeB: "+togglerId,toggleMode);
//$("#"+toggleMode).fadeOut(); //force close;
$("#"+toggleMode).css("display","none");
            toggleMode = modeId;
hiding = false;
        });*/

        if (modeId == "timeCalendarMini") {
		showExtraContents(true,true,"extraTimeCalendar");
	} else {
$("#itaiButton").css("display","none");
$("#workspacesButton").css("display","none");
$("#"+toggleMode).css("display","none");
$("#"+modeId).fadeIn();
}

$(".toggleIcon").addClass("inactiveIcon");
$("#"+togglerId).removeClass("inactiveIcon");
toggleMode = modeId;
hiding = false;

        


        
        if (modeId == "currentlyPlayingMini") {

		if (volumeToggleTimeout != null) {
		clearTimeout(volumeToggleTimeout);
		}
            
            showExtraContents(true,false,"extraPlaying");

		if (playerApp != null) {
			$("#currentlyPlayingPlayerName").text(playerApp.name);
			$("#currentlyPlayingPlayerIcon").attr("src",playerApp.physicalLocation+playerApp.realID+"/"+playerApp.options.icon);
			$("#currentlyPlayingAllText").removeClass("hidden");

		}
           
                      
            
            setTimeout(function(){ 
                
                //Auto Hide after 5 seconds
                if (modeOpen && auto && toggleMode ==  "currentlyPlayingMini") {
                    toggleActions('currentlyPlayingMini','currentlyPlayingToggle');
                }
            
            }, 5000);
            
        }
//}, 500);
        
        if (modeId == "shutdownOptionsMini") {
            showExtraContents(true,true,"extraShutdown");
        }
        
        if (modeId == "networkOptionsMini") {
            showExtraContents(true,true,"extraNetwork");
        }

        if (modeId == "bluetoothOptionsMini") {
            showExtraContents(true,true,"extraBluetooth");
        }

        if (modeId == "companionOptionsMini") {
            showExtraContents(true,true,"extraCompanion");
        }
        
        if (modeId == "drivesOptionsMini") {
            showExtraContents(true,true,"extraDrives");
        }
        

	//FIXME: Removed this for now
        if (modeId == "volumeMini") {

		console.log("timeout clearedA");
		showExtraContents(true,false,"extraVolume");
		/*if (volumeToggleTimeout != null) {
			console.log("timeout clearedB");
			clearTimeout(volumeToggleTimeout);
			console.log("timeout clearedC",volumeToggleTimeout);
		}

		console.log("timeout val",volumeToggleTimeout);

		        //Auto Hide after 5 seconds
                volumeToggleTimeout = setTimeout(function(){ 
                    toggleActions('volumeMini','volumeToggle');
                //}
            
            }, 5000);*/


		/*if ($(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).hasClass("hideExtraBar")) {
            setTimeout(function(){ 
        
        //Auto Hide after 5 seconds
                if (!$(win.runningApps[0].extrabarObject.window.document.getElementById("extraBar")).hasClass("hideExtraBar") && auto) {
                    toggleActions('volumeMini','volumeToggle');
                }
            
            }, 5000);}
        
        
            showExtraContents(true,false,"extraVolume");*/
        }
        
        if (modeId == "screencapOptionsMini") {
            stopCheckingForRecordingTIme = false;
            showExtraContents(true,true,"extraScreenCap");
        }

        if (modeId == "notificationsMini") {
	    showExtraContents(true,true,"extraNotification");  
        }
        
    }
}

win.toggleActions = toggleActions;


function toggleMiniBattery(modeId,togglerId) {
    
    if (toggleMode == modeId) {
        $(".toggleIcon").removeClass("inactiveIcon");
        $("#"+toggleMode).fadeOut("fast", function() {
            $("#time").fadeIn();
            toggleMode = "time";
        });
    } else {
        $(".toggleIcon").addClass("inactiveIcon");
        $("#"+togglerId).removeClass("inactiveIcon");
        $("#"+toggleMode).fadeOut("fast", function() {
            $("#"+modeId).fadeIn();
            toggleMode = modeId;
        });
    }
}

$("#currentlyPlayingMini").fadeOut();
$("#batteryMini").fadeOut();
$("#volumeMini").fadeOut();
$("#shutdownOptionsMini").fadeOut();
$("#networkOptionsMini").fadeOut();
$("#bluetoothOptionsMini").fadeOut();
$("#companionOptionsMini").fadeOut();
$("#screencapOptionsMini").fadeOut();
$("#drivesOptionsMini").fadeOut();
$("#notificationsMini").fadeOut();




