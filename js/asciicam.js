(function (app) {
	var cam, intervalId, canvas, canvasCtx, ascii, btnStart, btnStop;

	var loopSpeed = 60;
	var width = 292;
	var height = 151;

    app.init = function () {
		//Get all the page element we need
        cam = document.getElementById('cam');
        ascii = document.getElementById("asciiText");
		canvas = document.createElement("canvas");
		canvasCtx = canvas.getContext("2d");
		btnStart = document.getElementById('startbtn');
        btnStop = document.getElementById('stopbtn');
        
        //Init events
        btnStart.addEventListener('click',app.startCam);
        btnStop.addEventListener('click',app.stopCam);
    };

    app.startCam = function (e) {
		// Get specific vendor methods
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

		// If browser supports user media
		if (navigator.getUserMedia) {
			navigator.getUserMedia({video: true, toString: function() { return "video"; } },
				function successCallback(stream) {
					cam.src = window.URL.createObjectURL(stream) || stream;
					cam.play();
					intervalId = setInterval(app.loop, loopSpeed);
					btnStart.style.display = "none";
					btnStop.style.display = "inline-block";
				},
				function errorCallback(error) {
					alert("An error ocurred getting user media. Code:" + error.code);
				});
		}
		else
		{
			//Browser doesn't support user media
			alert("Your browser does not support user media");
		}

		e.preventDefault();
    };

    app.stopCam = function (e) {
		clearInterval(intervalId);
		cam.src = "";
		e.preventDefault();
		btnStop.style.display = "none";
		btnStart.style.display = "inline-block";
    };

    //The generation of the ascii text was taken from this great sample from thecodeplayer:
    //http://thecodeplayer.com/walkthrough/cool-ascii-animation-using-an-image-sprite-canvas-and-javascript
    app.loop = function () {
		var r, g, b, gray;
		var character, line = "";
		
		//clear canvas
		canvasCtx.clearRect (0, 0, width, height);

		//draw the video frame
		canvasCtx.drawImage(cam, 0, 0, width, height);
		
		//accessing pixel data
		var pixels = canvasCtx.getImageData(0, 0, width, height);
		var colordata = pixels.data;

		//every pixel gives 4 integers -> r, g, b, a
		//so length of colordata array is width*height*4
		
		ascii.innerHTML = ''; //clear contents

		for(var i = 0; i < colordata.length; i = i+4)
		{
			r = colordata[i];
			g = colordata[i+1];
			b = colordata[i+2];
			//converting the pixel into grayscale
			gray = r*0.2126 + g*0.7152 + b*0.0722;
			//overwriting the colordata array with grayscale values
			//colordata[i] = colordata[i+1] = colordata[i+2] = gray;
			
			//text for ascii art.
			//blackish = dense characters like "W", "@"
			//whitish = light characters like "`", "."
			if(gray < 3.64) character        = "$"; //almost BLACK
			else if(gray < 7.29) character   = "@";
			else if(gray < 10.93) character  = "B";
			else if(gray < 14.57) character  = "%";
			else if(gray < 18.21) character  = "8";
			else if(gray < 21.86) character  = "&";
			else if(gray < 25.5) character   = "M";
			else if(gray < 29.14) character  = "W";
			else if(gray < 32.79) character  = "#";
			else if(gray < 36.43) character  = "*";
			else if(gray < 40.07) character  = "t";
			else if(gray < 43.71) character  = "f";
			else if(gray < 47.36) character  = "j";
			else if(gray < 51) character     = "r";
			else if(gray < 54.64) character  = "x";
			else if(gray < 58.28) character  = "n";
			else if(gray < 61.93) character  = "u";
			else if(gray < 65.57) character  = "v";
			else if(gray < 69.21) character  = "c";
			else if(gray < 72.86) character  = "z";
			else if(gray < 76.5) character   = "X";
			else if(gray < 80.14) character  = "Y";
			else if(gray < 83.78) character  = "U";
			else if(gray < 87.43) character  = "J";
			else if(gray < 91.07) character  = "C";
			else if(gray < 94.71) character  = "L";
			else if(gray < 98.36) character  = "Q";
			else if(gray < 102) character    = "0";
			else if(gray < 105.64) character = "O";
			else if(gray < 109.28) character = "Z";
			else if(gray < 112.93) character = "m";
			else if(gray < 116.57) character = "w";
			else if(gray < 120.21) character = "q";
			else if(gray < 123.86) character = "p";
			else if(gray < 127.5) character  = "d";
			else if(gray < 131.14) character = "b";
			else if(gray < 134.78) character = "k";
			else if(gray < 138.43) character = "h";
			else if(gray < 142.07) character = "a";
			else if(gray < 145.71) character = "o";
			else if(gray < 149.35) character = "/";
			else if(gray < 153) character    = "\\";
			else if(gray < 156.64) character = "|";
			else if(gray < 160.28) character = "(";
			else if(gray < 163.93) character = ")";
			else if(gray < 167.57) character = "1";
			else if(gray < 171.21) character = "{";
			else if(gray < 174.85) character = "}";
			else if(gray < 178.5) character  = "[";
			else if(gray < 182.14) character = "]";
			else if(gray < 185.78) character = "?";
			else if(gray < 189.43) character = "-";
			else if(gray < 193.07) character = "_";
			else if(gray < 196.71) character = "+";
			else if(gray < 200.35) character = "~";
			else if(gray < 204) character    = "<";
			else if(gray < 207.64) character = ">";
			else if(gray < 211.28) character = "i";
			else if(gray < 214.93) character = "!";
			else if(gray < 218.57) character = "I";
			else if(gray < 222.21) character = "l";
			else if(gray < 225.85) character = ";";
			else if(gray < 229.5) character  = ":";
			else if(gray < 233.14) character = ",";
			else if(gray < 236.78) character = "\"";
			else if(gray < 240.42) character = "^";
			else if(gray < 244.07) character = "`";
			else if(gray < 247.71) character = "'";
			else if(gray < 252.35) character = ".";
			else character                   = " "; //almost WHITE
			
			//newlines and injection into dom
			if(i !== 0 && (i/4)%width === 0) //if the pointer reaches end of pixel-line
			{
				ascii.appendChild(document.createTextNode(line));
				//newline
				ascii.appendChild(document.createElement("br"));
				//emptying line for the next row of pixels.
				line = "";
			}
			
			line += character;
		}
    };
    
    app.init();

}(window.asciicam = window.asciicam || {}));
