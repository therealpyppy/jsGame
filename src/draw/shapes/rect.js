export function rect(ctx, color, rect,
	borderRadius = 0, borderTopLeftRadius = -1, borderTopRightRadius = -1, 
borderBottomLeftRadius = -1, borderBottomRightRadius = -1) {
	ctx.fillStyle = color;
	ctx.fillRect(left, top, width, height);
}
