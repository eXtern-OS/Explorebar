function shutdownSys() {
    var exec = require('child_process').exec,
                   child;
            child = exec('systemctl poweroff',function (error, stdout, stderr)
    {//process.cwd()+"/blur_app.sh"
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
                
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
        
       console.log('SUCCESS: shutdown');
        
        
        
        
    }       
});
}
