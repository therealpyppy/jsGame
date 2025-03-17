import { colorRGBA, Rect, Draw, Fill} from './e.js';

let run = false
let testRect = new Rect(300, 200, 40, 40, new colorRGBA(255, 0, 0, 0))

function gameLoop(){
	if (run) {
		Fill(new colorRGBA())
		Draw(testRect)
		setTimeout(gameLoop, 10);
	}
}

if (run){
	gameLoop()
}


Fill(new colorRGBA())
Draw(testRect)