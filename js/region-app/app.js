import { Interact } from '../interactjs/interact.js'
import { Canvas } from './canvas.js'

// Initialize classes
const app = new Interact(document.getElementById('app'))
const draw = new Canvas(app.element)

// Create regions and set a threshold
app.createRegions(12)
app.threshold = 45

// Pass the events object your on-event functions 
// (lifecycle: start -> move -> end)
app.events = {
    start: onstart,
    move: onmove,
    end: onend
}

// Display region information
function info() {
    document.getElementById('info').textContent =
        `Region: ${app.circularThreshold() && app.currentRegion}`
}

// Start event
function onstart() {
    draw.regions(150, app)
    draw.circle(app.initial, 9, '#6B9F55')
    info()
}

// Move event
function onmove() {
    info()
}

// End event
function onend() {
    info()
    if (app.circularThreshold()) draw.circle(app.current, 6, '#9F5555')
}

// Initial info
info();