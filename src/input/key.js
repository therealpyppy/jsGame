export class Key {
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
	
	getPressed() {
		return this.pressedKeys;
	}
	
	getFocused() {
		return this.focused;
	}
};