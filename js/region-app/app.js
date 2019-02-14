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
    regionAmount.blur()
    thresholdValue.blur()
}

// Move event
function onmove() {
    info()
}

// End event
function onend() {
    info()
    if (app.circularThreshold()) {
        draw.circle(app.current, 6, '#9F5555')
    }
}

// Redraw canvas
function redraw() {
    // Create new app.regions from given value
    app.createRegions(parseInt(regionAmount.value))
    // Draw regions based off new array
    draw.regions(150, app)
    // Redraw the initial circle
    draw.circle(app.initial, 9, '#6B9F55')
    // Redraw the final circle if it's not within the threshold
    if (app.circularThreshold()) draw.circle(app.current, 6, '#9F5555')
}

// Initial info
info();



// Event listeners for value input
regionAmount.addEventListener('change', () => {
    if (regionAmount.value >= 2) {
        redraw()
        app.currentRegion = app.getCurrentRegion(app.degree(app.difference))
        info()
    }
})

thresholdValue.addEventListener('change', () => {
    app.threshold = parseInt(thresholdValue.value)
    redraw()
    info()
})