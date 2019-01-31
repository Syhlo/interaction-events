//TODO:     Gesture handling? Track circular motion, zigzag, rectangular motion?
//TODO:     Debounce, throttle
//TODO:     Ability to ignore multitouch
//TODO:     Attach with prototype: .interaction({args}) (?)

export class InteractionEvents {
    constructor(element, treshold = 0) {
        this.element = element
        this.events = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']
        this.threshold = treshold
        this.initial = {}
        this.move = {}
        this.difference = {}
        this._mousedown = false

        // init
        this.attachEvents()
        this.info()
    }

    //?                             Event listeners & delegation
    attachEvents() {
        if ('ontouchstart' in window)
            this.events = this.events.concat('touchstart', 'touchmove', 'touchend')
        this.events.forEach(e => this.element.addEventListener(e, this, false))
    }

    handleEvent() {
        if (typeof this[`on${event.type}`] === 'function') {
            event.preventDefault()
            return this[`on${event.type}`](event)
        }
    }


    //?                             Interaction starting
    onmousedown() {
        this.setCoords('initial', event)
        this._mousedown = true
    }

    ontouchstart() {
        const touch = event.targetTouches.item(0)
        if (touch) {
            this.setCoords('initial', touch)
        }
    }


    //?                             Interaction occuring
    onmousemove() {
        if (this._mousedown) {
            this.setCoords('move', event)
            this.getDifference()
        }
    }

    ontouchmove() {
        const touch = event.targetTouches.item(0)
        if (touch) {
            this.setCoords('move', touch)
            this.getDifference()
        }
    }


    //?                             Interaction ended
    onmouseleave() {
        this._mousedown = false
    }

    onmouseup() {
        this._mousedown = false
    }

    ontouchend() {
        // TBD
    }


    //?                             Helper Methods
    setCoords(name, type) {
        this[name].x = type.clientX
        this[name].y = type.clientY
    }

    getDifference() {
        this.difference = {
            x: (this.initial.x - this.move.x),
            y: (this.initial.y - this.move.y)
        }
    }

    circularThreshold() {
        return Math.abs(this.distance(this.difference)) > this.threshold
    }

    distance({ x, y }) {
        return Math.sqrt(x * x + y * y)
    }

    radian({ x, y }) {
        return Math.atan2(y, x)
    }

    divideCircleEqually(numberOfParts) {
        const part = 360 / numberOfParts
        let arr = []
        if (numberOfParts > 1) {
            for (let i = 0; i < numberOfParts; i++) {
                if (numberOfParts % 2 !== 0) {
                    arr.push(((part * i)) + part)
                } else {
                    arr.push((part * i) + (part / 2))
                }
            }
        }
        return arr.length > 1 ? arr : false
    }

}