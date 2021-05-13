let map, player, bag, missionControl;
let boxSize = 50;

// load the componets
function preload() {
	map = new GameMap("Mapa", 29, 35, boxSize, "assets/map.json");
	player = new Player("Pepito", boxSize, null);
	bag = new Bag("assets/bag.json", player);
}

function setup() {
	let canvas = createCanvas(30 * boxSize, 20 * boxSize);
	canvas.parent('canvas-container');

	map.setup(); // Creates the maps image
	bag.setup();

	map.setPlayer(player, 14, 4);
	player.addControler(player);

	missionControl = select("#mision-control");
	missionControl.html("Puntos: " + player.points);
}

function draw() {
	map.draw();
	player.draw();
}

function keyPressed() {
	player.controler.keyPressed();
}

function windowResized() {
	map.windowResized();
}