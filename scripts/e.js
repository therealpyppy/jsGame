import keyDictionary from "./keyDict.js"

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    addVector(x, y) {
        this.x += x;
        this.y += y;
    }
}

class Key {
    constructor() {
        this.type = "key";
        this.dataType = "key";
        this.pressedKeys = keyDictionary;
        this.focused = true;

        document.addEventListener("keydown", (event) => {
            this.pressedKeys[event.key] = true;
        });

        document.addEventListener("keyup", (event) => {
            this.pressedKeys[event.key] = false;
        });

        window.addEventListener("focus", () => {
            this.focused = true;
        });

        window.addEventListener("blur", () => {
            this.focused = false;
        });
    }

    get_pressed() {
        return this.pressedKeys;
    }

    get_focused() {
        return this.focused;
    }
}

class colorRGBA {
	constructor(R = 255, G = 255, B = 255, Transparency = 1) {
		this.R = R;
		this.G = G;
		this.B = B;
		this.A = (Transparency - 1) * -1;
		this.type = "colorRGBA";
		this.dataType = "color";
	}
}

class Rect {
    constructor(position = new Vector2(), size = new Vector2(40, 40), fillColor = new colorRGBA(), rotation = 0) {
        this.position = position;
        this.size = size
        this.fillColor = fillColor;
        this.rotation = rotation;
        this.type = "Rect";
        this.dataType = "DrawableObject";
    }
}

class Circle {
    constructor(position = new Vector2(), R, fillColor = new colorRGBA(), rotation = 0) {
        this.position = position;
        this.radius = R;
        this.fillColor = fillColor;
        this.rotation = rotation;
        this.type = "Circle";
        this.dataType = "DrawableObject";
    }
}

class Triangle {
    constructor(position = new Vector2(), size = new Vector2(40, 40), fillColor = new colorRGBA(), rotation = 0) {
        this.position = position;
        this.size = size;
        this.fillColor = fillColor;
        this.rotation = rotation;
        this.type = "Triangle";
        this.dataType = "DrawableObject";
    }

    calculatePoints() {
        const x1 = this.base / 2
        const y1 = 0

        const x2 = 0
        const y2 = this.height

        const x3 = this.base
        const y3 = this.height 

        return [
            new Vector2(x1, y1),
            new Vector2(x2, y2),
            new Vector2(x3, y3)
        ];
    }
}

function Draw(object) {
    if (object.dataType !== "DrawableObject") {
        return;
    }

    const body = document.querySelector("body");
    const drawn = document.createElement("div");
    const { fillColor, position, rotation } = object;
    const backgroundColor = `rgba(${fillColor.R}, ${fillColor.G}, ${fillColor.B}, ${fillColor.A})`;

    if (object.type === "Rect") {
        drawn.style.width = `${object.size.x}px`;
        drawn.style.height = `${object.size.y}px`;
        drawn.style.backgroundColor = backgroundColor;
    } else if (object.type === "Circle") {
        drawn.style.width = `${object.radius}px`;
        drawn.style.height = `${object.radius}px`;
        drawn.style.borderRadius = "50%";
        drawn.style.backgroundColor = backgroundColor;
    } else if (object.type === "Triangle") {
        const body = document.querySelector("body");
        const canvas = document.createElement("canvas");

        canvas.width = object.size.x
        canvas.height = object.size.y

        body.appendChild(canvas); 
        const ctx = canvas.getContext("2d");

        const x1 = 40 / 2
        const y1 = 0

        const x2 = 0
        const y2 = 40

        const x3 = 40
        const y3 = 40


        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();  

        canvas.classList.add("object")
        canvas.style.position = "absolute";
        canvas.style.left = `${position.x}px`;
        canvas.style.top = `${position.y}px`;
        canvas.style.transform = `rotate(${rotation}deg)`;

        body.appendChild(canvas);
        return;
    }

    Object.assign(drawn.style, {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center"
    });

    drawn.classList.add("object");
    body.appendChild(drawn);
}

function Fill(fillColor = new colorRGBA()) {
    let body = document.querySelector("body");

    let objects = document.querySelectorAll(".object");
    objects.forEach(obj => obj.remove());

    body.style.backgroundColor = `rgba(${fillColor.R}, ${fillColor.G}, ${fillColor.B}, ${fillColor.A})`;
}

export { colorRGBA, Rect, Vector2, Circle, Triangle, Key, Draw, Fill};