import { eventList } from './eventList.js';

const list = new eventList();
var visible = true;

function addQueue(id) {
	return (event) => {
		list.push({ id, event });
	};
}

window.addEventListener('mousemove', addQueue(1024));
window.addEventListener('mousedown', addQueue(1025));
window.addEventListener('mouseup', addQueue(1026));
window.addEventListener('wheel', addQueue(1076));

window.addEventListener('keydown', addQueue(798));
window.addEventListener('keyup', addQueue(769));

window.addEventListener('touchstart', addQueue(1792));
window.addEventListener('touchmove', addQueue(1794));
window.addEventListener('touchend', addQueue(1793));

window.addEventListener('beforeunload', addQueue(256));
document.addEventListener('visibilitychange', () => {
	visible = !visible;
	list.push({ id: visible ? 513 : 514 });
});

window.addEventListener('blur', addQueue(1));
window.addEventListener('focus', addQueue(1));

window.addEventListener('dragstart', addQueue(4098));
window.addEventListener('dragend', addQueue(4099));
window.addEventListener('drop', addQueue(4096));

export const event = {
	get() {
		return list.get();
	},

	poll() {
		return list.shift() || 0;
	}
}; 