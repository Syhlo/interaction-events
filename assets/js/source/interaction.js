import { Events } from './events.js'

export class Interaction extends Events {
    constructor(element, threshold = 0) {
        super(element, threshold)
        this.drag = false
        this.attachEvents()
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
    onmousemove(event) {
        if (this.drag) {
            super.onmousemove()
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
}