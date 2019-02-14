import { Data } from './data.js'

export class Regions extends Data {
    constructor() {
        super()
        this.regions
        this.currentRegion
    }

    createRegions(amount) {
        const region = 360 / amount
        this.regions = [...Array(amount)].map((_, index) =>
            amount % 2 > 0 ? (region * index) : (region * index) + (region / 2)
        )
    }

    getCurrentRegion(degree) {
        return this.regions.reduce((prev, next, index) =>
            this.inRegion(degree, prev, next) ? next = { region: index } :
                prev.region ? prev : next
        ).region || this.regions.length
    }

    inRegion(degree, region, regionEnd) {
        return ((degree - region) * (degree - regionEnd) <= 0)
    }

    // polymorph to send down flow
    onmousemove() {
        if (this.regions) {
            this.currentRegion = this.getCurrentRegion(this.degree(this.difference))
        }
    }

    ontouchmove() {
        if (this.regions) {
            this.currentRegion = this.getCurrentRegion(this.degree(this.difference))
        }
    }

}