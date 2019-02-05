import { Interaction } from './events.js'

//?                                 Live information on interaction events
class Coordinates extends Interaction {
    constructor(element, threshold = 0, regions = 0) {
        super(element, threshold, regions)
        this.element = element

        // Init
        this.createCanvas(element)
        this.info()
    }

    //?                             Information Bar
    info() {
        document.getElementById('info').innerHTML = `
                <h4>Origin</h4> 
                x: ${Math.round(this.initial.x)} <br>
                y: ${Math.round(this.initial.y)}

                <h4>Current</h4>
                x: ${Math.round(this.curr.x)} <br>
                y: ${Math.round(this.curr.y)} <br>

                <h4>Difference</h4>
                x: ${Math.round(this.difference.x)} <br>
                y: ${Math.round(this.difference.y)}

                <h4>Polar</h4>
                Distance: ${Math.round(this.distance(this.difference))} <br>
                Radian: ${this.radian(this.difference).toFixed(3)} <br>
                Degree: ${Math.round(this.degree(this.difference))}

                <h4>Misc</h4>
                Region: ${this.circularThreshold() && this.currentRegion()}
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

    onmousemove(event) {
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

new Coordinates(document.getElementById('app'), 35, 12)