import { colorRGBA, Rect, Draw, Triangle, Polygon, Key, Circle, Fill, Vector2} from './scripts/e.js';

let run = true
let key = new Key

let testRect = new Rect(new Vector2(300, 200), new Vector2(40, 40), new colorRGBA(255, 0, 0, 0), 0)
let testCircle = new Circle(new Vector2(350, 200), 40, new colorRGBA(255, 0, 0, 0), 0)
let testTriangle = new Triangle(new Vector2(400, 200), new Vector2(40, 40), new colorRGBA(255, 0, 0, 0), 0)
let polyPoints = [
    new Vector2(0, 40),
    new Vector2(90, 40),
    new Vector2(70, 0),
    new Vector2(20, 0),
];
let testPoly = new Polygon(new Vector2(450, 200), polyPoints, new colorRGBA(255, 0, 0, 0), 0)


let objects = [testRect, testCircle, testTriangle, testPoly]
let currentObj = testRect

let lastSwitchTime = 0;
let cooldownDuration = 300;

function input() {
    let keys = key.get_pressed();
    let currentTime = Date.now();

    if (keys['w']) {
        currentObj.position.y -= 5;
    }
    if (keys['a']) {
        currentObj.position.x -= 5;
    }
    if (keys['s']) {
        currentObj.position.y += 5;
    }
    if (keys['d']) {
        currentObj.position.x += 5;
    }
    if (keys['q']) {
        currentObj.rotation -= 5;
    } else if (keys['e']) {
        currentObj.rotation += 5;
    }
    if (keys['r'] && currentTime - lastSwitchTime >= cooldownDuration) {
        let index = (objects.indexOf(currentObj) + 1) % objects.length;
        currentObj = objects[index];
        lastSwitchTime = currentTime;
    } else if (keys['f'] && currentTime - lastSwitchTime >= cooldownDuration) {
        let index = (objects.indexOf(currentObj) - 1 + objects.length) % objects.length;
        currentObj = objects[index];
        lastSwitchTime = currentTime;
    }
}


function render(){
	Fill(new colorRGBA())
	Draw(testRect)
	Draw(testCircle)
	Draw(testTriangle)
	Draw(testPoly)
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
Draw(testPoly)