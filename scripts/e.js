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

class Polygon {
    constructor(position = new Vector2(), points = [new Vector2(0,0), new Vector2(40,0), new Vector2(40,40), new Vector2(0,40)], fillColor = new colorRGBA(), rotation = 0) {
        this.position = position;
        this.points = points
        this.size = this.calcSize();
        this.fillColor = fillColor;
        this.rotation = rotation;
        this.type = "Polygon";
        this.dataType = "DrawableObject";
    }

    calcSize() {
        let maxX = 0;
        let maxY = 0;
        this.points.forEach(point => {
            let x = point.x;
            let y = point.y;
            if (x > maxX) {
                maxX = x;
            }
            if (y > maxY) {
                maxY = y;
            }
        });
        return new Vector2(maxX, maxY);
    }
}

class UIPanel{
    constructor(parent = document.body, size = new Vector2(400, 200), position = new Vector2(), fillColor = new colorRGBA(), style = {}, verticleAlign="center", horizontalAlign="left") {
        this.type = "Panel"
        this.dataType = "UIElement"
        
        this.parent = parent
        this.size = size
        this.position = position
        this.fillColor = fillColor
        this.verticleAlign = verticleAlign
        this.horizontalAlign = horizontalAlign
    
        this.style = style

        this.element = this.render()
    }

    render() {
        let panel = document.createElement("div")
        Object.assign(panel.style, {
            position: `absolute`,
            left: `${this.position.x}px`,
            top: `${this.position.y}px`,
            width: `${this.size.x}px`,
            height: `${this.size.y}px`,
            backgroundColor: `rgba(${this.fillColor.R}, ${this.fillColor.G}, ${this.fillColor.B}, ${this.fillColor.A})`,
            display: "flex",
            justifyContent: this.horizontalAlign,
            alignItems: this.verticleAlign
        })
        Object.assign(panel.style, this.style)
        this.parent.appendChild(panel)
        return panel
    }
}

class UIText{
    constructor(parent = document.body, size = new Vector2(400, 200), position = new Vector2(), 
    fillColor = new colorRGBA(), horizontalAlign="left", verticleAlign="center", text, 
    fontFamily="sans-serif", fontSize=16, fontStyle="normal", fontWeight="normal",
    fontColor=new colorRGBA(0, 0, 0, 0), textAlign="left", style = {}) {
        this.type = "Text"
        this.dataType = "UIElement"
        
        this.parent = parent
        this.size = size
        this.position = position
        this.fillColor = fillColor
        this.verticleAlign = verticleAlign
        this.horizontalAlign = horizontalAlign
        
        this.text = text
        this.textAlign = textAlign
        this.fontFamily = fontFamily
        this.fontSize = fontSize
        this.fontStyle = fontStyle
        this.fontWeight = fontWeight
        this.fontColor = fontColor

        this.style = style

        this.element = this.render()
    }

    render() {
        let panel = document.createElement("div")
        panel.textContent = this.text
        Object.assign(panel.style, {
            position: `absolute`,
            left: `${this.position.x}px`,
            top: `${this.position.y}px`,
            width: `${this.size.x}px`,
            height: `${this.size.y}px`,
            backgroundColor: `rgba(${this.fillColor.R}, ${this.fillColor.G}, ${this.fillColor.B}, ${this.fillColor.A})`,
            display: "flex",
            justifyContent: this.horizontalAlign,
            alignItems: this.verticleAlign,

            textAlign: this.textAlign,
            fontFamily: this.fontFamily,
            fontSize: `${this.fontSize}px`,
            fontStyle: this.fontStyle,
            fontWeight: this.fontWeight,
            color: `rgba(${this.fontColor.R}, ${this.fontColor.G}, ${this.fontColor.B}, ${this.fontColor.A})`
        })
        Object.assign(panel.style, this.style)
        this.parent.appendChild(panel)
        return panel
    }
}

function Draw(object) {
    if (object.dataType !== "DrawableObject") {
        return;
    }

    const body = document.body;
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
        const body = document.body;
        const canvas = document.createElement("canvas");

        canvas.width = object.size.x
        canvas.height = object.size.y

        body.appendChild(canvas); 
        const ctx = canvas.getContext("2d");

        const x1 = object.size.x / 2
        const y1 = 0

        const x2 = 0
        const y2 = object.size.y

        const x3 = object.size.x
        const y3 = object.size.y


        ctx.fillStyle = backgroundColor;
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
    } else if (object.type === "Polygon") {
        const body = document.body;
        const canvas = document.createElement("canvas");

        canvas.width = object.size.x
        canvas.height = object.size.y

        body.appendChild(canvas); 
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";

        ctx.fillStyle = backgroundColor;
        ctx.beginPath();
        object.points.forEach(point => {
            let x = point.x
            let y = point.y
            ctx.lineTo(x, y);
        });
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
    let body = document.body;

    let objects = document.querySelectorAll(".object");
    objects.forEach(obj => obj.remove());

    body.style.backgroundColor = `rgba(${fillColor.R}, ${fillColor.G}, ${fillColor.B}, ${fillColor.A})`;
}

export { colorRGBA, Rect, Vector2, Circle, Triangle, Polygon, Key, UIPanel, UIText, Draw, Fill};