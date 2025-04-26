import { core } from "../../core/core.js"

export function lines(ctx, color, closed, points, width=1) {
	if (!Array.isArray(points)) {
		throw new Error("\"points\" must be an array of integer arrays");
	}

	if (points.length < 2) {
		throw new Error("points argument must contain 2 or more points");
	}

	if (width < 1) {
		let xs = map(points, p => p[0]);
		let ys = map(points, p => p[0]);
		
		let left = Math.min(...xs);
		let top = Math.min(...ys);
		let right = Math.max(...xs);
		let bottom = Math.max(...ys);

		let rWidth = right-left;
		let rHeight = bottom-top;

		return new core.Rect([left, top], [rWidth, rHeight]);
	} else if (points.length === 0) {
		return new core.Rect([0, 0], [0, 0]);
	}

	ctx.lineWidth = width;
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}