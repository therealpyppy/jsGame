import { colorRGBA, Rect, Draw, Triangle, Key, Circle, Fill, Vector2} from './scripts/e.js';

let run = true
let testRect = new Rect(new Vector2(300, 200), new Vector2(40, 40), new colorRGBA(255, 0, 0, 0), 0)
let testCircle = new Circle(new Vector2(350, 200), 40, new colorRGBA(255, 0, 0, 0), 0)
let testTriangle = new Triangle(new Vector2(400, 200), new Vector2(40, 40), new colorRGBA(255, 0, 0, 0), 0)
let key = new Key

function input(){
	let keys = key.get_pressed()

	if (keys['s']) {
		testRect.position.y += 5
	}
	if (keys['w']) {
		testRect.position.y -= 5
	}
	if (keys['d']) {
		testRect.position.x += 5
	}
	if (keys['a']) {
		testRect.position.x -= 5
	}
	if (keys['q']) {
		testRect.rotation -= 5
	}
	if (keys['e']) {
		testRect.rotation += 5
	}

	if (keys['g']) {
		testCircle.position.y += 5
	}
	if (keys['t']) {
		testCircle.position.y -= 5
	}
	if (keys['h']) {
		testCircle.position.x += 5
	}
	if (keys['f']) {
		testCircle.position.x -= 5
	}
	if (keys['r']) {
		testCircle.rotation -= 5
	}
	if (keys['y']) {
		testCircle.rotation += 5
	}

	if (keys['k']) {
		testTriangle.position.y += 5
	}
	if (keys['i']) {
		testTriangle.position.y -= 5
	}
	if (keys['l']) {
		testTriangle.position.x += 5
	}
	if (keys['j']) {
		testTriangle.position.x -= 5
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
Draw(testTriangle)
Draw(testCircle)
Draw(testRect)