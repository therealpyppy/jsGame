import createKeyDict from './keyDict.js';

export class Key {
	constructor() {
		this.keys = createKeyDict();
		this.type = "key";
		this.dataType = "key";
		this.focused = true;
		
		document.addEventListener("keydown", (event) => {
			this.keys[event.code] = true;
		});
		
		document.addEventListener("keyup", (event) => {
			this.keys[event.code] = false;
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