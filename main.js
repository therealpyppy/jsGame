import { colorRGBA, Rect, Draw, Triangle, Key, Circle, Fill} from './e.js';

let run = true
let testRect = new Rect(300, 200, 40, 40, new colorRGBA(255, 0, 0, 0))
let testCircle = new Circle(350, 200, 40, new colorRGBA(255, 0, 0, 0))
let testTriangle = new Triangle(400, 200, 40, 40, new colorRGBA(255, 0, 0, 0))
let key = new Key

function input(){
	let keys = key.get_pressed()

	// Rect
	if (keys['s']) {
		testRect.pY += 5
	}
	if (keys['w']) {
		testRect.pY -= 5
	}
	if (keys['d']) {
		testRect.pX += 5
	}
	if (keys['a']) {
		testRect.pX -= 5
	}
	if (keys['q']) {
		testRect.rotation -= 5
	}
	if (keys['e']) {
		testRect.rotation += 5
	}

	// Circle
	if (keys['g']) {
		testCircle.pY += 5
	}
	if (keys['t']) {
		testCircle.pY -= 5
	}
	if (keys['h']) {
		testCircle.pX += 5
	}
	if (keys['f']) {
		testCircle.pX -= 5
	}
	if (keys['r']) {
		testCircle.rotation -= 5
	}
	if (keys['y']) {
		testCircle.rotation += 5
	}

	// Triangle
	if (keys['k']) {
		testTriangle.pY += 5
	}
	if (keys['i']) {
		testTriangle.pY -= 5
	}
	if (keys['l']) {
		testTriangle.pX += 5
	}
	if (keys['j']) {
		testTriangle.pX -= 5
	}
	if (keys['u']) {
		testTriangle.rotation -= 5
	}
	if (keys['o']) {
		testTriangle.rotation += 5
	}
}

function render(){
	Fill(new colorRGBA())
	Draw(testRect)
	Draw(testCircle)
	Draw(testTriangle)
}

function gameLoop(){
	if (run) {
		input()
		render()
		setTimeout(gameLoop, 1);
	}
}

if (run){
	gameLoop()
}


Fill(new colorRGBA())