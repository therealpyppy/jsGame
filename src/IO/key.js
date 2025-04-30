import createKeyDict from './keyPressed.js';
import { maps } from './keyMap.js'
import { map } from 'event-stream';

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
	
	getMods() {
		const mods = [];

		Object.keys(maps.ModKeyMap).forEach(mod => {
			if (this.keys[mod] === true) {
				mods.push(mod)
			}
		});
	  
		return mods;
	}
}