class colorRGBA {
	constructor(R = 0, G = 0, B = 0, A = 1) {
		this.r = R;
		this.g = G;
		this.b = B;
		this.a = A;
	}
}

class Rect {
	constructor(px, py, sx, sy, fillColor = new colorRGBA()) {
		this.px = px;
		this.py = py;
		this.sx = sx;
		this.sy = sy;
		this.fillColor = fillColor;
	}
}

export { colorRGBA, Rect };