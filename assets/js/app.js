import { InteractionEvents } from './events.js'

//?                                 Live information on interaction events
class Coordinates extends InteractionEvents {
    constructor(element, threshold) {
        super(element, threshold)
        this.element = element

        // Init
        this.createCanvas(element)
        this.info()
    }

    //?                             Canvas Creation
    createCanvas(element) {
        const canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.width = element.clientWidth
        canvas.height = element.clientHeight
        element.append(canvas)
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
                Degree: ${Math.round(this.radianToDegree(this.difference))}
            </div>
            <div>
                <h4>Misc</h4>
                Position: ${this.moveDirection()}
            </div>
        </div>
        `
    }

    //?                             Helper Methods
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
        this.drawCrosshair(this.initial, 200)
        this.drawCircle(this.initial, 'green', 10)
    }

    ontouchstart(event) {
        super.ontouchstart(event)
        this.drawCrosshair(this.initial, 200)
        this.drawCircle(this.initial, 'green', 10)
    }

    ontouchmove(event) {
        super.ontouchmove(event)
        this.info()
    }

    onmousemove(event) {
        super.onmousemove(event)
        if (this._mousedown) this.info()
    }

    onmouseup(event) {
        super.onmouseup(event)
        this.info()
        if (this.circularThreshold()) {
            this.drawCircle(this.move, 'red', 10)
        }
    }

    ontouchend(event) {
        super.ontouchend(event)
        this.info()
        if (this.circularThreshold()) {
            this.drawCircle(this.move, 'red', 10)
        }
    }

    //?                             Canvas Draw
    drawCrosshair({ x, y } = {}, length) {
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.moveTo(x + length, y + length)
        ctx.lineTo(x - length, y - length)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x - length, y + length)
        ctx.lineTo(x + length, y - length)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x, y, this.threshold, 0, Math.PI * 2, false)
        ctx.stroke()
    }

    drawCircle({ x, y } = {}, color, rad) {
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(x, y, rad, 0, Math.PI * 2, false)
        ctx.fillStyle = color
        ctx.fill()
    }

}

new Coordinates(document.getElementById('app'), 40)