import { Interact } from '../interactjs/interaction.js'

//?                                 Live information on interaction events
class Coordinates extends Interact {
    constructor(element) {
        super(element)
        this.element = element

        // Init
        this.createCanvas(element)
        this.info()
    }

    //?                             Information Bar
    info() {
        document.getElementById('info').innerHTML = `
                Region: ${this.circularThreshold() && this.currentRegion}
        `
    }

    //?                             Polymorphs
    onmousedown() {
        super.onmousedown(event)
        this.generateRegions(150)
        this.drawCircle(this.initial, 9, '#6B9F55')
    }

    ontouchstart(event) {
        super.ontouchstart(event)
        this.generateRegions(150)
        this.drawCircle(this.initial, 9, '#6B9F55')
    }

    ontouchmove(event) {
        super.ontouchmove(event)
        this.info()
    }

    onmousemove(event, fn) {
        super.onmousemove(event)
        if (this.drag) {
            this.info()
        }
    }

    onmouseup(event) {
        super.onmouseup(event)
        this.info()
        if (this.circularThreshold()) {
            this.drawCircle(this.curr, 6, '#9F5555')
        }
    }

    ontouchend(event) {
        super.ontouchend(event)
        this.info()
        if (this.circularThreshold()) {
            this.drawCircle(this.curr, 6, '#9F5555')
        }
    }

    //?                             Canvas Creation
    createCanvas(element) {
        const canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.width = element.clientWidth
        canvas.height = element.clientHeight
        element.append(canvas)
    }

    //?                             Canvas Draw
    generateRegions(distance) {
        canvas.getContext('2d')
            .clearRect(0, 0, canvas.width, canvas.height)
        this.regions
            .forEach(item => this.drawLine(this.degreeToCartesian(distance, item)))
        this.drawCircle(this.initial, this.threshold, getComputedStyle(document.body).backgroundColor, true)
    }

    drawLine({ x, y }) {
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(this.initial.x, this.initial.y)
        ctx.lineTo(this.initial.x - x, this.initial.y - y)
        ctx.strokeStyle = getComputedStyle(info).color
        ctx.stroke()
    }

    drawCircle({ x, y } = {}, rad, color = false, stroke = false) {
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(x, y, rad, 0, Math.PI * 2, false)
        ctx.fillStyle = color
        ctx.strokeStyle = getComputedStyle(info).color
        if (color) ctx.fill()
        if (stroke) ctx.stroke()
    }

}

// Initialize interaction
const $ = new Coordinates(document.getElementById('app'))

// Create regions
$.createRegions(12)

// Set circular threshold
$.threshold = 45

// Event handler hooks
$.events = {
    start: onstart,
    move: onmove,
    end: onend
}

// Custom event handling
function onstart() {

}

function onmove() {

}

function onend() {
    console.log($.currentRegion)
}