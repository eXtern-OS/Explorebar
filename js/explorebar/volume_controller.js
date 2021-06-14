volumes.set(50).then(function(response) {
    $("#volumeIcon").empty();
    $("#volumeIcon").append('<span id="volumeToggle" class="icon toggleIcon">&#61921;</span>'); // 50+
});

win.getSystemVolume = function () {
	return volumeSlider.getValue();
}

//win.showDevTools();

win.setSystemVolume = function (percentage) {
			$('#ex1').slider( 'setValue', percentage );
			updateSlider(true);
}

function updateSlider(dontToggleVolume) {
    volumes.set(volumeSlider.getValue()).then(function(response) {

			//win.adjustHubVolumeSlider(volumeSlider.getValue());

			if (!dontToggleVolume) {
			clearTimeout(volumeToggleTimeout);
			volumeToggleTimeout = setTimeout(function(){ 
                   		toggleActions('volumeMini','volumeToggle');    
            		}, 5000);
			}

        $("#volumeTitle").text("Audio Volume ("+volumeSlider.getValue()+"%) ");
        if (volumeSlider.getValue() == 0) {
            $("#volumeIcon").empty();
            $("#volumeIcon").append('<span id="volumeToggle" class="icon toggleIcon">&#61829;</span>'); //mute
        }
        
        if (volumeSlider.getValue() > 1) {
            $("#volumeIcon").empty();
            $("#volumeIcon").append('<span id="volumeToggle" class="icon toggleIcon">&#61904;</span>'); // 1+
        }
        
        if (volumeSlider.getValue() > 49) {
            $("#volumeIcon").empty();
            $("#volumeIcon").append('<span id="volumeToggle" class="icon toggleIcon">&#61921;</span>'); // 50+
        }
        
        if (volumeSlider.getValue() > 99) {
            $("#volumeIcon").empty();
            $("#volumeIcon").append('<span id="volumeToggle" class="icon toggleIcon">&#61849;</span>'); // 100+
        }
});
}

var volumeSlider = $('#ex1').slider()
		.on('slide', updateSlider)
		.data('slider');

$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});

win.increaseAudioVolume = function (addVolume) {
	console.log("Here VOLUMEAA");
	/*if (toggleMode != "volumeMini")
		toggleActions('volumeMini','volumeToggle',true);*/

	if (addVolume) {
		hudCommsChannel.postMessage({type: "set-volume",level: volumeSlider.getValue()+1});
		console.log("Add volume");
		console.log("Current Volume",volumeSlider.getValue());
		if (volumeSlider.getValue() != 100) {
			//console.log("Here VOLUME");
			$('#ex1').slider( 'setValue', volumeSlider.getValue()+1 );
			updateSlider(true);
			;
		}
	} else {
		hudCommsChannel.postMessage({type: "set-volume",level: volumeSlider.getValue()-1});
		console.log("Minus volume");
		console.log("Current Volume",volumeSlider.getValue());
		if (volumeSlider.getValue() != 0) {
			//console.log("Here VOLUME");
			$('#ex1').slider( 'setValue', volumeSlider.getValue()-1 );
			updateSlider(true);
			;
			
		}
	}
}

//https://stackoverflow.com/questions/38336252/jquery-to-change-value-of-bootstrap-slider
