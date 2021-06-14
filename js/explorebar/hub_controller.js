
/*gui.Screen.Init();
            var string = "";
            var screens = gui.Screen.screens;
            console.log("REPOSITION DONE")*/
           // new_win.y = window.screen.height-169; //FIXME

		win.sysWin = {opened:false};
              //win.sysWin.opened = false;
		sendVariable("win.sysWin.opened",false);
function openHub () {
    
  
    //console.log("MINIMIZED: ",win.sysWin.minimized);
    //if (win.runningApps[0].windowObject.sysWin.minimized)
    console.log("OpenHub");
	console.log("opened status",win.sysWin.opened);
  if (win.canOpenHub) {
	/*if (win.sysWin.opened) {
		console.log("opened",win.sysWin.opened);
		hideHubView();
		win.sysWin.opened = false;
		win.sysWin.hidingNow = true;
		setTimeout(function(){ win.sysWin.hidingNow = false; }, 500);
	} else {
	win.sysWin.opened = true;
showHubView();
console.log("opened status set to ",win.sysWin.opened);

      //win.sysWin.y = (window.screen.height-win.sysWin.height)-49;//169;
	
	win.sysWin.opened = true;


  }*/
  
  toggleHub();
  
  console.log("hub y",win.sysWin.y);
    //else
        //setTimeout(function(){ win.runningApps[0].windowObject.sysWin.hide(); }, 100);
    }
    
}
win.openHubs = openHub;
