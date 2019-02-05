//TODO:     Gesture handling? Track circular motion, zigzag, rectangular motion?
//TODO:     Ability to ignore multitouch
//TODO:     Get velocity of movement

export class Interaction {
    constructor(element, treshold = 0, regions = 0) {
        this.element = element
        this.threshold = treshold
        this.initial = {}
        this.curr = {}
        this.difference = {}
        this.drag = false
        this.regions = this.createRegions(regions)

        // init
        this.attachEvents()
    }

    //?                             Event listeners & delegation
    attachEvents() {
        let events = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']
        if ('ontouchstart' in window)
            events = [this.events, 'touchstart', 'touchmove', 'touchend']
        events.forEach(e => this.element.addEventListener(e, this, false))
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
        this.drag = true
    }

    ontouchstart() {
        const touch = event.targetTouches.item(0)
        if (touch) {
            this.setCoords('initial', touch)
        }
    }


    //?                             Interaction occuring
    onmousemove() {
        if (this.drag) {
            this.setCoords('curr', event)
            this.getDifference()
        }
    }

    ontouchmove() {
        const touch = event.targetTouches.item(0)
        if (touch) {
            this.setCoords('curr', touch)
            this.getDifference()
        }
    }


    //?                             Interaction ended
    onmouseleave() {
        this.drag = false
    }

    onmouseup() {
        this.drag = false
    }

    ontouchend() {
        // TBD
    }


    //?                             Data methods
    distance({ x, y }) {
        return Math.sqrt(x * x + y * y)
    }

    radian({ x, y }) {
        return Math.atan2(y, x)
    }

    degree({ x, y }) {
        return (this.radian({ x, y }) * (180 / Math.PI) + 360) % 360
    }

    circularThreshold() {
        return Math.abs(this.distance(this.difference)) > this.threshold
    }

    inRegion(degree, region, regionEnd) {
        return ((degree - region) * (degree - regionEnd) <= 0)
    }


    //?                             Region methods
    createRegions(amount) {
        const region = 360 / amount
        return [...Array(amount)].map((_, index) => {
            return amount % 2 > 0 ? region * index : (region * index) + (region / 2)
        })
    }

    currentRegion() {
        const arr = this.regions
        const degree = this.degree(this.difference)
        for (let i = 0; i < arr.length; i++) {
            if (degree > arr[arr.length - 1] || degree < arr[0]) var result = arr.length - 1
            else if (this.inRegion(degree, arr[i], arr[i + 1])) var result = i
        }
        return result
    }

    //?                             Helper methods
    setCoords(name, type) {
        this[name].x = type.clientX
        this[name].y = type.clientY
    }

    getDifference() {
        this.difference = {
            x: (this.initial.x - this.curr.x),
            y: (this.initial.y - this.curr.y)
        }
    }

    degreeToCartesian(distance, degree) {
        const theta = degree * Math.PI / 180
        return {
            x: Math.round(distance * Math.cos(theta)),
            y: Math.round(distance * Math.sin(theta))
        }
    }
}