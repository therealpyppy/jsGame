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

        this.bullets = [];
        this.shootCooldown = 500;
        this.lastShot = 0;
	}

    shoot() {
        this.bullets.push(new Bullet(5, 1000, performance.now(), this.rotationToVector(this.model.rotation), new Vector2(this.model.position.x, this.model.position.y)));
	}

	rotationToVector(degrees) {
		let radians = degrees * (Math.PI / 180);
		return {
			x: Math.sin(radians),
			y: -Math.cos(radians)
		};
	}
}

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
                ]
            case "Medium":
                break;
            case "Small":
                break;
            default:
                break;
        }
    }

    constructor(size = "Large", position, color, rotation, rotationSpeed) {
        this.size = size;
        this.position = position;
        this.fillColor = color;
        this.rotation = rotation;
        this.rotateSpeed = rotationSpeed;
        
        this.model = new Polygon(this.position, this.getShape(this.size), this.fillColor, this.rotation);
    }
}

class Bullet {
    constructor(bulletSpeed, bulletLifetime, bulletCreationTime, rotationAngleVector, position = new Vector2(0, 0)) {
        this.bulletSpeed = bulletSpeed;
        this.bulletLifetime = bulletLifetime;
        this.rotationAngleVector = rotationAngleVector;
        this.position = position;
        this.bulletCreationTime = bulletCreationTime
        this.model = new Rect(position, new Vector2(3, 3), new colorRGBA(0, 4, 73, 0))
	}
}

let run = true;
let inputs = new Key;
let windowSize = new Vector2(document.querySelector("html").clientWidth, document.querySelector("html").clientHeight);
let player = new Player(0.05, 5, 0.05, 2, new Vector2(windowSize.x/2, windowSize.y/2 - 20));

let lastTime = performance.now();

function update() {
    let now = performance.now();
    let deltaTime = (now - lastTime) / 16.67;
    lastTime = now;

    let keys = inputs.get_pressed();

    // detect player movement & add speed if moving
    if (keys['w'] && player.speed < player.maxSpeed) {
        player.speed += player.acceleration * deltaTime;
        player.moving = true;
    } else {
        player.moving = false;
    }

    // detect and add player rotation
    if (keys['q'] || keys['a']){ player.model.rotation -= player.rotateSpeed * deltaTime;}
    if (keys['e'] || keys['d']){ player.model.rotation += player.rotateSpeed * deltaTime;}

    // detect keypress and shoot
    if ((keys[' '] || keys['Space']) && now - player.lastShot >= player.shootCooldown) { 
        player.lastShot = now;
        player.shoot();
    }    

    // update player position
    let vectorDirection = player.rotationToVector(player.model.rotation);
    player.model.position.addVector(
        vectorDirection.x * player.speed * deltaTime,
        vectorDirection.y * player.speed * deltaTime
    );

    for (let i = player.bullets.length - 1; i >= 0; i--) {
        const element = player.bullets[i];
    
        if (now - element.bulletCreationTime < element.bulletLifetime) {
            element.model.position.addVector(
                element.rotationAngleVector.x * element.bulletSpeed * deltaTime,
                element.rotationAngleVector.y * element.bulletSpeed * deltaTime
            );
    
            // Wrap bullets off screen
            const halfSizeX = element.model.size.x / 2;
            const halfSizeY = element.model.size.y / 2;
            if (element.model.position.y > windowSize.y + halfSizeY) {
                element.model.position.y = -halfSizeY;
            } else if (element.model.position.y < -halfSizeY) {
                element.model.position.y = windowSize.y + halfSizeY;
            }
    
            if (element.model.position.x > windowSize.x + halfSizeX) {
                element.model.position.x = -halfSizeX;
            } else if (element.model.position.x < -halfSizeX) {
                element.model.position.x = windowSize.x + halfSizeX;
            }
        } else {
            delete element.model;
            player.bullets.splice(i, 1);
        }
    }    

    // add player drag if !moving
    if (!player.moving) {
        player.speed -= player.drag * deltaTime;
        if (player.speed < 0) player.speed = 0;
    }

    // wrap player on window    
    if (player.model.position.y > windowSize.y + (player.model.size.y/2)) {
        player.model.position.y = 0 - (player.model.size.y/2);
    }
    if (player.model.position.y < 0 - (player.model.size.y/2)) {
        player.model.position.y += windowSize.y + (player.model.size.y/2);
    }
    if (player.model.position.x > windowSize.x + (player.model.size.x/2)) {
        player.model.position.x = 0 - (player.model.size.x/2);
    }
    if (player.model.position.x < 0 - (player.model.size.x/2)) {
        player.model.position.x += windowSize.x + (player.model.size.x/2);
    }

    // not visible ever but loops player rotation from 360 > 0 and vice versa
    player.model.rotation %= 360
}


function render(){
	Fill(new colorRGBA())
	Draw(player.model)
    player.bullets.forEach(bullet => {
        Draw(bullet.model)
    });
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