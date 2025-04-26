import { core } from "../../core/core.js"

export function lines(ctx, color, closed, points, width=1) {
	if (!Array.isArray(points)) {
		throw new Error("\"points\" must be an array of integer arrays")
	}

	if (points.length < 2) {
		throw new Error("points argument must contain 2 or more points")
	}

	if (width < 1) {
		return new core.Rect(Math.min(x1, x2), Math.min(y1, y2), , );
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