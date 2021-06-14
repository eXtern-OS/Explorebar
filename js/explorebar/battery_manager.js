var systemBatteryState = "unknown";
var systemBatteryPercentage = "unknown";
var systemBatteryCapacity = "unknown";
var systemBatteryEnergy = "unknown";


function customBatteryInfo() {
    //https://askubuntu.com/questions/69556/how-to-check-battery-status-using-terminal
    var exec = require('child_process').exec,
                   child;
            child = exec('upower -i /org/freedesktop/UPower/devices/battery_BAT0| grep -E "state|to\ full|percentage|capacity|energy"',function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    //console.log('stdout: ' + stdout);
    //console.log('stderr: ' + stderr);
                
    if (error !== null) {
      //console.log('exec error: ' + error);
        $("#batteryToggleOuter").addClass("hidden");
    } else {
         var batteryStr = stdout.replace(/\n/g,':\n').replace(/\s/g,'');
        var batteryAarray = batteryStr.split(':');
        
        for (var i = 0; i < batteryAarray.length; i++) {
            if (batteryAarray[i] == "percentage")
                systemBatteryPercentage = batteryAarray[i+1];
            
            if (batteryAarray[i] == "capacity")
                systemBatteryCapacity = batteryAarray[i+1];
            
            if (batteryAarray[i] == "energy")
                systemBatteryEnergy = batteryAarray[i+1];
            
            if (batteryAarray[i] == "state")
                systemBatteryState = batteryAarray[i+1];
        }
        
        //battery full - #61731;
//battery 2 - #61722;
//battery 3 - #61841;
//battery 3/4 - #61945;
         
        
        var batterySet = false;
        
        if (systemBatteryState == "charging" && !batterySet) {
            $("#batteryToggle").empty();
	    $("#batteryToggle").removeClass("redBattery");
            $("#batteryToggle").append("&#61764;");
            batterySet = true;
    }       
        
        if (systemBatteryPercentage.replace("%","") > 80 && !batterySet) {
            $("#batteryToggle").empty();
            $("#batteryToggle").removeClass("redBattery");
            $("#batteryToggle").append("&#61731;");
            batterySet = true;
    }        
        if (systemBatteryPercentage.replace("%","") > 70 && !batterySet) {
            $("#batteryToggle").empty();
            $("#batteryToggle").removeClass("redBattery");
            $("#batteryToggle").append("&#61945;");
            batterySet = true;
    }        
        if (systemBatteryPercentage.replace("%","") > 40 && !batterySet) {
            $("#batteryToggle").empty();
            $("#batteryToggle").removeClass("redBattery");
            $("#batteryToggle").append("&#61841;");
            batterySet = true;
    }        
        if (systemBatteryPercentage.replace("%","") > 20 && !batterySet) {
            $("#batteryToggle").empty();
            $("#batteryToggle").append("&#61722;");
            $("#batteryToggle").removeClass("redBattery");
            batterySet = true;
    }        
        if (systemBatteryPercentage.replace("%","") < 20 && !batterySet) {
            $("#batteryToggle").empty();
            $("#batteryToggle").append("&#61722;");
            $("#batteryToggle").addClass("redBattery");
            batterySet = true;
    }
            
        
        //console.log("BATTERY STR",batteryAarray);
        
        $("#batteryMiniPercentage").text(systemBatteryPercentage);
        $("#batteryMiniCapacityString").text(systemBatteryCapacity);
        
        if (systemBatteryEnergy == "0Wh") {
            systemBatteryEnergy = "Something is wrong with your battery."
        }
        $("#batteryMiniRemainingTimeString").text(systemBatteryEnergy); //Use this for energy stored for now
        
        //.replace(/ /g,'')
        
        
    }       
});
}
