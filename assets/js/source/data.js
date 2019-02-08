export class Data {
    constructor(threshold) {
        this.initial = {}
        this.curr = {}
        this.difference = {}
        this.threshold = threshold
    }

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