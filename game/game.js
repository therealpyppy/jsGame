import { colorRGBA, Rect, Draw, Triangle, Key, Circle, Fill, Vector2, Polygon } from '../scripts/e.js';

class Asteroid {
	getShape(size = "Large") {
		switch (size) {
			case "Large":
				return [
					new Vector2(47, 0),
					new Vector2(60, 5),
					new Vector2(68, 13),
					new Vector2(81, 21),
					new Vector2(90, 36),
					new Vector2(92, 45),
					new Vector2(82, 60),
					new Vector2(72, 71),
					new Vector2(60, 77),
					new Vector2(52, 84),
					new Vector2(47, 86),
					new Vector2(42, 82),
					new Vector2(30, 80),
					new Vector2(25, 75),
					new Vector2(19, 74),
					new Vector2(10, 64),
					new Vector2(4, 50),
					new Vector2(0, 45),
					new Vector2(4, 35),
					new Vector2(13, 28),
					new Vector2(16, 23),
					new Vector2(28, 16),
					new Vector2(31, 10),
					new Vector2(34, 4),
				];
			case "Medium":
				return [
					new Vector2(18, 0),
					new Vector2(24, 2),
					new Vector2(29, 7),
					new Vector2(37, 16),
					new Vector2(42, 22),
					new Vector2(41, 29),
					new Vector2(36, 35),
					new Vector2(30, 39),
					new Vector2(23, 37),
					new Vector2(21, 34),
					new Vector2(6, 33),
					new Vector2(0, 21),
					new Vector2(3, 16),
					new Vector2(9, 10),
					new Vector2(14, 3)
				];
			case "Small":
				console.log("There is no vector sheet set for a [size small] astroid");
				break;
			default:
				break;
		}
	}
	
	constructor(size = "Large", position = new Vector2(0, 0), speed = 0, color = new colorRGBA(), rotation = 0, rotationSpeed = 0) {
		this.size = size;
		this.speed = speed;
		this.position = position;
		this.fillColor = color;
		this.rotation = rotation;
		this.rotateSpeed = rotationSpeed;
		
		this.model = new Polygon(this.position, this.getShape(this.size), this.fillColor, this.rotation);
	}
}

class AstroidHandler {
	constructor() {
		this.astroids = [];
	}

	spawnAstroid(size, position, speed, color, rotation, rotationSpeed) {
		this.astroids.push(new Asteroid(size, position, speed, color, rotation, rotationSpeed));
	}
}

class Bullet {
	constructor(bulletSpeed, bulletLifetime, bulletCreationTime, rotationAngleVector, position = new Vector2(0, 0)) {
		this.bulletSpeed = bulletSpeed;
		this.bulletLifetime = bulletLifetime;
		this.rotationAngleVector = rotationAngleVector;
		this.position = position;
		this.bulletCreationTime = bulletCreationTime;
		this.model = new Rect(position, new Vector2(3, 3), new colorRGBA(0, 4, 73, 0));
	}
}

class Player {
	constructor(drag, maxSpeed, acceleration, rotateSpeed, spawnLocation = new Vector2(0, 0), size = new Vector2(40, 40), fillColor = new colorRGBA(255, 0, 0, 0)) {
		this.drag = drag;
		this.speed = 0;
		this.maxSpeed = maxSpeed;
		this.acceleration = acceleration;
		this.rotateSpeed = rotateSpeed;
		this.moving = false;
		this.direction = new Vector2(0, 1);
		this.model = new Triangle(spawnLocation, size, fillColor, 0);
		
		this.bullets = [];
		this.shootCooldown = 500;
		this.lastShot = 0;
		
		this.level = 1;
	}
	
	getPoints(point){
		let centerX = this.model.position.x + this.model.size.x / 2;
		let centerY = this.model.position.y + this.model.size.y / 2;

		let offsetY = this.model.size.y / 2;
		
		switch (point){
			case "left":
				let leftOffsetX = -this.model.size.x / 2;
				let leftX = centerX + leftOffsetX * Math.cos(this.model.rotation * (Math.PI / 180)) - offsetY * Math.sin(this.model.rotation * (Math.PI / 180)) - 5 / 2;
				let leftY = centerY + offsetY * Math.sin(this.model.rotation * (Math.PI / 180)) + offsetY * Math.cos(this.model.rotation * (Math.PI / 180)) - 5 / 2;
				return new Vector2(leftX, leftY);

			case "right":
				let rightOffsetX = this.model.size.x / 2;
				let rightX = centerX + rightOffsetX * Math.cos(this.model.rotation * (Math.PI / 180)) - offsetY * Math.sin(this.model.rotation * (Math.PI / 180)) - 5 / 2;
				let rightY = centerY + offsetY * Math.sin(this.model.rotation * (Math.PI / 180)) + offsetY * Math.cos(this.model.rotation * (Math.PI / 180)) - 5 / 2;
				return new Vector2(rightX, rightY);

			case "tip":
				let tipDistance = this.model.size.y / 2;
				let tipX = (this.model.position.x + this.model.size.x / 2 + Math.sin(this.model.rotation * (Math.PI / 180)) * tipDistance) - 5 / 2;
				let tipY = (this.model.position.y + this.model.size.y / 2 + -Math.cos(this.model.rotation * (Math.PI / 180)) * tipDistance) - 5 / 2;
				return new Vector2(tipX, tipY);

			default:
				console.log("Point not specified");
				return new Vector2();
		}
	}

	shoot() {
		this.bullets.push(new Bullet(5, 1000, performance.now(),
		this.rotationToVector(this.model.rotation),
		this.getPoints('tip')
	));
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
let inputs = new Key();
let windowSize = new Vector2(document.querySelector("html").clientWidth, document.querySelector("html").clientHeight);
let player = new Player(0.05, 5, 0.05, 2, new Vector2(windowSize.x / 2, windowSize.y / 2 - 20));

let astroidHandler = new AstroidHandler()

let lastTime = performance.now();

function update() {
	let now = performance.now();
	let deltaTime = (now - lastTime) / 16.67;
	lastTime = now;
	
	let keys = inputs.get_pressed();
	
	// Inputs
	// player movement & add speed
	if (keys['w'] && player.speed < player.maxSpeed) {
		player.speed += player.acceleration * deltaTime;
		player.moving = true;
	} else {
		player.moving = false;
	}
	
	if (keys['q'] || keys['a']) { player.model.rotation -= player.rotateSpeed * deltaTime; }
	if (keys['e'] || keys['d']) { player.model.rotation += player.rotateSpeed * deltaTime; }
	
	if ((keys[' '] || keys['Space']) && now - player.lastShot >= player.shootCooldown) {
		player.lastShot = now;
		player.shoot();
	}
	
	// player position
	let vectorDirection = player.rotationToVector(player.model.rotation);
	player.model.position.addVector(
		vectorDirection.x * player.speed * deltaTime,
		vectorDirection.y * player.speed * deltaTime
	);
	
	for (let i = player.bullets.length - 1; i >= 0; i--) {
		const bullet = player.bullets[i];
		
		if (now - bullet.bulletCreationTime < bullet.bulletLifetime) {
			bullet.model.position.addVector(
				bullet.rotationAngleVector.x * bullet.bulletSpeed * deltaTime,
				bullet.rotationAngleVector.y * bullet.bulletSpeed * deltaTime
			);
			
			// Wrap bullets that go off screen
			const halfSizeX = bullet.model.size.x / 2;
			const halfSizeY = bullet.model.size.y / 2;
			if (bullet.model.position.y > windowSize.y + halfSizeY) {
				bullet.model.position.y = -halfSizeY;
			} else if (bullet.model.position.y < -halfSizeY) {
				bullet.model.position.y = windowSize.y + halfSizeY;
			}
			
			if (bullet.model.position.x > windowSize.x + halfSizeX) {
				bullet.model.position.x = -halfSizeX;
			} else if (bullet.model.position.x < -halfSizeX) {
				bullet.model.position.x = windowSize.x + halfSizeX;
			}
		} else {
			delete bullet.model;
			player.bullets.splice(i, 1);
		}
	}
	
	// player drag if !moving
	if (!player.moving) {
		player.speed -= player.drag * deltaTime;
		if (player.speed < 0) player.speed = 0;
	}
	
	// TODO: wrap player on window
	let playerPos = player.model.position;
	let playerSize = player.model.size;
	let radians = player.model.rotation * (Math.PI / 180);
	
	let tipDistance = playerSize.y / 2;
	
	let tipX = (playerPos.x + playerSize.x / 2 + Math.sin(radians) * tipDistance);
	let tipY = (playerPos.y + playerSize.y / 2 + -Math.cos(radians) * tipDistance);
	
	// not visible ever but loops player rotation from 360 > 0 and vice versa
	player.model.rotation %= 360;
}

function render() {
	Fill(new colorRGBA());
	Draw(player.model);
	player.bullets.forEach(bullet => {
		Draw(bullet.model);
	});
}

function gameLoop() {
	if (run) {
		update();
		render();
		setTimeout(gameLoop, 1);
	}
}

if (run) {
	gameLoop();
}