
//const fs = require("fs");


function executeNativeCommand(request,callback) {
    var exec = require('child_process').exec,
                   child;
            child = exec(request,function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
      console.log('exec error: ' + error);
	if (callback != null)
		callback(error);
    } else {

	if (callback != null)
		callback(stdout);
    

    }       
});
}

var autoCloseAllNotifications = false;
var closeAllNotifsTimeout;



/*

var dbus = require('/home/extern/Projects/notifications/node_modules/dbus-next');




const bus = dbus.sessionBus();

console.log("bus: ",bus);

bus.getProxyObject('org.freedesktop.DBus', '/org/freedesktop/DBus').then((obj) => {
  let monitor = obj.getInterface('org.freedesktop.DBus.Monitoring');

  monitor.BecomeMonitor([
    "type='signal',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
    "type='method_call',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
    "type='method_return',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
    "type='error',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'"
  ], 0);

	console.log("bus: ",bus);


  bus.on('message', (msg) => {

	if (msg.body.length > 1) {




var buttons = [];



	console.log("msg: ",msg);

	var appInfo = {
		name: msg.body[0]
		}

	var icon = "../Shared/CoreIMG/icons/empathy.png";

	if (msg.body[2].indexOf("://") != -1) {
		var icon = msg.body[2];
	}

	var message = "<p>"+msg.body[4].replace(/(<([^>]+)>)/gi, "")+"</p>"; //Remve html tags
	var buttonText = "View in "+msg.body[0];



	if (msg.body[4].indexOf("<a href") != -1) {
		message = "<p>"+msg.body[3]+"<p>"+message+"</p>";
		console.log("jquery body: ",$(msg.body[4]));
		console.log("jquery body: ",$(msg.body[4]).text());
		if (msg.body[4].split("</a>").length > 1)
			buttonText = $(msg.body[4]).text();
	}

      var button = {
	text: buttonText,
	id: 0
	}

	buttons.push(button);
	
	

	win.newNotification(appInfo,message,buttons,null,icon);
    console.log("notification",msg);
	}
  });

});*/

//xdotool key ctrl+shift+space

function addRestOfNotification(obj,appInfo,icon) {
	var buttons = [];
	var message = "<p>"+obj.messsage.replace(/(<([^>]+)>)/gi, "")+"</p>"; //Remve html tags

	console.log("message log A: ",message);
	var buttonText = "View in "+appInfo.name;

	console.log("we are getting here.2..");



	if (obj.messsage.indexOf("<a href") != -1) {
		console.log("jquery body: ",$(obj.messsage));
		console.log("jquery body: ",$(obj.messsage).text());
		if (obj.messsage.split("</a>").length > 1)
			buttonText = $(obj.messsage).text();
	}

	message = "<p>"+obj.title+"<p>"+message+"</p>";

	

	console.log("we are getting here.3..",message);

      var button = {
	text: buttonText,
	id: 0
	}

	buttons.push(button);
	
		if (obj.app_icon != "") {
		console.log("check new 1");
		if (fs.existsSync('/tmp/systemX-'+obj.app_icon.split("/").pop())) {
			appInfo.icon = 'file:///tmp/systemX-'+obj.app_icon.split("/").pop();
			win.newNotification(appInfo,message,buttons,null,icon);
			//executeNativeCommand("xdotool key ctrl+shift+space");
		} else {
			console.log("check new 2: ",obj.app_icon);
		fs.copyFile(obj.app_icon, '/tmp/systemX-'+obj.app_icon.split("/").pop(), (err) => {
  			if (err) throw err;
			appInfo.icon = 'file:///tmp/systemX-'+obj.app_icon.split("/").pop();
  			console.log('source.txt was copied to destination.txt');
			win.newNotification(appInfo,message,buttons,null,icon);
			//executeNativeCommand("xdotool key ctrl+shift+space");
		});
		}
		} else {
			win.newNotification(appInfo,message,buttons,null,icon);
			//executeNativeCommand("xdotool key ctrl+shift+space");
		}

}


function enbleNotificationDaemon() {
//console.log("monitoring");
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var child = spawn('unbuffer', ['python','-u','/usr/eXtern/systemX/extern.explorebar/js/2notifications.py']);

child.stdout._handle.setBlocking(true);

////console.log("spawned: " + child.pid);

child.stdout.on('data', function(data) {
  console.log("Child data: " + data);
var obj = JSON.parse(data)
  console.log("Child data obj: ", obj);

	if (obj.app_icon.indexOf("file://") != -1) {
		console.log("replacing...");
		obj.app_icon = obj.app_icon.replace("file://","");
	}

	

	if (obj.app_title == "") {
		var appInfo = {
			name: obj.app_name,
			icon: obj.app_icon
		}
	} else {
		var appInfo = {
			name: obj.app_title,
			icon: obj.app_icon
		}
	}

	var icon = "../Shared/CoreIMG/icons/preferences-system-notifications.svg";

	console.log("we are getting here...");

	if (obj.notification_icon != "") {
		var icon = obj.notification_icon;
		console.log("about to check: ",'/tmp/systemX-'+icon.split("/").pop());
		if (fs.existsSync('/tmp/systemX-'+icon.split("/").pop())) {
			icon = 'file:///tmp/systemX-'+icon.split("/").pop();
			executeNativeCommand("xdotool key ctrl+shift+space");
			addRestOfNotification(obj,appInfo,icon);
		} else {
			console.log("we are here else");
		fs.copyFile(icon, '/tmp/systemX-'+icon.split("/").pop(), (err) => {
  			if (err) throw err;
			icon = 'file:///tmp/systemX-'+icon.split("/").pop();
  			console.log('source.txt was copied to destination.txt');
			executeNativeCommand("xdotool key ctrl+shift+space");
			addRestOfNotification(obj,appInfo,icon);
		});
		}
	} else {
		executeNativeCommand("xdotool key ctrl+shift+space");
		addRestOfNotification(obj,appInfo,icon);
	}


	autoCloseAllNotifications = true;

	clearTimeout(closeAllNotifsTimeout);
	closeAllNotifsTimeout = setTimeout(function(){ 

		if (autoCloseAllNotifications) {
			executeNativeCommand("xdotool key ctrl+space");
			console.log("all notifications closed");
		}

	}, 1000);

	
    //console.log("notification",msg);

//executeNativeCommand("xdotool key ctrl+shift+space+alt");


});
child.on('error', function () {
  console.log("Failed to start child.");
});
child.on('close', function (code) {
  console.log('Child process exited with code ' + code);
//enbleNotificationDaemon();
});
child.stdout.on('end', function () {
  console.log('Finished collecting data chunks.');
enbleNotificationDaemon();
});
}

enbleNotificationDaemon();

