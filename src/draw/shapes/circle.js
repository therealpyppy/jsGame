import { core } from "../../core/core.js"

export function circle(ctx, color, center, radius, width=0, draw_top_right=false, draw_top_left=false, draw_bottom_left=false, draw_bottom_right=false) {
	if (!Array.isArray(center) || center.length !== 2) {
		throw new Error("center must be an array of two numbers [x, y]");
	}
	let x = center[0];
	let y = center[1];

	ctx.lineWidth = width;
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;

	if (draw_top_right, draw_top_left, draw_bottom_left, draw_bottom_right) {

	} else {
		ctx.beginPath();
		ctx.arc(100, 75, 50, 0, 2 * Math.PI);
		ctx.stroke();
	}

	return new core.Rect(center);
}