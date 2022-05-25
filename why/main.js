document.body.appendChild(canvasElement);

window.onload = function(event) {
	init();
};

window.onresize = function(event) {
	measure();
};


function init() {
	measure();
	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);
	
	state = "preloader";
	initPreloader();
}

function update() {
	resetMouse();
	hotkeys();
	runGameTimer();
	if (state == "game") {
		if (!paused) {
			updateEnemies();
			updatePlayer();
			updateCoins();
			updateInstructions();
			winLevel();
		}
		updatePlayerRainbow();
	} else if (state == "preloader") {
		updatePreloader();
	} else if (state == "intermission") {
		if (!paused)
			updateIntermission();
	} else if (state == "level_select") {
		updateEnemies();
		updatePlayerRainbow();
	} else if (state == "finish") {
		updateFinish();
	}
}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	if (state == "game") {
		drawWalls_fill();
		drawChecks();
		drawWalls_stroke();
		drawCoins();
		drawEnemies();
		drawPlayer();
		drawInstructions();
		if (mobile) {
            drawMobileControls();
        }
	} else if (state == "preloader") {
		drawPreloader();
	} else if (state == "intermission") {
		drawIntermission();
	} else if (state == "main_menu") {
		drawMainMenu();
	} else if (state == "level_select") {
		drawLevelSelect();
	} else if (state == "finish") {
		drawFinish();
	}
	if (state == "game" || state == "intermission")
		drawIGMenu();
	if (state != "preloader")
		drawBars();
	if (!mobile) {
        mobileControls();
    }
	drawFullscreenButton();
	drawBorder();

	 

}

function measure() {
	if (mobile) {
        canvasWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        canvasHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

        canvasElement.width = canvasWidth;
        canvasElement.height = canvasHeight;

        calcOffset();
    }
}

function goFullScreen() {
    if(canvasElement.requestFullScreen)
        canvasElement.requestFullScreen();
    else if(canvasElement.webkitRequestFullScreen)
        canvasElement.webkitRequestFullScreen();
    else if(canvasElement.mozRequestFullScreen)
        canvasElement.mozRequestFullScreen();
    
    FSOn = true;
    measure();
}

function exitFullScreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    
    FSOn = false;
    measure();
}

function drawFullscreenButton() {
	/*
	canvas.fillStyle = "white";
	canvas.font = cwh(30) + "px Arial";
	canvas.textAlign = "center";
	if (FSOn)
		canvas.fillText("EXIT FULLSCREEN", cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
	else
		canvas.fillText("GO FULLSCREEN",  cwh(CANVAS_WIDTH / 2) + os.x, cwh(CANVAS_HEIGHT - BAR_HEIGHT / 2 + BAR_TEXT_FIX) + os.y);
		
	// fix fullscreen cancelled bug
	if(window.innerWidth == screen.width && window.innerHeight == screen.height) {
		if (!FSOn)
			FSOn = true;
	} else {
		if (FSOn)
			FSOn = false;
	}
	*/
}