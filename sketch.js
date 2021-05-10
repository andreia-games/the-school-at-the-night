let map;
let player;
let componetsJSON;
let boxSize = 100;

function preload() {
	componetsJSON = loadJSON("assets/map.json");
}

function setup() {
	createCanvas(30 * boxSize, 20 * boxSize);
	map = new GameMap("Mapa", 29, 19, boxSize, componetsJSON);
	player = new Player("Pepito");

	map.setPlayer(player, 3, 6);
	player.addControler(player);
}

function draw() {
	map.drawGrid();

	fill(color('red'));
	rect(player.x * boxSize, player.y * boxSize, boxSize, boxSize);
}

function keyPressed() {
	player.controler.keyPressed();
}

function windowResized() {
	map.windowResized();
}