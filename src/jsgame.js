import { core } from "./core/core.js";
import { draw } from "./draw/draw.js";

export const jsgame = {
	init() {
		document.body.style.margin = "0px";
		let canvas = document.querySelector("canvas");
		if (canvas === null) {
			document.body.appendChild(document.createElement("canvas"));
		}
	},

	core,
	draw
};