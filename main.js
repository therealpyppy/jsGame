import { jsgame } from "./src/jsgame.js"

const surface = document.getElementById("canvas").getContext('2d')

jsgame.draw.circle(surface, "#FF0000", [50, 50], 20)