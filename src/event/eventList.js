export class eventList {
	constructor() {
		this.nameList = {
			"NOEVENT": 0,
			"ACTIVEEVENT": 1,
			"QUIT": 256,
			"SYSTEMEVENT": 257,
			"WINDOWEVENT": 512,
			"WINDOWSHOWN": 513,
			"WINDOWHIDDEN": 514,
			"WINDOWEXPOSED": 515,
			"WINDOWMOVED": 516,
			"WINDOWRESIZED": 517,
			"WINDOWSIZECHANGED": 518,
			"WINDOWMINIMIZED": 519,
			"WINDOWMAXIMIZED": 520,
			"WINDOWRESTORED": 521,
			"WINDOWENTER": 522,
			"WINDOWLEAVE": 523,
			"WINDOWFOCUSGAINED": 524,
			"WINDOWFOCUSLOST": 525,
			"WINDOWTAKEFOCUS": 526,
			"WINDOWHITTEST": 527,
			"KEYDOWN": 768,
			"KEYUP": 769,
			"TEXTEDITING": 770,
			"TEXTINPUT": 771,
			"KEYMAPCHANGED": 772,
			"MOUSEMOTION": 1024,
			"MOUSEBUTTONDOWN": 1025,
			"MOUSEBUTTONUP": 1026,
			"MOUSEWHEEL": 1027,
			"JOYAXISMOTION": 1536,
			"JOYBALLMOTION": 1537,
			"JOYHATMOTION": 1538,
			"JOYBUTTONDOWN": 1539,
			"JOYBUTTONUP": 1540,
			"JOYDEVICEADDED": 1541,
			"JOYDEVICEREMOVED": 1542,
			"CONTROLLERAXISMOTION": 1616,
			"CONTROLLERBUTTONDOWN": 1617,
			"CONTROLLERBUTTONUP": 1618,
			"CONTROLLERDEVICEADDED": 1619,
			"CONTROLLERDEVICEREMOVED": 1620,
			"CONTROLLERDEVICEREMAPPED": 1621,
			"CONTROLLERTOUCHPADDOWN": 1622,
			"CONTROLLERTOUCHPADMOTION": 1623,
			"CONTROLLERTOUCHPADUP": 1624,
			"CONTROLLERSENSORUPDATE": 1625,
			"FINGERDOWN": 1792,
			"FINGERUP": 1793,
			"FINGERMOTION": 1794,
			"DOLLARGESTURE": 2048,
			"DOLLARRECORD": 2049,
			"MULTIGESTURE": 2050,
			"CLIPBOARDUPDATE": 2304,
			"DROPFILE": 4096,
			"DROPTEXT": 4097,
			"DROPBEGIN": 4098,
			"DROPCOMPLETE": 4099,
			"AUDIODEVICEADDED": 4352,
			"AUDIODEVICEREMOVED": 4353,
			"USEREVENT": 32866
		};

		this.queue = [];
	}

	push(event) {
		this.queue.push(event);
	}

	get() {
		const events = [...this.queue];
		this.queue.length = 0;
		return events;
	}

	getEventId(name) {
		if (Object.keys(this.nameList).includes(name)) {
			return this.nameList[name];
		} else {
			throw new Error("Unknown event name");
		}
	}

	getEventName(id) {
		if (Object.values(this.nameList).includes(id)) {
			return Object.keys(this.nameList).find(key => this.nameList[key] === id);
		} else {
			throw new Error("Unknown event id");
		}
	}
}