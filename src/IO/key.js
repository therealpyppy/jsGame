import createKeyDict from './keyPressed.js';

export class Key {
	constructor() {
		this.keys = createKeyDict();
		this.type = "key";
		this.dataType = "key";
		
		document.addEventListener("keydown", (event) => {
			this.keys[event.code] = true;
		});
		
		document.addEventListener("keyup", (event) => {
			this.keys[event.code] = false;
		});
	}
	
	getPressed() {
		return this.keys;
	}
};