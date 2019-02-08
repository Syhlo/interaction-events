import { Regions } from './regions.js'

export class Events extends Regions {
    constructor(element, threshold) {
        super(threshold)
        this.element = element
    }

    //?                             Event listeners & delegation
    attachEvents() {
        let events = ['mousedown', 'mousemove', 'mouseup', 'mouseleave']
        if ('ontouchstart' in window)
            events = [...events, 'touchstart', 'touchmove', 'touchend']
        events.forEach(event => this.element.addEventListener(event, this, false))
    }

    handleEvent() {
        if (typeof this[`on${event.type}`] === 'function') {
            event.preventDefault()
            return this[`on${event.type}`](event)
        }
    }

}