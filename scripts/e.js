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
	constructor(...args) {
		if (args.length === 4) {
			this.left = args[0];
			this.top = args[1];
			this.width = args[2];
			this.height = args[3];
		} else if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
			this.left = args[0][0];
			this.top = args[0][1];
			this.width = args[1][0];
			this.height = args[1][1];
		} else if (args.length === 1 && typeof args[0] === 'object') {
			const obj = args[0];
			this.left = obj.left ?? obj.x ?? 0;
			this.top = obj.top ?? obj.y ?? 0;
			this.width = obj.width ?? 0;
			this.height = obj.height ?? 0;
		} else {
			throw new Error('Invalid arguments for Rect');
		}
		this.type = "Rect";
		this.dataType = "DrawableObject";
	}
	
	get right() {
		return this.left + this.width;
	}
	
	get bottom() {
		return this.top + this.height;
	}
	
	copy() {
		return new Rect((this.left, this.top), (this.width, this.height));
	}
	
	move(x, y) {
		let newRect = this.copy();
		newRect.left += x;
		newRect.top += y;
		return newRect;
	}
	
	moveInPlace(x, y) {
		this.left += x;
		this.top += y;
	}
	
	inflate(x, y) {
		let newRect = this.copy();
		newRect.width += x;
		newRect.height += y;
		return newRect;
	}
	
	inflateInPlace(x, y) {
		this.width += x;
		this.height += y;
	}
	
	scaleBy(x, y) {
		let newRect = this.copy();
		newRect.width *= x;
		newRect.height *= y;
		return newRect;
	}
	
	scaleByInPlace(x, y) {
		this.width *= x;
		this.height *= y;
	}
	
	update(...args) {
		if (args.length === 4) {
			this.left = args[0];
			this.top = args[1];
			this.width = args[2];
			this.height = args[3];
		} else if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
			this.left = args[0][0];
			this.top = args[0][1];
			this.width = args[1][0];
			this.height = args[1][1];
		} else if (args.length === 1 && typeof args[0] === 'object') {
			const obj = args[0];
			this.left = obj.left ?? obj.x ?? 0;
			this.top = obj.top ?? obj.y ?? 0;
			this.width = obj.width ?? 0;
			this.height = obj.height ?? 0;
		} else {
			throw new Error('Invalid arguments for Rect');
		}
	}
	
	clamp(rect) {
		let newRect = this.copy();
		if (newRect.width > rect.width) {
			newRect.left = rect.left+(rect.width/2);
		} else {
			newRect.left = rect.left;
		}
		
		if (newRect.height > rect.height) {
			newRect.top = rect.top+(rect.height/2)
		} else {
			newRect.top = rect.top;
		}
		return newRect;
	}
	
	clampInPlace(rect) {
		if (this.width > rect.width) {
			this.left = rect.left+(rect.width/2);
		} else {
			this.left = rect.left;
		}
		
		if (this.height > rect.height) {
			this.top = rect.top+(rect.height/2)
		} else {
			this.top = rect.top;
		}
	}
	
	clip(rect) {
		const left = Math.max(this.left, rect.left);
		const top = Math.max(this.top, rect.top);
		const right = Math.min(this.right, rect.right);
		const bottom = Math.min(this.bottom, rect.bottom);
		
		const width = right - left;
		const height = bottom - top;
		
		if (width <= 0 || height <= 0) {
			return new Rect(0, 0, 0, 0);
		}
		
		return new Rect(left, top, width, height);
	}

	union(rect) {
		const left = Math.min(this.left, rect.left);
		const top = Math.min(this.top, rect.top);
		const right = Math.max(this.right, rect.right);
		const bottom = Math.max(this.bottom, rect.bottom);
		
		const width = right - left;
		const height = bottom - top;

		return new Rect(left, top, width, height);
	}

	unionInPlace(rect) {
		const left = Math.min(this.left, rect.left);
		const top = Math.min(this.top, rect.top);
		const right = Math.max(this.right, rect.right);
		const bottom = Math.max(this.bottom, rect.bottom);
		
		const width = right - left;
		const height = bottom - top;
		
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}

	unionAll(rectSequence) {
		const left = Math.min(this.left, ...rectSequence.map(r => r.left));
		const top = Math.min(this.top, ...rectSequence.map(r => r.top));
		const right = Math.max(this.right, ...rectSequence.map(r => r.right));
		const bottom = Math.max(this.bottom, ...rectSequence.map(r => r.bottom));
		
		const width = right - left;
		const height = bottom - top;

		return new Rect(left, top, width, height);
	}

	unionAllInPlace(rectSequence) {
		const left = Math.min(this.left, ...rectSequence.map(r => r.left));
		const top = Math.min(this.top, ...rectSequence.map(r => r.top));
		const right = Math.max(this.right, ...rectSequence.map(r => r.right));
		const bottom = Math.max(this.bottom, ...rectSequence.map(r => r.bottom));
		
		const width = right - left;
		const height = bottom - top;

		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}

	contains(rect) {
		return (rect.left > this.left && rect.right < this.right) && (rect.top > this.top && rect.bottom < this.bottom);
	}

	collidePoint(x, y) {
		return (x > this.left && x < this.right) && (y > this.top && y < this.bottom);
	}
	
	*[Symbol.iterator]() {
		yield this.left;
		yield this.top;
		yield this.width;
		yield this.height;
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
		const x1 = this.base / 2;
		const y1 = 0;
		
		const x2 = 0;
		const y2 = this.height;
		
		const x3 = this.base;
		const y3 = this.height;
		
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