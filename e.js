import keyDictionary from "./keyDict.js"

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    addVector(x, y) {
        this.x += x
        this.y += y
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
    constructor(position = new Vector2(), sW, sH, fillColor = new colorRGBA(), rotation = 0) {
        this.position = position;
        this.sW = sW;
        this.sH = sH;
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
    constructor(position = new Vector2(), base, height, fillColor = new colorRGBA(), rotation = 0) {
        this.position = position;
        this.base = base;
        this.height = height;
        this.fillColor = fillColor;
        this.rotation = rotation;
        this.type = "Triangle";
        this.dataType = "DrawableObject";
    }
}

function Draw(object) {
    if (object.dataType !== "DrawableObject") {
        return;
    }

    const body = document.querySelector("body");
    const drawn = document.createElement("div");
    const { fillColor, pX, pY, rotation } = object;
    const backgroundColor = `rgba(${fillColor.R}, ${fillColor.G}, ${fillColor.B}, ${fillColor.A})`;

    if (object.type === "Rect") {
        drawn.style.width = `${object.sW}px`;
        drawn.style.height = `${object.sH}px`;
        drawn.style.backgroundColor = backgroundColor;
    } else if (object.type === "Circle") {
        drawn.style.width = `${object.radius}px`;
        drawn.style.height = `${object.radius}px`;
        drawn.style.borderRadius = "50%";
        drawn.style.backgroundColor = backgroundColor;
    } else if (object.type === "Triangle") {
        drawn.style.width = "0";
        drawn.style.height = "0";
        drawn.style.borderLeft = `${object.base / 2}px solid transparent`;
        drawn.style.borderRight = `${object.base / 2}px solid transparent`;
        drawn.style.borderBottom = `${object.height}px solid ${backgroundColor}`;
    }

    Object.assign(drawn.style, {
        position: "absolute",
        left: `${pX}px`,
        top: `${pY}px`,
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

export { colorRGBA, Rect, Circle, Triangle, Key, Draw, Fill};