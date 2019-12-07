import React from "react"
import BuyStyle from "./BuyStyle"
import BuyColor from "./BuyColor"
import StyleSelector from "./StyleSelector"
import SubStyleSelector from "./SubStyleSelector"
import BarkingBot from "./BarkingBot"
import Collapsible from "./CollapsibleList"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStyleSelector: "lines",
            currentColorSelector: "#000000",
            currentRepeaterSelector: 1,
            currentCoins: 10000,
            bots: [],
            botsBought: 0,
            colorroulette: true,
            styleroulette: true,
            colors: {
                "#000000": true,
            },
            repeater: 1,
            shop: {
                bot: 100,
                color: 5,
                lines: 10,
                triangles: 10,
                squares: 10,
                rectangles: 10,
                points4: 10,
                points5: 10,
                circles: 10,
                filled: 100,
                repeater: 100,
                randomColor: 5,
            },

            styles: {
                lines: {
                    currentSubStyleSelector: "upperleft",
                    bought: true,
                    subStyles: {
                        upperleft: {
                            bought: true,
                            x: 0,
                            y: 0,
                        },
                        upperright: {
                            bought: true,
                            x: this.props.canvas.width,
                            y: 0,
                        },
                        bottomleft: {
                            bought: true,
                            x: 0,
                            y: this.props.canvas.height,
                        },
                        bottomright: {
                            bought: true,
                            x: this.props.canvas.width,
                            y: this.props.canvas.height,
                        },
                    },
                },
                triangles: {
                    currentSubStyleSelector: "simple",
                    bought: false,
                    subStyles: {
                        simple: {
                            bought: true
                        },
                        filled: {
                            bought: false
                        },
                    }
                },
                squares: {
                    currentSubStyleSelector: "simple",
                    bought: false,
                    subStyles: {
                        simple: {
                            bought: true
                        },
                        filled: {
                            bought: false
                        },
                    }
                },
                rectangles: {
                    currentSubStyleSelector: "simple",
                    bought: false,
                    subStyles: {
                        simple: {
                            bought: true
                        },
                        filled: {
                            bought: false
                        },
                    }
                },
                points4: {
                    currentSubStyleSelector: "simple",
                    bought: false,
                    subStyles: {
                        simple: {
                            bought: true
                        },
                        filled: {
                            bought: false
                        },
                    },
                },
                points5: {
                    currentSubStyleSelector: "simple",
                    bought: false,
                    subStyles: {
                        simple: {
                            bought: true
                        },
                        filled: {
                            bought: false
                        },
                    },
                },
                circles: {
                    currentSubStyleSelector: "simple",
                    bought: false,
                    subStyles: {
                        simple: {
                            bought: true
                        },
                        filled: {
                            bought: false
                        }
                    }
                },
            },
        }
        this.buy = this.buy.bind(this)
        this.draw = this.draw.bind(this)
        this.clear = this.clear.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.drawTriangle = this.drawTriangle.bind(this)
        this.drawSquare = this.drawSquare.bind(this)
        this.drawRectangle = this.drawRectangle.bind(this)
        this.drawPoints = this.drawPoints.bind(this)
        this.drawPoints4 = this.drawPoints4.bind(this)
        this.drawPoints5 = this.drawPoints5.bind(this)
        this.drawCircle = this.drawCircle.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState((prevState, props) => ({
                styles: {
                    ...prevState.styles,
                    lines: {
                        ...prevState.styles.lines,
                        subStyles: {
                            ...prevState.styles.lines.subStyles,
                            upperright: {
                                ...prevState.styles.lines.subStyles.upperright,
                                x: props.canvas.width
                            },
                            bottomleft: {
                                ...prevState.styles.lines.subStyles.bottomleft,
                                y: props.canvas.height
                            },
                            bottomright: {
                                ...prevState.styles.lines.subStyles.bottomright,
                                x: props.canvas.width,
                                y: props.canvas.height,
                            }

                        }
                    }
                }

            }))
        }
    }
    render() {
        return (
            <div id="App">
                <div id="main-screen">
                    <div className="add-shadow board">
                        <canvas
                            id="canvas"
                            ref="canvas"
                            width={this.props.canvas.width}
                            height={this.props.canvas.height}
                            onClick={() => this.draw(this.state.currentRepeaterSelector)}>
                        </canvas>
                        <Collapsible listClassName="controls" title='Controls'>
                            <input
                                ref="timesselector"
                                type="number"
                                defaultValue={this.currentRepeaterSelector}
                                onChange={() => this.handleOnChangeTimesSelector()}>
                            </input>
                            <input type="button" value="clear" onClick={this.clear} />
                            <p>Random style: </p>
                            <input
                                ref="styleroulette"
                                type="checkbox"
                                checked={this.state.styleroulette}
                                onChange={() => this.handleOnChangeStyleRoulette()} />
                            <p>Random color: </p>
                            <input
                                ref="colorroulette"
                                type="checkbox"
                                checked={this.state.colorroulette}
                                onChange={() => this.handleOnChangeColorRoulette()} />
                            <StyleSelector
                                ref="styleselector"
                                styles={this.state.styles}
                                onChange={() => this.handleOnChangeStyleSelector()} />
                            <SubStyleSelector
                                ref="substyleselector"
                                styles={this.state.styles}
                                onChange={() => this.handleOnChangeSubStyleSelector()}
                                currentStyleSelector={this.state.currentStyleSelector} />

                            <select ref="colorselector" onChange={this.handleOnChangeColorSelector}>
                                {Object.keys(this.state.colors).map((x) => <option
                                    key={x}
                                    value={x}
                                    style={{ backgroundColor: x }}>
                                    {x}
                                </option>)}
                            </select>
                        </Collapsible>
                    </div>
                    <div className="add-shadow store">
                        <div className="coins">Coins: {this.state.currentCoins}</div>
                        <BuyStyle styles={this.state.styles} onClick={this.buy} />
                        <BuyColor ref="color" onClick={this.buy} />
                    </div>
                </div>
                {this.state.botsBought > 0 &&
                    <div className="bots-container">{this.state.bots.map((key) => {
                        return <BarkingBot botId={`bot${key}`} colors={this.state.colors} styles={this.state.styles} botsBought={this.state.botsBought} onClick={() => this.handleOnClickBot()} />
                    })}</div>
                }
            </div>
        )
    }

    handleOnChangeTimesSelector() {
        if (this.refs.timesselector.value > this.state.repeater) { this.refs.timesselector.value = this.state.repeater }
        this.setState({ currentRepeaterSelector: this.refs.timesselector.value })
    }

    handleOnChangeStyleSelector() {
        this.setState({ currentStyleSelector: this.refs.styleselector.value, })
    }

    handleOnChangeSubStyleSelector() {
        let mainStyle = this.refs.styleselector.value
        this.setState((prevState) => ({
            styles: {
                ...prevState.styles,
                [mainStyle]: {
                    ...prevState.styles[mainStyle],
                    currentSubStyleSelector: this.refs.substyleselector.value
                }
            }
        }))
    }

    handleOnChangeColorSelector() {
        this.setState({ currentColorSelector: this.refs.colorselector.value })
    }

    handleOnChangeStyleRoulette() {
        this.setState((state) => state.styleroulette = !state.styleroulette)
    }
    handleOnChangeColorRoulette() {
        this.setState((state) => state.colorroulette = !state.colorroulette)
    }

    buy(event) {
        let item = event.target.attributes.buy.nodeValue

        if (this.state.currentCoins < this.state.shop[item]) {
            alert("You don't have enough borkCoins, BORK")
        }
        else {
            if (item === "color") {
                let colorBought = this.refs.color.value
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop.color))
                this.setState((prevState => ({
                    colors: {
                        ...prevState.colors,
                        [colorBought]: true,
                    }
                })))
            }
            else if (item === "random-color") {
                let r = rgbToHex(random(256))
                let g = rgbToHex(random(256))
                let b = rgbToHex(random(256))
                let colorBought = `#${r}${g}${b}`
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop.randomColor))
                this.setState((prevState => ({
                    colors: {
                        ...prevState.colors,
                        [colorBought]: true,
                    }
                })))

            }
            else if (item === "filled") {
                let styleFamily = event.target.attributes.stylefamily.nodeValue
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop[item]))
                this.setState((prevState) => ({
                    styles: {
                        ...prevState.styles,
                        [styleFamily]: {
                            ...prevState.styles[styleFamily],
                            subStyles: {
                                ...prevState.styles[styleFamily].subStyles,
                                [item]: {
                                    ...prevState.styles[styleFamily].subStyles[item],
                                    bought: true
                                }
                            }
                        }
                    }
                }))
            }
            else if (item === "repeater") {
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop.repeater))
                this.setState((state) => (state.repeater++))
            }
            else if (item === "bot") {
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop.bot))
                this.setState((state) => (state.botsBought++))
                let bots = this.state.bots
                bots.push(bots.length)
                this.setState({ bots: bots })
            }
            else {
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop[item]))
                this.setState((prevState) => ({
                    styles: {
                        ...prevState.styles,
                        [item]: {
                            ...prevState.styles[item],
                            bought: true
                        }
                    }
                }))
            }
        }
    }

    draw(times) {
        let ctx = this.refs.canvas.getContext("2d")
        let drawingFunctions = {
            "lines": this.drawLine,
            "triangles": this.drawTriangle,
            "squares": this.drawSquare,
            "rectangles": this.drawRectangle,
            "points4": this.drawPoints4,
            "points5": this.drawPoints5,
            "circles": this.drawCircle,
        }

        for (let i = 0; i < times; i++) {
            let chosenColor = this.state.currentColorSelector
            let chosenStyle = this.state.currentStyleSelector
            let chosenSubStyle = this.state.styles[chosenStyle].currentSubStyleSelector
            this.setState((state) => state.currentCoins++)
            if (this.state.colorroulette === true) {
                let colorArray = Object.keys(this.state.colors)
                let randomIndex = Math.floor(Math.random() * colorArray.length)
                chosenColor = colorArray[randomIndex]
            }

            if (this.state.styleroulette === true) {
                let styleArray = Object.keys(this.state.styles)
                let boughtStyles = []
                styleArray.forEach((x) => {
                    if (this.state.styles[x].bought === true) { boughtStyles.push(x) }
                })
                let randomIndex = Math.floor(Math.random() * boughtStyles.length)
                chosenStyle = boughtStyles[randomIndex]

                let subStyleArray = Object.keys(this.state.styles[chosenStyle].subStyles)
                let boughtSubStyles = []
                subStyleArray.forEach((x) => {
                    if (this.state.styles[chosenStyle].bought === true) { boughtSubStyles.push(x) }
                })
                let anotherRandomIndex = Math.floor(Math.random() * boughtSubStyles.length)
                chosenSubStyle = boughtSubStyles[anotherRandomIndex]
            }
            drawingFunctions[chosenStyle](chosenColor, chosenSubStyle, ctx, random(this.props.canvas.width), random(this.props.canvas.height))
        }
    }

    clear() {
        let ctx = this.refs.canvas.getContext("2d")
        ctx.clearRect(0, 0, this.props.canvas.width, this.props.canvas.height);
    }

    drawLine(color, subStyle, context, x, y) {
        context.strokeStyle = color
        context.beginPath();
        context.moveTo(this.state.styles.lines.subStyles[subStyle].x, this.state.styles.lines.subStyles[subStyle].y)
        context.lineTo(x, y);
        context.stroke();
    }

    drawTriangle(color, subStyle, context, x, y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height));
        context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height));
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

    drawPoints(number, context, x, y) {
        context.beginPath();
        context.moveTo(x, y);
        for (let i = 0; i < number; i++) { context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height)); }
        context.lineTo(x, y);
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
}

function random(range) {
    let randomNumber = (Math.floor(Math.random() * range))
    return randomNumber
}

function rgbToHex(number) {
    var hex = Number(number).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

export default App