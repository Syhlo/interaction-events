export class Canvas {
    constructor(element) {
        // Init Canvas element
        this.createCanvas(element)
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
    // Draws the regions to the canvas
    regions(distance, interactVariable) {
        // Clear the canvas each time regions is called
        canvas.getContext('2d')
            .clearRect(0, 0, canvas.width, canvas.height)

        // Create lines separating the regions
        interactVariable.regions
            .forEach(item => this.line(interactVariable.degreeToCartesian(distance, item), interactVariable))

        // Generate a circle to display the threshold
        this.circle(interactVariable.initial, interactVariable.threshold, getComputedStyle(document.body).backgroundColor, true)
    }

    // Draw a line
    line({ x, y }, interactVariable) {
        // Set context and begin drawing
        let ctx = canvas.getContext('2d')
        ctx.beginPath()

        // Move to initial point
        ctx.moveTo(interactVariable.initial.x, interactVariable.initial.y)

        // Draw line to the given coordinates
        ctx.lineTo(interactVariable.initial.x - x, interactVariable.initial.y - y)

        // Set the stroke to info's font color
        ctx.strokeStyle = getComputedStyle(document.getElementById('info')).color

        // Draw stroke
        ctx.stroke()
    }

    // Draw a circle given coords and color
    circle({ x, y } = {}, rad, color = false, stroke = false) {
        // Set context and begin drawing
        let ctx = canvas.getContext('2d')
        ctx.beginPath()

        // Draw a circle at the given coords
        ctx.arc(x, y, rad, 0, Math.PI * 2, false)

        // Set the fill color to the given color (transparent if none)
        ctx.fillStyle = color

        // Set the stroke to info's font color
        ctx.strokeStyle = getComputedStyle(document.getElementById('info')).color

        // Draw the Fill and Stroke
        if (color) ctx.fill()
        if (stroke) ctx.stroke()
    }
}