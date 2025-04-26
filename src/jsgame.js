import { core } from "./core/core.js";
import { draw } from "./draw/draw.js";

export class jsgame {
	constructor() {
		this.core = core
		this.draw = draw
	}

	init() {
		document.body.style.margin = "0px";
		let canvas = document.querySelector("canvas");
		if (canvas === null) {
			let canvas = document.body.appendChild(document.createElement("canvas"));
			canvas.id = "screen"
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			return canvas.getContext('2d');
		}
	}
};