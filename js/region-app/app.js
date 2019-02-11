import { Interact } from '../interactjs/interact.js'
import { Canvas } from './canvas.js'

// Initialize classes
const app = new Interact(document.getElementById('app'))
const draw = new Canvas(app.element)

// Create regions
app.createRegions(12)

// Display region information
function info() {
    document.getElementById('info').textContent =
        `Region: ${app.circularThreshold() && app.currentRegion}`
}

// Set threshold
app.threshold = 45


// Pass the events object your on-event functions (start -> move -> end)
app.events = {
    start: onstart,
    move: onmove,
    end: onend
}

function onstart() {
    draw.regions(150, app)
    draw.circle(app.initial, 9, '#6B9F55')
    info()
}

function onmove() {
    info()
}

function onend() {
    info()
    if (app.circularThreshold()) draw.circle(app.current, 6, '#9F5555')
}


// Initial info
info();