const GRID_WIDTH = 30; // Numbers {int} of collum of the grid
const GRID_HEIGHT = 20; // Numbers {int} of row of the grid
const BOX_WIDTH = () => 29; // Width size {float} of each box/entry of the grid
const BOX_HEIGHT = () => Math.floor(windowHeight / GRID_HEIGHT); // Height {float} of each box/entry of the grid

let layouts = {}; // The diferents layout, pair {Id, layout intance}
let currentLayout = "school-map";
let player;
let gameConsole;

// Set the data of the diferentes layouts
function preload() {
	player = new DefaultPlayer("a player", 9, 10, 1, 1, "assets/sprites/default.png");

	layouts["school-map"] = new Layout(GRID_WIDTH, GRID_HEIGHT, BOX_WIDTH(), BOX_HEIGHT(), loadJSON("assets/layouts/school-map.json"), color('#5e6e4d'));
}

function setup() {
	createCanvas(GRID_WIDTH * BOX_WIDTH(), GRID_HEIGHT * BOX_HEIGHT());

	// Load the layouts
	layouts["school-map"].setup();

	// Set characters to the layouts
	player.setToLayout(layouts[currentLayout]);
	player.setControler();

	// Set the actions of the diferent events

	player.controler.setAction(
		"school-map", 37, "Key: left Arrow; This function moves to the right the player",
		function () {
			player.move(-1, 0);
		}
	);

	player.controler.setAction(
		"school-map", 38, "key: up Arrow; This function moves up the player",
		function () {
			player.move(0, -1);
		}
	);

	player.controler.setAction(
		"school-map", 39, "key: right Arrow; This function moves left the player",
		function () {
			player.move(1, 0);
		}
	);

	player.controler.setAction(
		"school-map", 40, "ket: down Arrow; This function moves down the player",
		function () {
			player.move(0, 1);
		}
	);
}

function draw() {
	layouts[currentLayout].draw();
	// layouts[currentLayout].drawGridData();
	// layouts[currentLayout].drawGridComponetsData();
}

function keyPressed() {
	player.controler.keyPressed(currentLayout);
}
