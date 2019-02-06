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
            events = [...events, 'touchstart', 'touchmove', 'touchend']
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
        return this.distance(this.difference) > this.threshold
    }

    inRegion(degree, region, regionEnd) {
        return ((degree - region) * (degree - regionEnd) <= 0)
    }


    //?                             Region methods
    createRegions(amount) {
        const region = 360 / amount
        return [...Array(amount)].map((_, index) =>
            amount % 2 > 0 ? (region * index) : (region * index) + (region / 2)
        )
    }

    currentRegion() {
        const degree = this.degree(this.difference)
        return this.regions.reduce((prev, next, index) => {
            if (this.inRegion(degree, prev, next)) next = { region: index }
            return Object.keys(prev).includes('region') ? prev : next
        }).region || 0
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
        return {
            x: distance * Math.cos(degree * Math.PI / 180),
            y: distance * Math.sin(degree * Math.PI / 180)
        }
    }
}