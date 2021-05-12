let map, player;
let boxSize = 50;

// load the componets
function preload() {
	map = new GameMap("Mapa", 29, 35, boxSize, "assets/map.json");
	player = new Player("Pepito");
}

function setup() {
	createCanvas(30 * boxSize, 20 * boxSize);
	map.setup(); // Creates the maps image
	map.setPlayer(player, 14, 6);
	player.addControler(player);
}

function draw() {
	// map.drawGrid();
	map.draw();
	fill(color('red'));
	rect(player.x * boxSize, player.y * boxSize, boxSize, boxSize);
}

function keyPressed() {
	player.controler.keyPressed();
}

function windowResized() {
	map.windowResized();
}