import React from 'react'
import Collapsible from './CollapsibleList'

class BarkingBot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
            checkedStyles: {
                lines: {
                    available: true,
                    subStyles: {
                        upperleft: true,
                        upperright: true,
                        bottomleft: true,
                        bottomright: true
                    }
                },
                triangles: {
                    available: false,
                    subStyles: {
                        simple: false,
                        filled: false
                    }
                },
                squares: {
                    available: false,
                    subStyles: {
                        simple: false,
                        filled: false
                    }
                },
                rectangles: {
                    available: false,
                    subStyles: {
                        simple: false,
                        filled: false
                    }
                },
                points4: {
                    available: false,
                    subStyles: {
                        simple: false,
                        filled: false
                    }
                },
                points5: {
                    available: false,
                    subStyles: {
                        simple: false,
                        filled: false
                    }
                },
                circles: {
                    available: false,
                    subStyles: {
                        simple: false,
                        filled: false
                    }
                },
            }
        }
        this.oneAction = this.oneAction.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.drawTriangle = this.drawTriangle.bind(this)
        this.drawPoints4 = this.drawPoints4.bind(this)
        this.drawPoints5 = this.drawPoints5.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleOnClickBot = this.handleOnClickBot.bind(this)
        this.handleOnChangeCheckbox = this.handleOnChangeCheckbox.bind(this)
    }

    handleOnClickBot() {
        this.setState((state) => ({ paused: !state.paused }))
    }

    handleClear() {
        let ctx = this.refs[this.props.botId].getContext("2d")
        ctx.clearRect(0, 0, this.refs[this.props.botId].width, this.refs[this.props.botId].height);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.styles !== this.props.styles) {
            let stylesBought = []
            Object.keys(this.props.styles).forEach((key) => { if (this.props.styles[key].bought === true) { stylesBought.push(key) } })
            stylesBought.forEach((key) => {
                this.setState((prevState) => ({
                    checkedStyles: {
                        ...prevState.checkedStyles,
                        [key]: {
                            ...prevState.checkedStyles[key],
                            available: true
                        }

                    }
                }))

                let subStylesOf = Object.keys(this.props.styles[key].subStyles)
                subStylesOf.forEach((otherKey) => {
                    if (this.props.styles[key].subStyles[otherKey].bought === true) {
                        this.setState((prevState) => ({
                            checkedStyles: {
                                ...prevState.checkedStyles,
                                [key]: {
                                    ...prevState.checkedStyles[key],
                                    subStyles: {
                                        ...prevState.checkedStyles[key].subStyles,
                                        [otherKey]: true
                                    }
                                }

                            }
                        }))
                    }
                })
            })
        }
    }

    componentDidMount() {
        setInterval(() => { this.oneAction() }, 1000)
    }

    oneAction() {
        if (this.state.paused === true) { return "" }
        else {
            let botId = this.props.botId
            let ctx = this.refs[botId].getContext("2d")

            let checkedStyles = []
            Object.keys(this.state.checkedStyles).forEach((key) => { if (this.state.checkedStyles[key].available === true) { checkedStyles.push(key) } })
            if (checkedStyles.length === 0) { return }
            let randomStyleIndex = random(checkedStyles.length)
            let randomStyle = checkedStyles[randomStyleIndex]

            let checkedSubstyles = []
            Object.keys(this.state.checkedStyles[randomStyle].subStyles).forEach((key) => { if (this.state.checkedStyles[randomStyle].subStyles[key] === true) { checkedSubstyles.push(key) } })
            if (checkedSubstyles.length === 0) { return }
            let randomSubStyleIndex = random(checkedSubstyles.length)
            let randomSubStyle = checkedSubstyles[randomSubStyleIndex]

            let colorArray = Object.keys(this.props.colors)
            let randomColorIndex = random(colorArray.length)
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

    handleOnChangeCheckbox(event) {
        let clickedStyle = event.target.value
        if (clickedStyle === "substyle") {
            let mainStyle = event.target.attributes.mainstyle.value
            let subStyle = event.target.attributes.substyle.value
            let toggledValue = !this.state.checkedStyles[mainStyle].subStyles[subStyle]
            this.setState((prevState) => ({
                checkedStyles: {
                    ...prevState.checkedStyles,
                    [mainStyle]: {
                        ...prevState.checkedStyles[mainStyle],
                        subStyles: {
                            ...prevState.checkedStyles[mainStyle].subStyles,
                            [subStyle]: toggledValue
                        }
                    }
                }
            }))

        }

        else {
            let toggledValue = !this.state.checkedStyles[clickedStyle].available
            this.setState((prevState) => ({
                checkedStyles: {
                    ...prevState.checkedStyles,
                    [clickedStyle]: {
                        ...prevState.checkedStyles[clickedStyle],
                        available: toggledValue
                    }
                }
            }));
        }
    }

    render() {
        return (
            <div className="add-shadow bot-board">
                <canvas className="bot" ref={this.props.botId} width="500" height="500" onClick={() => this.handleOnClickBot()} />
                <Collapsible listClassName="available-styles" title="Available styles">
                    <ul className="unsorted-list">{Object.keys(this.props.styles).map((key) => {
                        if (this.props.styles[key].bought === true) {
                            return <Collapsible title={key}>
                                <div className="bot-style-list">
                                    <div className="bot-style" key={key}>
                                        {key}
                                        <input type="checkbox" checked={this.state.checkedStyles[key].available} value={key} onChange={this.handleOnChangeCheckbox} />
                                    </div>
                                    {Object.keys(this.props.styles[key].subStyles).map((anotherKey) => {
                                        return <div className="bot-style" key={anotherKey}>{anotherKey} <input type="checkbox" value="substyle" mainstyle={key} substyle={anotherKey} disabled={!this.state.checkedStyles[key].available} checked={this.state.checkedStyles[key].subStyles[anotherKey]} onChange={this.handleOnChangeCheckbox} /></div>
                                    })}
                                </div>
                            </Collapsible>
                        }
                        return ""
                    })}</ul>
                </Collapsible>
                <input type="button" value="Clear" onClick={() => this.handleClear()} />
            </div >
        )
    }
}

export default BarkingBot

function random(range) {
    let randomNumber = (Math.floor(Math.random() * range))
    return randomNumber
}
