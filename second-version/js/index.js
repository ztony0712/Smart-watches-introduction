$(document).ready(function() {
    $("img").hover(function() {
        $("h1 span").stop().fadeToggle('slow')
    });
});

function make_clock() {
    
    var canvas = document.getElementById("canvasID");
    var circle = canvas.getContext("2d");
    var width = circle.canvas.width;
    var height = circle.canvas.height;
    var r = width / 2;
    circle.translate(r, r)

    // draw clock Plate
    function drawPlate() {
        circle.save();
        circle.beginPath();
        circle.arc(0, 0, r - 5, 0, 2 * Math.PI);
        circle.lineWidth = 10;
        circle.stroke();

        var hourScales = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        circle.font = '22px Arial';
        circle.textAlign = 'center';
        circle.textBaseline = 'middle';

        // draw scals
        hourScales.forEach(function(scale, index) {
            var rad = 2 * Math.PI / 12 * index;
            var x = Math.cos(rad) * (r - 35);
            var y = Math.sin(rad) * (r - 35);
            circle.fillText(scale, x, y);
        });
        // draw points
        for (var i = 0; i < 60; i++) {
            var rad = 2 * Math.PI / 60 * i;
            var x = Math.cos(rad) * (r - 18);
            var y = Math.sin(rad) * (r - 18);
            circle.beginPath();
            if (i % 5 == 0) {
                circle.fillStyle = 'black';
                circle.arc(x, y, 3, 0, 2 * Math.PI);
            } else {
                circle.fillStyle = 'grey';
                circle.arc(x, y, 2, 0, 2 * Math.PI);
            }
            circle.fill();
        }
    }


    // draw hands on plante
    function hourHand(hour, minute) {
        circle.save();
        circle.beginPath();
        var hrad = 2 * Math.PI / 12 * hour;
        var mrad = 2 * Math.PI / 12 / 60 * minute;
        circle.rotate(hrad + mrad);
        circle.lineWidth = 8;
        circle.lineCap = 'round';
        circle.moveTo(0, 0);
        circle.lineTo(0, -r / 2);
        circle.stroke();
        circle.restore();
    }

    function minuteHand(minute, second) {
        circle.save();
        circle.beginPath();
        var mrad = 2 * Math.PI / 60 * minute;
        var srad = 2 * Math.PI / 60 /60 * second;
        circle.rotate(mrad + srad);
        circle.lineWidth = 4;
        circle.lineCap = 'round';
        circle.moveTo(0, 0);
        circle.lineTo(0, -2 * r / 3);
        circle.stroke();
        circle.restore();
    }

    function secondHand(second) {
        circle.save();
        circle.beginPath();
        var rad = 2 * Math.PI / 60 * second;
        circle.rotate(rad);
        circle.lineWidth = 2;
        circle.lineCap = 'round';
        circle.moveTo(0, 30);
        circle.lineTo(0, -4 * r / 5);
        circle.strokeStyle = 'red'
        circle.stroke();
        circle.restore();
    }

    function middlePoint() {
        circle.beginPath();
        circle.fillStyle = "white";
        circle.arc(0, 0, 5, 0, 2 * Math.PI)
        circle.fill();
    }



    // access time and draw the whole clock
    function draw() {
        circle.clearRect(-r, -r, width, height);
        var time = new Date();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        drawPlate();
        hourHand(hour, minute);
        minuteHand(minute, second);
        secondHand(second);
        middlePoint();
        circle.restore();
    }

    draw();
    setInterval(draw, 1000);

}
make_clock();



function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: "AgzdrUj1U_m__u4zMTX_kPshCFMx7YM-21GjvbvxhZC0n1YCE5Fums1VF42sxpHw"
    });

    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);

        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });
}