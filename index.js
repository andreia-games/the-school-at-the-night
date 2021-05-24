let map, player, bag, enemieImg, enemies = [], winPoint;
let boxSize = 50, time = 500, missionState = true, missionControl, missionTimer, missionPuntos, missionButton;



// load the componets
function preload() {
	map = new GameMap("Mapa", 29, 35, boxSize, "assets/map.json");
	player = new Player("Pepito", boxSize, loadImage("assets/skins/SlightlySmilingFace.png"), map);
	bag = new Bag("assets/bag.json", player);
	winPoint = new WinPoint("Win", boxSize, loadImage("assets/win-point.png"), map, player);

	enemieImg = loadImage("assets/enemy.png");
}

function setup() {
	let canvas = createCanvas(30 * boxSize, 20 * boxSize);
	canvas.parent('canvas-container');
	frameRate(10);

	map.setup(); // Creates the maps image
	bag.setup();
	map.setPlayer(player, 14, 4);

	enemies.push(new Enemy("Villano", boxSize, enemieImg, map, player));

	missionControl = select("#mision-control");
	missionTimer = select("#timer");
	missionPuntos = select("#point");
	missionButton = select('#stop-play');

	missionButton.mousePressed(() => {
		missionState = !missionState;
		player.canMove = !player.canMove;

		if (missionState) missionButton.html('&#10074;&#10074;', false);
		else missionButton.html('&#x23f5;')
	});
}

function draw() {
	map.draw();
	player.draw();
	winPoint.draw();

	missionTimer.html("Tiempo: " + time);
	missionPuntos.html("Puntos: " + player.points);

	for (let enemy of enemies) {
		if (missionState) enemy.move();
		enemy.draw();
	}

	if (missionState) time--

	if (player.x == winPoint.x && player.y == winPoint.y) upLevel();
	

	if (time == 0) {
		player.kill();
		time = 500;
	} else if (time < 10) {
		missionControl.style("color: red");
	} else {
		missionControl.style("color: black");
	}
}

function upLevel() {
	
	player.points = player.points + 10;
	player.setPosition(14, 4);
	winPoint.move();
	map.windowResized();
	
	enemies.push(new Enemy("Villano", boxSize, enemieImg, map, player));
	time = 500;
	alert("Has subido de nivel! ganas 10 puntos mas. Número de enemigos: " + enemies.length);
	
}

function keyPressed() {
	player.controler.keyPressed();
}

function windowResized() {
	map.windowResized();
}