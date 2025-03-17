class key {
    constructor() {
        this.type = "key";
        this.dataType = "key";
        this.pressedKeys = {};
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
	constructor(pX, pY, sW, sH, fillColor = new colorRGBA()) {
		this.pX = pX;
		this.pY = pY;
		this.sW = sW;
		this.sH = sH;
		this.fillColor = fillColor;
		this.type = "Rect";
		this.dataType = "DrawableObject";
	}
}

class Circle {
	constructor(pX, pY, R, fillColor = new colorRGBA()) {
		this.pX = pX;
		this.pY = pY;
		this.radius = R;
		this.fillColor = fillColor;
		this.type = "Circle";
		this.dataType = "DrawableObject";
	}
}

function Draw(object){
	if (object.dataType == "DrawableObject") {
		if (object.type == "Rect") {
			let body = document.querySelector("body")
			let drawn = document.createElement("div")
			drawn.style.width = `${object.sW}px`
			drawn.style.height = `${object.sH}px`
			drawn.style.position = `absolute`
			drawn.style.left = `${object.pX}px`
			drawn.style.top = `${object.pY}px`
			drawn.style.backgroundColor = `rgba(${object.fillColor.R}, ${object.fillColor.G}, ${object.fillColor.B}, ${object.fillColor.A})`
			drawn.classList.add("object")
			body.appendChild(drawn)
		} else if (object.type == "Circle") {

		}
	}
}

function Fill(fillColor = new colorRGBA()){
	let body = document.querySelector("body")
	let objects = document.getElementsByClassName("object")
	for(let i = 0; i<objects.length; i++){
		objects[i].remove()
	}
	body.style.backgroundColor = `rgba(${fillColor.R}, ${fillColor.G}, ${fillColor.B}, ${fillColor.A})`
}

export { colorRGBA, Rect, Circle, Draw, Fill};