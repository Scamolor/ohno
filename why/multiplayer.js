var player2 = {
	x: null,
	y: null,
	prevX: null,
	prevY: null,
	right: null,
	left: null,
	top: null,
	bottom: null,
	tileRight: null,
	tileLeft: null,
	tileTop: null,
	tileBottom: null,
	carvedUp: false,
	carvedDown: false,
	movedRight: false,
	movedLeft: false,
	movedUp: false,
	movedDown: false,
	dying: false,
	bouncing: false,
	bounceState: null,
	bounceY: null,
	bounceTarget: null,
	width: 1,
	height: 1,
	alpha: 1,
	color: 0,
	redFill: PLAYER_FILL_COLORS[0][0],
	redOutline: PLAYER_OUTLINE_COLORS[0][0],
	greenFill: 0,
	greenOutline: 0,
	blueFill: 0,
	blueOutline: 0,
	rainbowUnder: null,
	rainbowOver: null,
	rainbowPercent: 0
};

function updatePlayer() {
	if (state == "game" && !paused) {
		getPlayerBounds();
		player2Move();
		player2HitEnemy();
		player2HitCheck();
		player2GetCoins();
		player2Die();
		player2Respawn();
		player2Bounce();
		getPrevPlayerCoords();
	}
}

function getPlayerBounds() {
	if (state == "game") {
		player2.right = player2.x + PLAYER_SIZE / 2;
		player2.left = player2.x - PLAYER_SIZE / 2;
		player2.top = player2.y - PLAYER_SIZE;
		player2.bottom = player2.y;
		
		player2.tileRight  = Math.floor((player2.right  + WALL_BORDER_LEFT)   / TILE_SIZE);
		player2.tileLeft   = Math.floor((player2.left   - WALL_BORDER_RIGHT)  / TILE_SIZE);
		player2.tileTop    = Math.floor((player2.top    - WALL_BORDER_BOTTOM) / TILE_SIZE);
		player2.tileBottom = Math.floor((player2.bottom + WALL_BORDER_TOP)    / TILE_SIZE);
	}
}

function getPrevPlayerCoords() {
	if (state == "game") {
		player2.prevX = player2.x;
		player2.prevY = player2.y;
	}
}

function resetPlayer() {
	if (!justLoaded) {
		curCheck = 0;
	}
}

function player2Move() {
	if (state == "game" && !player2.dying && (!player2.bouncing || player2.bounceState >= 4)) {
		var distance = 0;
		player2.carvedUp = false;
		player2.carvedDown = false;
		player2.movedRight = false;
		player2.movedLeft = false;
		player2.movedUp = false;
		player2.movedDown = false;

		if (!mobile || hideKeys) {
            keyRight = (keydown.right || keydown.d);
            keyLeft = (keydown.left || keydown.a);
            keyUp = (keydown.up || keydown.w);
            keyDown = (keydown.down || keydown.s);
        }

		if (keydown.right || keydown.d || keydown.left || keydown.a || keydown.up || keydown.w || keydown.down || keydown.s) {
			hideKeys = true;
		}

		// right
		if (keyRight) {
			distance = PLAYER_SPEED;
			while (walls[level][player2.tileTop][Math.floor((player2.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 ||
				walls[level][player2.tileBottom][Math.floor((player2.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1) {
				distance--;
			}
			player2.x += distance;
			if (distance > 0) {
				player2.movedRight = true;
			} else {
				// carve up
				while (distance < PLAYER_SPEED && 
					walls[level][Math.floor((player2.bottom - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
					walls[level][Math.floor((player2.bottom - CARVE - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 0) {
					distance++;
				}
				if (distance > 0) {
					player2.carvedUp = true;
					player2.y -= distance;
					if (player2.bouncing) {
						player2.bounceY -= distance;
						player2.bounceTarget -= distance;
					}
				}

				// carve down
				distance = 0;
				while (distance < PLAYER_SPEED && 
					walls[level][Math.floor((player2.top + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
					walls[level][Math.floor((player2.top + CARVE + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.right + PLAYER_SPEED + WALL_BORDER_LEFT) / TILE_SIZE)] == 0) {
					distance++;
				}
				if (distance > 0) {
					player2.carvedDown = true;
					player2.y += distance;
					if (player2.bouncing) {
						player2.bounceY += distance;
						player2.bounceTarget += distance;
					}
				}
			}
		}

		// left
		else if (keyLeft) {
			distance = PLAYER_SPEED;
			while (walls[level][player2.tileTop][Math.floor((player2.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 ||
				walls[level][player2.tileBottom][Math.floor((player2.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1) {
				distance--;
			}
			player2.x -= distance;
			if (distance > 0) {
				player2.movedLeft = true;
			} else {
				// carve up
				while (distance < PLAYER_SPEED && 
					walls[level][Math.floor((player2.bottom - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
					walls[level][Math.floor((player2.bottom - CARVE - distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0) {
					distance++;
				}
				if (distance > 0) {
					player2.carvedUp = true;
					player2.y -= distance;
					if (player2.bouncing) {
						player2.bounceY -= distance;
						player2.bounceTarget -= distance;
					}
				}

				// carve down
				distance = 0;
				while (distance < PLAYER_SPEED && 
					walls[level][Math.floor((player2.top + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
					walls[level][Math.floor((player2.top + CARVE + distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.left - PLAYER_SPEED - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0) {
					distance++;
				}
				if (distance > 0) {
					player2.carvedDown = true;
					player2.y += distance;
					if (player2.bouncing) {
						player2.bounceY += distance;
						player2.bounceTarget += distance;
					}
				}
			}
		}

		// up
		if (keyUp) {
			distance = PLAYER_SPEED;
			while (walls[level][Math.floor((player2.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][player2.tileRight] == 1 ||
				walls[level][Math.floor((player2.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][player2.tileLeft]  == 1) {
				distance--;
			}
			if (!player2.carvedUp) {
				player2.movedUp = true;
				player2.y -= distance;
				if (player2.bouncing) {
					player2.bounceY -= distance;
					player2.bounceTarget -= distance;
				}
			}
			if (distance == 0) {
				// carve right
				if (!player2.movedRight && !player2.movedLeft) {
					distance = 0;
					while (distance < PLAYER_SPEED && 
						walls[level][Math.floor((player2.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.left + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
						walls[level][Math.floor((player2.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.left + CARVE + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0) {
						distance++;
					}
					player2.x += distance;
				}
				
				// carve left
				if (!player2.movedRight && !player2.movedLeft) {
					distance = 0;
					while (distance < PLAYER_SPEED && 
						walls[level][Math.floor((player2.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.right - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
						walls[level][Math.floor((player2.top - PLAYER_SPEED - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.right - CARVE - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 0) {
						distance++;
					}
					player2.x -= distance;
				}
			}
		}

		// down
		else if (keyDown) {
			distance = PLAYER_SPEED;
			while (walls[level][Math.floor((player2.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][player2.tileRight] == 1 ||
				walls[level][Math.floor((player2.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][player2.tileLeft]  == 1) {
				distance--;
			}
			if (!player2.carvedDown) {
				player2.movedDown = true;
				player2.y += distance;
				if (player2.bouncing) {
					player2.bounceY += distance;
					player2.bounceTarget += distance;
				}
			}
			if (distance == 0) {
				// carve right
				if (!player2.movedRight && !player2.movedLeft) {
					distance = 0;
					while (distance < PLAYER_SPEED && 
						walls[level][Math.floor((player2.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.left + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1 &&
						walls[level][Math.floor((player2.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.left + CARVE + distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 0) {
						distance++;
					}
					player2.x += distance;
				}
				
				// carve left
				if (!player2.movedRight && !player2.movedLeft) {
					distance = 0;
					while (distance < PLAYER_SPEED && 
						walls[level][Math.floor((player2.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.right - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1 &&
						walls[level][Math.floor((player2.bottom + PLAYER_SPEED + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.right - CARVE - distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 0) {
						distance++;
					}
					player2.x -= distance;
				}
			}
		}

		// fix carving cancel move bug - up
		if (player2.movedUp && player2.carvedDown) {
			player2.y -= PLAYER_SPEED;
			if (player2.bouncing) {
				player2.bounceY -= PLAYER_SPEED;
				player2.bounceTarget -= PLAYER_SPEED;
			}
		}

		// fix carving cancel move bug - down
		else if (player2.movedDown && player2.carvedUp) {
			player2.y += PLAYER_SPEED;
			if (player2.bouncing) {
				player2.bounceY += PLAYER_SPEED;
				player2.bounceTarget += PLAYER_SPEED;
			}
		}

		// fix corner bug - up/right
		if ((keyRight) && (keyUp)) {
			if (walls[level][Math.floor((player2.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1) {
				if (player2.prevX == player2.x - PLAYER_SPEED && player2.prevY == player2.y + PLAYER_SPEED) {
					player2.x -= PLAYER_SPEED;
				}
			}
		}

		// fix corner bug - up/right
		else if ((keyLeft) && (keyUp)) {
			if (walls[level][Math.floor((player2.top - distance - WALL_BORDER_BOTTOM) / TILE_SIZE)][Math.floor((player2.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1) {
				if (player2.prevX == player2.x + PLAYER_SPEED && player2.prevY == player2.y + PLAYER_SPEED) {
					player2.x += PLAYER_SPEED;
				}
			}
		}

		// fix corner bug - down/right
		else if ((keyRight) && (keyDown)) {
			if (walls[level][Math.floor((player2.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.right + distance + WALL_BORDER_LEFT) / TILE_SIZE)] == 1) {
				if (player2.prevX == player2.x - PLAYER_SPEED && player2.prevY == player2.y - PLAYER_SPEED) {
					player2.x -= PLAYER_SPEED;
				}
			}
		}

		// fix corner bug - down/right
		else if ((keyLeft) && (keyDown)) {
			if (walls[level][Math.floor((player2.bottom + distance + WALL_BORDER_TOP) / TILE_SIZE)][Math.floor((player2.left - distance - WALL_BORDER_RIGHT) / TILE_SIZE)] == 1) {
				if (player2.prevX == player2.x + PLAYER_SPEED && player2.prevY == player2.y - PLAYER_SPEED) {
					player2.x += PLAYER_SPEED;
				}
			}
		}
	}
}

function player2HitEnemy() {
	getPlayerBounds();
	if (state == "game" && !invincible && !invincible_permanent && !player2FullOnCheck() && !player2.dying && (!player2.bouncing || player2.bounceState >= 4)) {
		for (var i = 0; i < enemies[level].length; i++) {
			if (enemies[level][i].x + ENEMY_SIZE_HIT / 2 > player2.left &&
				enemies[level][i].x - ENEMY_SIZE_HIT / 2 < player2.right &&
				enemies[level][i].y + ENEMY_SIZE_HIT / 2 > player2.top &&
				enemies[level][i].y - ENEMY_SIZE_HIT / 2 < player2.bottom) 
			{  
				player2.dying = true;
				playSFX(sfx_die);
				break;
			}
		}
	}
}

function player2Respawn() {
	if (state == "game") {
		if (!player2.dying && player2.alpha < 1 && !finishLevelTimer > 0) {
			player2.alpha += RESPAWN_FADE_SPEED;
			if(player2.alpha>1){
				player2.alpha =1;
			}
		} else if (!player2.dying && player2.alpha >= 1) {
			player2.alpha = 1;
		}
	}
}

function player2Die() {
	if (state == "game" && player2.dying) {
		if (player2.alpha > 0) {
			
			player2.alpha -= DIE_FADE_SPEED;
			if(player2.alpha<0){
				player2.alpha = 0;
			}
		}
		else
		{
			deaths++;
			localStorage.setItem("whg_deaths", deaths);
			localStorage.setItem("whg_gameTimer", gameTimer);
			player2.alpha = 0;
			player2.dying = false;
			checkFlashAlpha = 1;
			player2AtCheck(false, true);
			
			if (bouncingEnabled)
				playSFX(sfx_bounce1);

			// reset unsaved coins
			for (var j = 0; j < getCoinsTotal(); j++) {
				if (coins[level][j].gathered && !coins[level][j].saved) {
					coins[level][j].gathered = false;
					coins[level][j].fadingIn = true;
					coins[level][j].fadingOut = false;
				}
			}
		}
	}
}

function player2HitCheck() {
	if (state == "game") {
		for (var i = 0; i < checkpoints[level].length; i++) {
			if (curCheck != i || unsavedCoins()) {
				if ((player2.right > checkpoints[level][i][0] * TILE_SIZE && player2.left < (checkpoints[level][i][0] + checkpoints[level][i][2]) * TILE_SIZE) &&
					(player2.bottom > checkpoints[level][i][1] * TILE_SIZE && (player2.top < (checkpoints[level][i][1] + checkpoints[level][i][3]) * TILE_SIZE))) {
					
					var justWonLevel = false;
						
					// set new checkpoints
					curCheck = i;
					checkFlashAlpha = 1;

					// save coin progress
					var gotCoinOnThisCheck = false;
					for (var j = 0; j < getCoinsTotal(); j++) {
						if (coins[level][j].gathered && !coins[level][j].saved) {
							coins[level][j].saved = true;
							if (coinFullOnCheck(j, i))
								gotCoinOnThisCheck = true;
						}
					}
					
					// finish level
					if (checkpoints[level][i][4] && getCoinsCollected() == getCoinsTotal()) {
						
						invincible = true;
						finishLevelTimer = FINISH_LEVEL_TIMER_TOT;
						justWonLevel = true;
						playSFX(sfx_win);
					} else if (!gotCoinOnThisCheck) {
						playSFX(sfx_checkpoint);
					}
					
					// save
					if (!justWonLevel) {
						localStorage.setItem("whg_curCheck", curCheck);
						localStorage.setItem("whg_gameTimer", gameTimer);
						submitSavedCoins();
					} else {
						if (level < TOTAL_LEVELS)
							localStorage.setItem("whg_level", (level+1));
						localStorage.setItem("whg_curCheck", 0);
						localStorage.setItem("whg_coins", "[-99]");
						localStorage.setItem("whg_gameTimer", gameTimer);
					}
					
					break;
				}
			}
		}
	}
}

function player2FullOnCheck() {
	if (state == "game") {
		for (var i = 0; i < checkpoints[level].length; i++) {
			if (player2.right < ((checkpoints[level][i][0] + checkpoints[level][i][2]) * TILE_SIZE) && player2.left > (checkpoints[level][i][0] * TILE_SIZE) &&
				player2.bottom < ((checkpoints[level][i][1] + checkpoints[level][i][3]) * TILE_SIZE) && player2.top > (checkpoints[level][i][1] * TILE_SIZE)) {
				return true;
			}
		}
		return false;
	}
}

function coinFullOnCheck(coinNum, checkNum) {
	if (state == "game") {
		if (coins[level][coinNum].x + COIN_SIZE / 2 < ((checkpoints[level][checkNum][0] + checkpoints[level][checkNum][2]) * TILE_SIZE) && 
			coins[level][coinNum].x - COIN_SIZE / 2 > (checkpoints[level][checkNum][0] * TILE_SIZE) &&
			coins[level][coinNum].y + COIN_SIZE / 2 < ((checkpoints[level][checkNum][1] + checkpoints[level][checkNum][3]) * TILE_SIZE) &&
			coins[level][coinNum].y - COIN_SIZE / 2 > (checkpoints[level][checkNum][1] * TILE_SIZE)) {
			return true;
		}
		return false;
	}
}

function winLevel() {
	// win level
    if (state == "game" && invincible && finishLevelTimer > 0) {
		finishLevelTimer--;
		if (player2.alpha > 0) {
			player2.alpha -= WIN_LEVEL_FADE_SPEED;
			if (player2.alpha < 0) {
			 player2.alpha = 0;
		    }
			
			
		} else if (player2.alpha < 0) {
			player2.alpha = 0;
		}
        if (finishLevelTimer <= 0) {
	        if (level < 30) {
				curCheck = 0;
				resetCoins(level);
	            level++;
	            coinsSave = [-99];
		        localStorage.setItem("whg_gameTimer", gameTimer);
		        localStorage.setItem("whg_level", level);
		        localStorage.setItem("whg_deaths", deaths);
		        localStorage.setItem("whg_curCheck", curCheck);
				localStorage.setItem("whg_coins", "[-99]");
	            state = "intermission";
	            intermissionTimer = INTERMISSION_TIMER_TOT;
	            playSFX(sfx_intermission);
        	} else {
	        	state = "finish";
        		initFinish();
	        }
        }
    }
}

function player2GetCoins() {
	if (state == "game" && !player2.dying && (!player2.bouncing || player2.bounceState >= 4)) {
		for (var i = 0; i < coins[level].length; i++) {
			if (!coins[level][i].gathered &&
				coins[level][i].x + COIN_SIZE / 2 > player2.left &&
				coins[level][i].x - COIN_SIZE / 2 < player2.right &&
				coins[level][i].y + COIN_SIZE / 2 > player2.top &&
				coins[level][i].y - COIN_SIZE / 2 < player2.bottom) 
			{  
				coins[level][i].gathered = true;
				coins[level][i].fadingOut = true;
				coins[level][i].fadingIn = false;
				playSFX(sfx_coin);
				getCoinsCollected();
			}
		}
	}
}

function drawPlayer2() {
	if (state == "game") {
		var drawY = player2.y;
		if (player2.bouncing)
			drawY = player2.bounceY;

		// bounce shadow
		if (player2.bouncing) {
			yDif = player2.bounceTarget - player2.bounceY;
			canvas.beginPath();
			canvas.rect(cwh(player2.x - PLAYER_SIZE / 2 * (player2.bounceY / player2.bounceTarget * player2.width)) + os.x,
				cwh((player2.bounceTarget - yDif / 10) - PLAYER_SIZE * (player2.bounceY / player2.bounceTarget * player2.height / 1.5)) + os.y,
				cwh(PLAYER_SIZE * (player2.bounceY / player2.bounceTarget * player2.width)),
				cwh(PLAYER_SIZE * (player2.bounceY / player2.bounceTarget * player2.height / 1.5)));
			canvas.fillStyle = SHADOW_COLOR + (player2.bounceY / player2.bounceTarget * SHADOW_OPACITY * player2.alpha) + ")";
			canvas.fill();
		}
		
		// underneath fill (fixes small gap between outline and fill, also outline alpha is too dark without double fill)
		canvas.beginPath();
		canvas.rect(cwh(player2.x - PLAYER_SIZE / 2 * player2.width) + os.x,
			cwh(drawY - PLAYER_SIZE * player2.height) + os.y,
			cwh(PLAYER_SIZE * player2.width),
			cwh(PLAYER_SIZE * player2.height));
		canvas.fillStyle = "rgba(" + player2.redFill + ", " + player2.greenFill + ", " + player2.blueFill + ", " + player2.alpha + ")";
		canvas.fill();
		
		// outline
		canvas.beginPath();
		canvas.rect(cwh(player2.x - PLAYER_SIZE / 2 * player2.width) + os.x, cwh(drawY - PLAYER_SIZE * player2.height) + os.y, cwh(OUTLINE_SIZE * player2.width), cwh(PLAYER_SIZE * player2.height)); // left
		canvas.rect(cwh(player2.x - PLAYER_SIZE / 2 * player2.width) + os.x, cwh(drawY - PLAYER_SIZE * player2.height) + os.y, cwh(PLAYER_SIZE * player2.width), cwh(OUTLINE_SIZE * player2.height)); // top
		canvas.rect(cwh(player2.x + PLAYER_SIZE / 2 * player2.width - OUTLINE_SIZE * player2.width) + os.x, cwh(drawY - PLAYER_SIZE * player2.height) + os.y, cwh(OUTLINE_SIZE * player2.width), cwh(PLAYER_SIZE * player2.height)); // right
		canvas.rect(cwh(player2.x - PLAYER_SIZE / 2 * player2.width) + os.x, cwh(drawY - OUTLINE_SIZE * player2.height) + os.y, cwh(PLAYER_SIZE * player2.width), cwh(OUTLINE_SIZE * player2.height)); // bottom
		canvas.fillStyle = "rgba(" + player2.redOutline + ", " + player2.greenOutline + ", " + player2.blueOutline + ", " + player2.alpha + ")";
		canvas.fill();
		
		// fill
		canvas.beginPath();
		canvas.rect(cwh(player2.x - PLAYER_SIZE / 2 * player2.width + OUTLINE_SIZE * player2.width) + os.x,
			cwh(drawY - PLAYER_SIZE * player2.height + OUTLINE_SIZE * player2.height) + os.y,
			cwh(PLAYER_SIZE * player2.width - OUTLINE_SIZE * 2 * player2.width),
			cwh(PLAYER_SIZE * player2.height - OUTLINE_SIZE * 2 * player2.height));
		canvas.fillStyle = "rgba(" + player2.redFill + ", " + player2.greenFill + ", " + player2.blueFill + ", " + player2.alpha + ")";
		canvas.fill();
	}
}

function player2AtCheck(fall, bounce) {

	if (fall == null) {
		fall = false;
	} if (bounce == null) {
		bounce = false;
	}

	if (state == "game") {
		var checkWidth = checkpoints[level][curCheck][2] * TILE_SIZE;
		var checkHeight = checkpoints[level][curCheck][3] * TILE_SIZE;
		player2.x = Math.ceil(checkpoints[level][curCheck][0] * TILE_SIZE + checkWidth / 2);
		player2.y = Math.ceil(checkpoints[level][curCheck][1] * TILE_SIZE + checkHeight / 2 + PLAYER_SIZE / 2);
		invincible = false;
		
		if (fall)
			player2.alpha = 1;
			
		if (bouncingEnabled) {
			if (fall) {
				player2.bouncing = true;
				player2.bounceState = 0;
				player2.bounceTarget = player2.y;
				player2.bounceY = player2.bounceTarget + bounce_0_y_start;
	
				bounce_0_y_speed = bounce_0_y_speed_reset;
				bounce_0_width_speed = bounce_0_width_speed_reset;
				bounce_0_height_speed = bounce_0_height_speed;
	
			} else if (bounce) {
				player2.bouncing = true;
				player2.bounceState = 4;
				player2.bounceY = player2.y;
				player2.bounceTarget = player2.bounceY;
	
				bounce_4_size_speed = bounce_4_size_speed_reset;
			}
		}
	}
}

function player2Bounce() {
	if (state == "game" && player2.bouncing && bouncingEnabled) {
		
		// fall
		if (player2.bounceState == 0) {
			if (player2.bounceY < player2.bounceTarget) {
				bounce_0_y_speed += bounce_0_y_accel;
				bounce_0_width_speed += bounce_0_width_accel;
				bounce_0_height_speed += bounce_0_height_accel;
				
				if (bounce_0_y_speed > bounce_0_y_speed_max)
					bounce_0_y_speed = bounce_0_y_speed_max;
				if (bounce_0_width_speed > bounce_0_width_speed_max)
					bounce_0_width_speed = bounce_0_width_speed_max;
				if (bounce_0_height_speed > bounce_0_height_speed_max)
					bounce_0_height_speed = bounce_0_height_speed_max;

				player2.bounceY += bounce_0_y_speed;
				player2.width -= bounce_0_width_speed;
				player2.height += bounce_0_height_speed;

				player2LimitSize();
			}
			if (player2.bounceY >= player2.bounceTarget) {
				player2.bounceY = player2.bounceTarget;
				player2.width = player2_size_min;
				player2.height = player2_size_max;

				bounce_1_size_speed = bounce_1_size_speed_reset;

				player2.bounceState = 1;
				
				playSFX(sfx_bounce0);
			}
		}

		// squish after fall
		else if (player2.bounceState == 1) {
			if (player2.width < player2_size_max)
				player2.width += bounce_1_size_speed;
			if (player2.height > player2_size_min)
				player2.height -= bounce_1_size_speed;
			
			bounce_1_size_speed -= bounce_1_size_decel;

			if (bounce_1_size_speed < bounce_1_size_speed_min)
				bounce_1_size_speed = bounce_1_size_speed_min;

			player2LimitSize();

			if (player2.width >= player2_size_max && player2.height <= player2_size_min) {
				player2.width = player2_size_max;
				player2.height = player2_size_min;
				bounce_2_size_speed = bounce_2_size_speed_reset;
				player2.bounceState = 2;
			}
		}
		
		// stretch after squish
		else if (player2.bounceState == 2) {
			if (player2.width > player2_size_min)
				player2.width -= bounce_2_size_speed;
			if (player2.height < player2_size_max)
				player2.height += bounce_2_size_speed;
			
			bounce_2_size_speed += bounce_2_size_accel;

			if (bounce_2_size_speed > bounce_2_size_speed_max)
				bounce_2_size_speed = bounce_2_size_speed_max;

			player2LimitSize();

			if (player2.width <= player2_size_min && player2.height >= player2_size_max) {
				player2.width = player2_size_min;
				player2.height = player2_size_max;

				bounce_3_stage = bounce_3_stage_reset;
				bounce_3_y_speed = bounce_3_y_speed_reset;
				bounce_3_width_speed = bounce_3_width_speed_reset;
				bounce_3_height_speed = bounce_3_height_speed_reset;
				player2.bounceState = 3;
			}
		}

		// big bounce
		else if (player2.bounceState == 3) {
			// go 1/2 up
			if (bounce_3_stage == 0) {
				bounce_3_y_speed -= bounce_3_y_accel;
				bounce_3_width_speed += bounce_3_width_accel;
				bounce_3_height_speed -= bounce_3_height_accel;

				player2.bounceY += bounce_3_y_speed;
				player2.width += bounce_3_width_speed;
				player2.height += bounce_3_height_speed;

				player2LimitSize();

				if (bounce_3_y_speed < bounce_3_y_speed_max) {
					bounce_3_y_speed = bounce_3_y_speed_max;
					bounce_3_stage = 1;
				}
			}
			// go 2/2 up
			else if (bounce_3_stage == 1) {
				bounce_3_y_speed += bounce_3_y_accel;
				bounce_3_width_speed -= bounce_3_width_accel;
				bounce_3_height_speed += bounce_3_height_accel;

				player2.bounceY += bounce_3_y_speed;
				player2.width += bounce_3_width_speed;
				player2.height += bounce_3_height_speed;

				player2LimitSize();

				if (bounce_3_y_speed >= 0) {
					bounce_3_stage = 2;
				}
			}
			// go down
			else if (bounce_3_stage == 2) {
				bounce_3_y_speed += bounce_3_y_accel;
				bounce_3_width_speed += bounce_3_width_accel / 2;
				bounce_3_height_speed -= bounce_3_height_accel / 2;

				player2.bounceY += bounce_3_y_speed;

				if (bounce_3_width_speed < 0)
					player2.width += bounce_3_width_speed / 2;
				else
					player2.width -= bounce_3_width_speed / 2;
				if (bounce_3_height_speed > 0)
					player2.height += bounce_3_height_speed / 2;
				else
					player2.height -= bounce_3_height_speed / 2;
					
				player2LimitSize();

				if (player2.bounceY >= player2.bounceTarget) {
					player2.bounceY = player2.bounceTarget;
					bounce_4_size_speed = bounce_4_size_speed_reset;

					player2.bounceState = 4;
				
					playSFX(sfx_bounce1);
				}
			}
		}
		
		// squish after big bounce
		else if (player2.bounceState == 4) {
			if (player2.width < player2_size_max_less)
				player2.width += bounce_4_size_speed;
			if (player2.height > player2_size_min_less)
				player2.height -= bounce_4_size_speed;
			
			bounce_4_size_speed -= bounce_4_size_decel;

			if (bounce_4_size_speed < bounce_4_size_speed_min)
				bounce_4_size_speed = bounce_4_size_speed_min;

			player2LimitSizeLess();

			if (player2.width >= player2_size_max_less && player2.height <= player2_size_min_less) {
				player2.width = player2_size_max_less;
				player2.height = player2_size_min_less;
				bounce_5_size_speed = bounce_5_size_speed_reset;
				player2.bounceState = 5;
			}
		}
		
		// stretch after squish
		else if (player2.bounceState == 5) {
			if (player2.width > player2_size_min_less)
				player2.width -= bounce_5_size_speed;
			if (player2.height < player2_size_max_less)
				player2.height += bounce_5_size_speed;
			
			bounce_5_size_speed += bounce_5_size_accel;

			if (bounce_5_size_speed > bounce_5_size_speed_max)
				bounce_5_size_speed = bounce_5_size_speed_max;

			player2LimitSizeLess();

			if (player2.width <= player2_size_min_less && player2.height >= player2_size_max_less) {
				player2.width = player2_size_min_less;
				player2.height = player2_size_max_less;

				bounce_6_stage = bounce_6_stage_reset;
				bounce_6_y_speed = bounce_6_y_speed_reset;
				bounce_6_width_speed = bounce_6_width_speed_reset;
				bounce_6_height_speed = bounce_6_height_speed_reset;
				player2.bounceState = 6;
			}
		}

		// small bounce
		else if (player2.bounceState == 6) {
			// go 1/2 up
			if (bounce_6_stage == 0) {
				bounce_6_y_speed -= bounce_6_y_accel;
				bounce_6_width_speed += bounce_6_width_accel;
				bounce_6_height_speed -= bounce_6_height_accel;

				player2.bounceY += bounce_6_y_speed;
				player2.width += bounce_6_width_speed;
				player2.height += bounce_6_height_speed;

				player2LimitSize();

				if (bounce_6_y_speed < bounce_6_y_speed_max) {
					bounce_6_y_speed = bounce_6_y_speed_max;
					bounce_6_stage = 1;
				}
			}
			// go 2/2 up
			else if (bounce_6_stage == 1) {
				bounce_6_y_speed += bounce_6_y_accel;
				bounce_6_width_speed -= bounce_6_width_accel;
				bounce_6_height_speed += bounce_6_height_accel;

				player2.bounceY += bounce_6_y_speed;
				player2.width += bounce_6_width_speed;
				player2.height += bounce_6_height_speed;

				player2LimitSize();

				if (bounce_6_y_speed >= 0) {
					bounce_6_stage = 2;
				}
			}
			// go down
			else if (bounce_6_stage == 2) {
				bounce_6_y_speed += bounce_6_y_accel;
				bounce_6_width_speed -= bounce_6_width_accel;
				bounce_6_height_speed += bounce_6_height_accel;

				player2.bounceY += bounce_6_y_speed;
				player2.width += bounce_6_width_speed / 4;
				player2.height += bounce_6_height_speed / 4;
				player2LimitSizeLess();

				if (player2.bounceY >= player2.bounceTarget) {
					player2.bounceY = player2.bounceTarget;
					bounce_7_size_speed = bounce_7_size_speed_reset;

					player2.bounceState = 7;
				}
			}
		}

		// squish after big bounce
		else if (player2.bounceState == 7) {
			if (player2.width < player2_size_max_less2)
				player2.width += bounce_7_size_speed;
			if (player2.height > player2_size_min_less2)
				player2.height -= bounce_7_size_speed;
			
			bounce_7_size_speed -= bounce_7_size_decel;

			if (bounce_7_size_speed < bounce_7_size_speed_min)
				bounce_7_size_speed = bounce_7_size_speed_min;

			player2LimitSizeLess2();

			if (player2.width >= player2_size_max_less2 && player2.height <= player2_size_min_less2) {
				player2.width = player2_size_max_less2;
				player2.height = player2_size_min_less2;
				bounce_8_size_speed = bounce_8_size_speed_reset;
				player2.bounceState = 8;
			}
		}
		
		// stretch after squish
		else if (player2.bounceState == 8) {
			if (player2.width > 1)
				player2.width -= bounce_8_size_speed;
			if (player2.height < 1)
				player2.height += bounce_8_size_speed;
			
			bounce_8_size_speed += bounce_8_size_accel;

			if (bounce_8_size_speed > bounce_8_size_speed_max)
				bounce_8_size_speed = bounce_8_size_speed_max;

			/*
			if (player2.width < 1)
				player2.width = 1;
			if (player2.height < 1)
				player2.height = 1;
			*/

			if (player2.width <= 1 && player2.height >= 1) {
				player2.width = 1;
				player2.height = 1;
				player2.bounceState = null;
				player2.bouncing = false;
			}
		}
	}
}

// limit functions (for easier bounce animation)
function player2LimitSize() {
	if (player2.width < player2_size_min)
		player2.width = player2_size_min;
	if (player2.width > player2_size_max)
		player2.width = player2_size_max;
	if (player2.height < player2_size_min)
		player2.height = player2_size_min;
	if (player2.height > player2_size_max)
		player2.height = player2_size_max;
}

function player2LimitSizeLess() {
	if (player2.width < player2_size_min_less)
		player2.width = player2_size_min_less;
	if (player2.width > player2_size_max_less)
		player2.width = player2_size_max_less;
	if (player2.height < player2_size_min_less)
		player2.height = player2_size_min_less;
	if (player2.height > player2_size_max_less)
		player2.height = player2_size_max_less;
}

function player2LimitSizeLess2() {
	if (player2.width < player2_size_min_less2)
		player2.width = player2_size_min_less2;
	if (player2.width > player2_size_max_less2)
		player2.width = player2_size_max_less2;
	if (player2.height < player2_size_min_less2)
		player2.height = player2_size_min_less2;
	if (player2.height > player2_size_max_less2)
		player2.height = player2_size_max_less2;
}

function updatePlayer2Rainbow() {
	if (player2.color == PLAYER_FILL_COLORS.length) {
		var redFill_0 = PLAYER_FILL_COLORS[player2.rainbowUnder][0];
		var redFill_1 = PLAYER_FILL_COLORS[player2.rainbowOver][0];
		var greenFill_0 = PLAYER_FILL_COLORS[player2.rainbowUnder][1];
		var greenFill_1 = PLAYER_FILL_COLORS[player2.rainbowOver][1];
		var blueFill_0 = PLAYER_FILL_COLORS[player2.rainbowUnder][2];
		var blueFill_1 = PLAYER_FILL_COLORS[player2.rainbowOver][2];
		var redOutline_0 = PLAYER_OUTLINE_COLORS[player2.rainbowUnder][0];
		var redOutline_1 = PLAYER_OUTLINE_COLORS[player2.rainbowOver][0];
		var greenOutline_0 = PLAYER_OUTLINE_COLORS[player2.rainbowUnder][1];
		var greenOutline_1 = PLAYER_OUTLINE_COLORS[player2.rainbowOver][1];
		var blueOutline_0 = PLAYER_OUTLINE_COLORS[player2.rainbowUnder][2];
		var blueOutline_1 = PLAYER_OUTLINE_COLORS[player2.rainbowOver][2];
		
		var redFillDif      = Math.abs(redFill_1      - redFill_0);
		var redOutlineDif   = Math.abs(redOutline_1   - redOutline_0);
		var greenFillDif    = Math.abs(greenFill_1    - greenFill_0);
		var greenOutlineDif = Math.abs(greenOutline_1 - greenOutline_0);
		var blueFillDif     = Math.abs(blueFill_1     - blueFill_0);
		var blueOutlineDif  = Math.abs(blueOutline_1  - blueOutline_0);
		
		if (player2.rainbowPercent < 1) {
			player2.rainbowPercent += RAINBOW_SPEED;
			if (player2.rainbowPercent > 1)
				player2.rainbowPercent = 1;
			
			// red
			if (redFill_0 > redFill_1) {
				player2.redFill    = Math.floor(redFill_0    - redFillDif    * player2.rainbowPercent);
			} else if (redFill_0 < redFill_1) {
				player2.redFill    = Math.floor(redFill_0    + redFillDif    * player2.rainbowPercent);
			}
			if (redOutline_0 > redOutline_1) {
				player2.redOutline = Math.floor(redOutline_0 - redOutlineDif * player2.rainbowPercent);
			} else if (redOutline_0 < redOutline_1) {
				player2.redOutline = Math.floor(redOutline_0 + redOutlineDif * player2.rainbowPercent);
			}
			
			// green
			if (greenFill_0 > greenFill_1) {
				player2.greenFill    = Math.floor(greenFill_0    - greenFillDif    * player2.rainbowPercent);
			} else if (greenFill_0 < greenFill_1) {
				player2.greenFill    = Math.floor(greenFill_0    + greenFillDif    * player2.rainbowPercent);
			}
			if (greenOutline_0 > greenOutline_1) {
				player2.greenOutline = Math.floor(greenOutline_0 - greenOutlineDif * player2.rainbowPercent);
			} else if (greenOutline_0 < greenOutline_1) {
				player2.greenOutline = Math.floor(greenOutline_0 + greenOutlineDif * player2.rainbowPercent);
			}
			
			// blue
			if (blueFill_0 > blueFill_1) {
				player2.blueFill    = Math.floor(blueFill_0    - blueFillDif    * player2.rainbowPercent);
			} else if (blueFill_0 < blueFill_1) {
				player2.blueFill    = Math.floor(blueFill_0    + blueFillDif    * player2.rainbowPercent);
			}
			if (blueOutline_0 > blueOutline_1) {
				player2.blueOutline = Math.floor(blueOutline_0 - blueOutlineDif * player2.rainbowPercent);
			} else if (blueOutline_0 < blueOutline_1) {
				player2.blueOutline = Math.floor(blueOutline_0 + blueOutlineDif * player2.rainbowPercent);
			}
		} else {
			player2.rainbowPercent = 0;
			player2.redFill      = redFill_1;
			player2.redOutline   = redOutline_1;
			player2.greenFill    = greenFill_1;
			player2.greenOutline = greenOutline_1;
			player2.blueFill     = blueFill_1;
			player2.blueOutline  = blueOutline_1;
			player2.rainbowUnder = player2.rainbowOver;
			player2.rainbowOver++;
			if (player2.rainbowOver == PLAYER_FILL_COLORS.length)
				player2.rainbowOver = 0;
		}
	}
}


