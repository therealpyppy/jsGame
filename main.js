import { colorRGBA, Rect, Draw} from './e.js';

let testRect = new Rect(1, 1, 2, 2, new colorRGBA(255, 0, 0, 0))

function gameLoop(){
	Draw(testRect)
	setTimeout(gameLoop, 1);
}