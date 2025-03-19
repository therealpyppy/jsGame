import { colorRGBA, Rect, Draw, Triangle, Key, Circle, Fill, Vector2} from '../scripts/e.js';

class Player {
	constructor(drag, maxSpeed, acceleration, rotateSpeed, spawnLocation = new Vector2(0, 0), size = new Vector2(40, 40), fillColor = new colorRGBA(255, 0, 0, 0)){
		this.drag = drag;
		this.speed = 0;
		this.maxSpeed = maxSpeed;
		this.acceleration = acceleration;
		this.rotateSpeed = rotateSpeed;
		this.moving = false;
		this.direction = new Vector2(0, 1);
		this.model = new Triangle(spawnLocation, size, fillColor, 0);
	}

	rotationToVector(degrees) {
		let radians = degrees * (Math.PI / 180);
		return {
			x: Math.sin(radians),
			y: -Math.cos(radians)
		};
	}
}

let run = true;
let inputs = new Key;
let windowSize = new Vector2(document.querySelector(".container").clientWidth, document.querySelector(".container").clientHeight);
let player = new Player(0.05, 5, 0.05, 2, new Vector2(windowSize.x/2, windowSize.y/2 - 20));

let lastTime = performance.now();

function update() {
    let now = performance.now();
    let deltaTime = (now - lastTime) / 16.67;
    lastTime = now;

    let keys = inputs.get_pressed();

    if (keys['w'] && player.speed < player.maxSpeed) {
        player.speed += player.acceleration * deltaTime;
        player.moving = true;
    } else {
        player.moving = false;
    }

    if (keys['q'] || keys['a']){ player.model.rotation -= player.rotateSpeed * deltaTime;}
    if (keys['e'] || keys['d']){ player.model.rotation += player.rotateSpeed * deltaTime;}

    let vectorDirection = player.rotationToVector(player.model.rotation);
    player.model.position.addVector(
        vectorDirection.x * player.speed * deltaTime,
        vectorDirection.y * player.speed * deltaTime
    );

    if (!player.moving) {
        player.speed -= player.drag * deltaTime;
        if (player.speed < 0) player.speed = 0;
    }

    if (player.model.position.y > windowSize.y + (player.model.size.y - 5)) {
        player.model.position.y = 0 - (player.model.size.y - 5);
    }
    if (player.model.position.y < 0 - (player.model.size.y - 5)) {
        player.model.position.y += windowSize.y + (player.model.size.y - 5);
    }
    if (player.model.position.x > windowSize.x + (player.model.size.x - 5)) {
        player.model.position.x = 0 - (player.model.size.x - 5);
    }
    if (player.model.position.x < 0 - (player.model.size.x - 5)) {
        player.model.position.x += windowSize.x + (player.model.size.x - 5);
    }

    //console.log(player);
}


function render(){
	Fill(new colorRGBA())
	Draw(player.model)
}

function gameLoop(){
	if (run) {
		update()
		render()
		setTimeout(gameLoop, 1);
	}
}

if (run){
	gameLoop()
}