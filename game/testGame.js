import { colorRGBA, Rect, Draw, Triangle, Key, Circle, Fill} from '../e.js';

let run = true

let testRect = new Rect(300, 200, 40, 40, new colorRGBA(255, 0, 0, 0))
let testCircle = new Circle(350, 200, 40, new colorRGBA(255, 0, 0, 0))
let player = new Triangle(Math.floor(document.body.style.width/2), Math.floor(document.body.style.height/2), 40, 40, new colorRGBA(255, 0, 0, 0))

let key = new Key