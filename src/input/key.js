import createKeyDict from './keyDict.js';

export class Key {
	constructor() {
		this.keys = createKeyDict();
		this.type = "key";
		this.dataType = "key";
		this.focused = true;
		
		document.addEventListener("keydown", (event) => {
			this.keys[event.key] = true;
		});
		
		document.addEventListener("keyup", (event) => {
			this.keys[event.key] = false;
		});
		
		window.addEventListener("focus", () => {
			this.focused = true;
		});
		
		window.addEventListener("blur", () => {
			this.focused = false;
		});
	}
	
	getPressed() {
		return this.keys;
	}
	
	getFocused() {
		return this.focused;
	}
};