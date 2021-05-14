let map, player, bag, demon, enemieImg, enemies = [];
let boxSize = 50, missionControl, missionTimer, missionPuntos, time = 60;

// load the componets
function preload() {
	map = new GameMap("Mapa", 29, 35, boxSize, "assets/map.json");
	player = new Player("Pepito", boxSize, null, map);
	bag = new Bag("assets/bag.json", player);
	enemieImg = null;
}

function setup() {
	let canvas = createCanvas(30 * boxSize, 20 * boxSize);
	canvas.parent('canvas-container');
	frameRate(5);

	map.setup(); // Creates the maps image
	bag.setup();
	map.setPlayer(player, 14, 4);

	enemies.push(new Enemy("Villano", boxSize, enemieImg, map, player));

	missionControl = select("#mision-control");
	missionTimer = select("#timer");
	missionPuntos = select("#point");
}

function draw() {
	map.draw();
	player.draw();
	missionTimer.html("Tiempo: " + time);
	missionPuntos.html("Puntos: " + player.points);

	for (let enemy of enemies) {
		enemy.move();
		enemy.draw();
	}
	time--
	if (player.y == 34) upLevel();
	if (time == 0) {
		player.kill();
		time = 60;
	} if (time < 10) {
		missionControl.style("color: red");
	} else {
		missionControl.style("color: black");
	}
}

function upLevel() {
	player.points = player.points + 10;
	player.setPosition(14, 4);
	map.windowResized();
	enemies.push(new Enemy("Villano", boxSize, enemieImg, map, player));
	time = 60;
	alert("Has subido de nivel! ganas 10 puntos mas. Numero de enemigos: " + enemies.length);
}

function keyPressed() {
	player.controler.keyPressed();
}

function windowResized() {
	map.windowResized();
}