import React from 'react'

class BarkingBot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
        }
        this.oneAction = this.oneAction.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.drawTriangle = this.drawTriangle.bind(this)
        this.drawPoints4 = this.drawPoints4.bind(this)
        this.drawPoints5 = this.drawPoints5.bind(this)
        this.handleClear = this.handleClear.bind(this)

    }

    handleOnClickBot() {
        this.setState((state) => ({ paused: !state.paused}))
    }

    handleClear() {
        let ctx = this.refs[this.props.botId].getContext("2d")
        ctx.clearRect(0, 0, this.refs[this.props.botId].width, this.refs[this.props.botId].height);
    }

    oneAction() {
        if (this.state.paused === true) { return "" }
        else {
            let botId = this.props.botId
            let ctx = this.refs[botId].getContext("2d")
            
            let stylesArray = Object.keys(this.state.styles)
            let randomStyleIndex = Math.floor(Math.random() * stylesArray.length)
            let randomStyle = stylesArray[randomStyleIndex]

            let subStylesArray = Object.keys(this.state.styles[randomStyle])
            let randomSubStyleIndex = Math.floor(Math.random() * subStylesArray.length)
            let randomSubStyle = this.state.styles[randomStyle][randomSubStyleIndex]

            let colorArray = Object.keys(this.props.colors)
            let randomColorIndex = Math.floor(Math.random() * colorArray.length)
            let randomColor = colorArray[randomColorIndex]

            let drawingFunctions = {
                "lines": this.drawLine,
                "triangles": this.drawTriangle,
                "squares": this.drawSquare,
                "rectangles": this.drawRectangle,
                "points4": this.drawPoints4,
                "points5": this.drawPoints5,
                "circles": this.drawCircle,
            }
            
            drawingFunctions[randomStyle](randomColor, randomSubStyle, ctx, random(this.refs[botId].width), random(this.refs[botId].height))
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.styles !== this.props.styles) {
            let stylesBought = []
            Object.keys(this.props.styles).map((x) => { if (this.props.styles[x].bought === true) { stylesBought.push(x) } })
            stylesBought.map((key) => {
                let subStylesOf = Object.keys(this.props.styles[key].subStyles)
                let subStylesOfBought = []
                subStylesOf.map((otherKey) => { if (this.props.styles[key].subStyles[otherKey].bought === true) { subStylesOfBought.push(otherKey) } })
                this.setState((prevState) => ({
                    styles: {
                        ...prevState.styles,
                        [key]: subStylesOfBought
                    }
                }))
            })
        }
    }

    componentDidMount() {
        let stylesBought = []
        Object.keys(this.props.styles).map((x) => { if (this.props.styles[x].bought === true) { stylesBought.push(x) } })
        stylesBought.map((key) => {
            let subStylesOf = Object.keys(this.props.styles[key].subStyles)
            let subStylesOfBought = []
            subStylesOf.map((otherKey) => { if (this.props.styles[key].subStyles[otherKey].bought === true) { subStylesOfBought.push(otherKey) } })
            console.log(subStylesOfBought)
            this.setState((prevState) => ({
                styles: {
                    ...prevState.styles,
                    [key]: subStylesOfBought
                }
            }))
        })
        setInterval(() => { this.oneAction() }, 1000)
    }

    
    drawLine(color, subStyle, context, x, y) {
        context.strokeStyle = color
        context.beginPath();
        context.moveTo(this.props.styles.lines.subStyles[subStyle].x, this.props.styles.lines.subStyles[subStyle].y)
        context.lineTo(x, y);
        context.stroke();
    }

    drawTriangle(color, subStyle, context, x, y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(random(this.refs[this.props.botId].width), random(this.refs[this.props.botId].height));
        context.lineTo(random(this.refs[this.props.botId].width), random(this.refs[this.props.botId].height));
        context.lineTo(x, y);
        if (subStyle === "simple") {
            context.strokeStyle = color
            context.stroke()
        }
        else if (subStyle === "filled") {
            context.fillStyle = color
            context.fill()
        }
    }

    drawSquare(color, subStyle, context, x, y) {
        if (subStyle === "simple") {
            context.strokeStyle = color
            context.strokeRect(x, y, 75, 75)
        }
        else if (subStyle === "filled") {
            context.fillStyle = color
            context.fillRect(x, y, 75, 75)
        }
    }

    drawRectangle(color, subStyle, context, x, y) {
        if (subStyle === "simple") {
            context.strokeStyle = color
            context.strokeRect(x, y, 150, 75)
        }
        else if (subStyle === "filled") {
            context.fillStyle = color
            context.fillRect(x, y, 150, 75)
        }
    }

    drawPoints4(color, subStyle, context, x, y) {
        this.drawPoints(4, context, x, y)
        if (subStyle === "simple") {
            context.strokeStyle = color
            context.stroke()
        }
        else if (subStyle === "filled") {
            context.fillStyle = color
            context.fill()
        }
    }

    drawPoints5(color, subStyle, context, x, y) {
        this.drawPoints(5, context, x, y)
        if (subStyle === "simple") {
            context.strokeStyle = color
            context.stroke()
        }
        else if (subStyle === "filled") {
            context.fillStyle = color
            context.fill()
        }
    }

    drawPoints(number, context, x, y) {
        context.beginPath();
        context.moveTo(x, y);
        for (let i = 0; i < number; i++) { context.lineTo(random(this.refs[this.props.botId].width), random(this.refs[this.props.botId].height)); }
        context.lineTo(x, y);
    }

    drawCircle(color, subStyle, context, x, y) {
        context.beginPath();
        context.arc(x, y, 40, 0, 2 * Math.PI);
        if (subStyle === "simple") {
            context.strokeStyle = color
            context.stroke()
        }
        else if (subStyle === "filled") {
            context.fillStyle = color
            context.fill()
        }
    }

    render() {
        return (
            <div>
            <canvas className="bot" ref={this.props.botId} width="500" height="500" onClick={() => this.handleOnClickBot()} />
            <input type="button" value="Clear" onClick={() => this.handleClear()}/>
            </div>
        )
    }
}

export default BarkingBot

function random(range) {
    let randomNumber = (Math.floor(Math.random() * range))
    return randomNumber
}
