import { core } from "../../core/core.js"

export function circle(ctx, color, center, radius, width=0, draw_top_right=false, draw_top_left=false, draw_bottom_left=false, draw_bottom_right=false) {
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;
	if (!Array.isArray(center) || center.length !== 2) {
		throw new Error("center must be an array of two numbers [x, y]");
	}
	if (!typeof(radius) == 'number' || !(radius % 1 == 0)) {
		throw new Error("radius must be an integer");
	}

	let x = center[0];
	let y = center[1];
	let top = y - radius;
	let left = x - radius;

	if (width < 0 || radius < 0) {
		return new core.Rect([x, y], [0, 0]);
	}

	ctx.lineWidth = width;

	if (draw_top_right, draw_top_left, draw_bottom_left, draw_bottom_right) {

	} else {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	return new core.Rect([top, left], [radius*2, radius*2]);
}