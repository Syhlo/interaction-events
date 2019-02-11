import { Events } from './events.js'

export class Interact extends Events {
    constructor(element) {
        super(element)
        this.drag = false
        this.events = {
            start: () => { },
            move: () => { },
            end: () => { }
        }
        this.attachEvents()
    }

    //?                             Interaction starting
    onmousedown() {
        this.setCoords('initial', event)
        this.drag = true
        this.events.start()
    }

    ontouchstart() {
        if (event.targetTouches.item(0)) {
            this.setCoords('initial', touch)
            this.events.start()
        }
    }

    //?                             Interaction occuring
    onmousemove() {
        if (this.drag) {
            super.onmousemove()
            this.setCoords('current', event)
            this.getDifference()
            this.events.move()
        }
    }

    ontouchmove() {
        if (event.targetTouches.item(0)) {
            this.setCoords('current', touch)
            this.getDifference()
            this.events.move()
        }
    }

    //?                             Interaction ended
    onmouseleave() {
        if (this.drag) {
            this.drag = false
            this.events.end()
        }
    }

    onmouseup() {
        if (this.drag) {
            this.drag = false
            this.events.end()
        }
    }

    ontouchend() {
        this.events.end()
    }
}