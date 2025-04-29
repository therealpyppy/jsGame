import { eventList } from "./eventList.js"

function addQueue(id) {

}

eventList = new eventList();

visible = true;

window.addEventListener('mousemove', addQueue(id));
window.addEventListener('mousedown', addQueue(id));
window.addEventListener('mouseup', addQueue(id));
window.addEventListener('click', addQueue(id));
window.addEventListener('dblclick', addQueue(id));
window.addEventListener('wheel', addQueue(id));

window.addEventListener('keyup', addQueue(id));

window.addEventListener('touchmove', addQueue(id));
window.addEventListener('touchend', addQueue(id));

document.addEventListener('visibilitychange', (event) => {
	visible = !visible
	addQueue(visible ? 513 : 514);
});
window.addEventListener('blur', addQueue(1));
window.addEventListener('focus', addQueue(1));

window.addEventListener('dragstart', addQueue(id));
window.addEventListener('dragend', addQueue(id));
window.addEventListener('drop', addQueue(id));

export const event = {
	
};