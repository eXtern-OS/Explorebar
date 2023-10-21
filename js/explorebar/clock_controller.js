indicatorHidden = false;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function updateTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    month = monthNames[date.getMonth()];
    
    if (month.length > 5)
        month = month.substring(0, 3);
    
    /*if (indicatorHidden) {
        $("#timeIndicator").fadeIn();
        indicatorHidden = false;
    } else {
        $("#timeIndicator").fadeOut();
        indicatorHidden = true;
    }*/
    
    //month.substring(0, 3)
    $("#Hours").text(hours);
    $("#Minutes").text(minutes);
    $("#PMAM").text(ampm);
    $("#Date").text(date.getDate());
    $("#Month").text(month);
    $("#Month-Digits").text(date.getMonth());
    $("#Year").text(date.getFullYear());
    
    
    setTimeout(function(){ updateTime(); }, 1000);
}


updateTime();
