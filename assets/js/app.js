import { Interaction } from './events.js'

//?                                 Live information on interaction events
class Coordinates extends Interaction {
    constructor(element, threshold) {
        super(element, threshold)
        this.element = element

        // Init
        this.createCanvas(element)
        this.info()
    }

    //?                             Information Bar
    info(event) {
        document.getElementById('info').innerHTML = `
        <div class="row">
            <div>
                <h4>Origin</h4> 
                x: ${Math.round(this.initial.x)} <br>
                y: ${Math.round(this.initial.y)}
            </div>
            <div>
                <h4>Current</h4>
                x: ${Math.round(this.move.x)} <br>
                y: ${Math.round(this.move.y)} <br>
            </div>
            <div>
                <h4>Difference</h4>
                x: ${Math.round(this.difference.x)} <br>
                y: ${Math.round(this.difference.y)}
            </div>
        </div>
        <div class="row">
            <div>
                <h4>Events</h4>
                ${this.events.join('<br>')}
            </div>
            <div>
                <h4>Polar</h4>
                Distance: ${Math.round(this.distance(this.difference))} <br>
                Radian: ${this.radian(this.difference).toFixed(3)} <br>
                Degree: ${Math.round(this.degree(this.difference))}
            </div>
            <div>
                <h4>Misc</h4>
                Position: ${this.getRegion()}
            </div>
        </div>
        `
    }

    //?                             Helper Methods
    getRegion() {
        const arr = this.divideCircleEqually(11)
        console.log(arr)
        const degree = this.degree(this.difference)
        let result
        for (let i = 0; i < arr.length; i++) {
            if (degree > arr[arr.length - 1] || degree < arr[0]) result = arr.length - 1
            else if (this.inRegion(degree, arr[i], arr[i + 1])) result = i
        }
        return result
    }

    inRegion(degree, regionStart, regionEnd) {
        return ((degree - regionStart) * (degree - regionEnd) <= 0)
    }



    xIsLarger() {
        return Math.abs(this.difference.x) > Math.abs(this.difference.y)
    }

    // redo this
    moveDirection() {
        if (this.circularThreshold()) {
            return this.xIsLarger() ?
                this.difference.x > 0 ? 'left' : 'right'
                : this.difference.y > 0 ? 'up' : 'down'
        } else {
            return 'null'
        }
    }

    //?                             Polymorphs
    onmousedown() {
        super.onmousedown(event)
        this.generateRegions(11, 150)
        this.drawCircle(this.initial, 9, '#6B9F55')
    }

    ontouchstart(event) {
        super.ontouchstart(event)
        this.generateRegions(11, 150)
        this.drawCircle(this.initial, 9, '#6B9F55')
    }

    ontouchmove(event) {
        super.ontouchmove(event)
        this.info()
    }

    onmousemove(event) {
        super.onmousemove(event)
        if (this._mousedown) {
            this.info()
        }
    }

    onmouseup(event) {
        super.onmouseup(event)
        this.info()
        if (this.circularThreshold()) {
            this.drawCircle(this.move, 6, '#9F5555')
        }
    }

    ontouchend(event) {
        super.ontouchend(event)
        this.info()
        if (this.circularThreshold()) {
            this.drawCircle(this.move, 6, '#9F5555')
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
    generateRegions(numberOfParts, distance) {
        canvas.getContext('2d')
            .clearRect(0, 0, canvas.width, canvas.height)
        this.divideCircleEqually(numberOfParts)
            .forEach(item => this.drawLine(this.degreeToCartesian(distance, item)))
        this.drawCircle(this.initial, this.threshold, 'white', true)
    }

    drawLine({ x, y }) {
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(this.initial.x, this.initial.y)
        ctx.lineTo(this.initial.x - x, this.initial.y - y)
        ctx.strokeStyle = "#707070"
        ctx.stroke()
    }

    drawCircle({ x, y } = {}, rad, color = false, stroke = false) {
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(x, y, rad, 0, Math.PI * 2, false)
        ctx.fillStyle = color
        ctx.strokeStyle = "#707070"
        if (color) ctx.fill()
        if (stroke) ctx.stroke()
    }

}

new Coordinates(document.getElementById('app'), 40)