import React from "react"
import BuyStyle from "./BuyStyle"
import BuyColor from "./BuyColor"
import StyleSelector from "./StyleSelector"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStyleSelector: "lines",
            currentColorSelector: "#000000",
            currentTimesSelector: 1,
            currentCoins: 0,
            colorroulette: true,
            styleroulette: true,
            colors: {
                "#000000": true,
            },
            repeater: 1,
            shop: {
                color: 5,
                lines: 10,
                triangles: 10,
                squares: 10,
                rectangles: 10,
                points4: 10,
                points5: 10,
                circles: 10,
                filled: 100,
                repeater: 2,
            },
            styles: {
                lines: {
                    currentLineStyle: "upperleft",
                    bought: true,
                    filled: {
                        bought: true
                    },
                    upperleft: {
                        bought: true,
                        x: 0,
                        y: 0,
                    },
                    upperright: {
                        bought: false,

                        x: this.props.canvas.width,
                        y: 0,
                    },
                    bottomleft: {
                        bought: false,

                        x: 0,
                        y: this.props.canvas.height,
                    },
                    bottomright: {
                        bought: false,

                        x: this.props.canvas.width,
                        y: this.props.canvas.height,
                    }
                },
                triangles: {
                    currentTriangleStyle: "simple",
                    bought: false,
                    simple: {
                        bought: true
                    },
                    filled: {
                        bought: false
                    },
                },
                squares: {
                    currentSquareStyle: "simple",
                    bought: false,
                    simple: {
                        bought: true
                    },
                    filled: {
                        bought: false
                    },
                },
                rectangles: {
                    currentRectangleStyle: "simple",
                    bought: false,
                    simple: {
                        bought: true
                    },
                    filled: {
                        bought: false
                    },
                },
                points4: {
                    currentPoints4Style: "simple",
                    bought: false,
                    simple: {
                        bought: true
                    },
                    filled: {
                        bought: false
                    },
                },
                points5: {
                    currentPoints5Style: "simple",
                    bought: false,
                    simple: {
                        bought: true
                    },
                    filled: {
                        bought: false
                    },
                },
                circles: {
                    currentCircleStyle: "simple",
                    bought: false,
                    simple: {
                        bought: true
                    },
                    filled: {
                        bought: false
                    }
                },
            },
        }
        this.buy = this.buy.bind(this)
        this.draw = this.draw.bind(this)
        this.clear = this.clear.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.drawTriangle = this.drawTriangle.bind(this)
        this.drawTriangleSimple = this.drawTriangleSimple.bind(this)
        this.drawTriangleFilled = this.drawTriangleFilled.bind(this)
        this.drawSquare = this.drawSquare.bind(this)
        this.drawRectangle = this.drawRectangle.bind(this)
        this.drawPoints = this.drawPoints.bind(this)
        this.drawPoints4 = this.drawPoints4.bind(this)
        this.drawPoints5 = this.drawPoints5.bind(this)
        this.drawCircle = this.drawCircle.bind(this)
        this.drawGradient = this.drawGradient.bind(this)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="App">
                <h1 className="add-shadow">🐶 Barking Board 🐕</h1>
                <div id="main-screen">
                    <div className="add-shadow board">
                        <canvas
                            ref="canvas"
                            id="barking-board"
                            width={this.props.canvas.width}
                            height={this.props.canvas.height} >
                        </canvas>
                        <div className="controls">
                            <input
                                ref="timesselector"
                                type="number"
                                defaultValue={this.currentTimesSelector}
                                onChange={() => this.handleOnChangeTimesSelector()}>
                            </input>
                            <input type="button" value="draw" onClick={() => this.draw(this.state.currentTimesSelector)} />
                            <input type="button" value="clear" onClick={this.clear} />
                            <a>Random style: </a>
                            <input
                                ref="styleroulette"
                                type="checkbox"
                                checked={this.state.styleroulette}
                                onChange={() => this.handleOnChangeStyleRoulette()} />
                            <a>Random color: </a>
                            <input
                                ref="colorroulette"
                                type="checkbox"
                                checked={this.state.colorroulette}
                                onChange={() => this.handleOnChangeColorRoulette()} />
                            <StyleSelector
                                ref="styleselector"
                                styles={this.state.styles}
                                currentStyleSelector={this.state.currentStyleSelector}
                                onChange={() => this.handleOnChangeStyleSelector()}
                                onChangeLineStyleSelector={() => this.handleOnChangeLineStyleSelector()}
                                onChangeSquareStyleSelector={() => this.handleOnChangeSquareStyleSelector()}
                                onChangeRectangleStyleSelector={() => this.handleOnChangeRectangleStyleSelector()}
                                onChangeCircleStyleSelector={() => this.handleOnChangeCircleStyleSelector()} 
                                onChangeTriangleStyleSelector={() => this.handleOnChangeTriangleStyleSelector()} 
                                onChangePoints4StyleSelector={() => this.handleOnChangePoints4StyleSelector()} 
                                onChangePoints5StyleSelector={() => this.handleOnChangePoints5StyleSelector()} />
                            <select ref="colorselector" onChange={this.handleOnChangeColorSelector}>
                                {Object.keys(this.state.colors).map((x) => <option
                                    key={x}
                                    value={x}
                                    style={{ backgroundColor: x }}
                                >
                                    {x}
                                </option>)}
                            </select>`
                        </div>
                    </div>
                    <div className="add-shadow store">
                        <div className="coins">Coins: {this.state.currentCoins}</div>
                        <BuyStyle styles={this.state.styles} onClick={this.buy} />
                        <BuyColor ref="color" onClick={this.buy} />
                    </div>
                </div>
            </div>
        )
    }

    handleOnChangeTimesSelector() {
        if(this.refs.timesselector.value > this.state.repeater) {this.refs.timesselector.value = this.state.repeater}
        this.setState({ currentTimesSelector: this.refs.timesselector.value })
    }

    handleOnChangeStyleSelector() {
        this.setState({ currentStyleSelector: this.refs.styleselector.refs.stylelist.value })
    }

    handleOnChangeLineStyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                lines: {
                    ...prevState.styles.lines,
                    currentLineStyle: this.refs.styleselector.refs.linestyles.refs.linestyleselector.value
                }
            }
        })))

    }

    handleOnChangeTriangleStyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                triangles: {
                    ...prevState.styles.triangles,
                    currentTriangleStyle: this.refs.styleselector.refs.trianglestyles.refs.trianglestyleselector.value
                }
            }
        })))
    }

    handleOnChangeSquareStyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                squares: {
                    ...prevState.styles.squares,
                    currentSquareStyle: this.refs.styleselector.refs.squarestyles.refs.squarestyleselector.value
                }
            }
        })))
    }

    handleOnChangeRectangleStyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                rectangles: {
                    ...prevState.styles.rectangles,
                    currentRectangleStyle: this.refs.styleselector.refs.rectanglestyles.refs.rectanglestyleselector.value
                }
            }
        })))
    }

    handleOnChangeCircleStyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                circles: {
                    ...prevState.styles.circles,
                    currentCircleStyle: this.refs.styleselector.refs.circlestyles.refs.circlestyleselector.value
                }
            }
        })))
    }

    handleOnChangePoints4StyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                points4: {
                    ...prevState.styles.points4,
                    currentPoints4Style: this.refs.styleselector.refs.points4styles.refs.points4styleselector.value
                }
            }
        })))
    }

    handleOnChangePoints5StyleSelector() {
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                points5: {
                    ...prevState.styles.points5,
                    currentPoints5Style: this.refs.styleselector.refs.points5styles.refs.points5styleselector.value
                }
            }
        })))
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
                let colorBought = this.refs.color.refs.color.value
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop.color))
                this.setState((prevState => ({
                    colors: {
                        ...prevState.colors,
                        [colorBought]: true
                    }
                })))
            }
            else if (item === "filled") {
                let styleFamily = event.target.attributes.styleFamily.nodeValue
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop[item]))
                this.setState((state) => ({
                    styles: Object.assign({}, state.styles, {
                        [styleFamily]: Object.assign({}, state.styles[styleFamily], {
                            [item]: Object.assign({}, state.styles[styleFamily][item], {
                                bought: true
                            })
                        })
                    })
                }))
            }
            else if (item === "repeater") {
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop.repeater))
                this.setState((state) => (state.shop.repeater= (state.shop.repeater*state.shop.repeater)/2))
                this.setState((state) => (state.repeater++))
            }
            else {
                this.setState((state) => (state.currentCoins = state.currentCoins - state.shop[item]))
                this.setState((state) => ({
                    styles: Object.assign({}, state.styles, {
                        [item]: Object.assign({}, state.styles[item], {
                            bought: true,
                        })
                    })
                }))
            }
        }
    }

    draw(times) {
        let chosenColor = this.state.currentColorSelector
        let chosenStyle = this.state.currentStyleSelector
        let functions = {
            "lines": this.drawLine,
            "circles": this.drawCircle,
            "triangles": this.drawTriangle,
            "squares": this.drawSquare,
            "rectangles": this.drawRectangle,
            "gradients": this.drawGradient,
            "points4": this.drawPoints4,
            "points5": this.drawPoints5,
        }

        for (let i = 0; i < times; i++) {
            this.setState((state) => state.currentCoins++)

            if (this.state.colorroulette === true) {
                let colorArray = Object.keys(this.state.colors)
                let randomIndex = Math.floor(Math.random() * colorArray.length)
                chosenColor = colorArray[randomIndex]
            }

            if (this.state.styleroulette === true) {
                let styleArray = Object.keys(this.state.styles)
                let boughtStyles = []
                styleArray.map((x) => {
                    if (this.state.styles[x].bought === true) { boughtStyles.push(x) }
                })
                let randomIndex = Math.floor(Math.random() * boughtStyles.length)
                chosenStyle = boughtStyles[randomIndex]
            }
            functions[chosenStyle](chosenColor)
        }
    }

    clear() {
        let ctx = this.refs.canvas.getContext("2d")
        ctx.clearRect(0, 0, this.props.canvas.width, this.props.canvas.height);
    }

    drawLine(color) {
        let currentLineStyle = this.state.styles.lines.currentLineStyle
        let ctx = this.refs.canvas.getContext("2d")
        let destinyX = random(this.props.canvas.width)
        let destinyY = random(this.props.canvas.height)
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.moveTo(this.state.styles.lines[currentLineStyle].x, this.state.styles.lines[currentLineStyle].y)
        ctx.lineTo(destinyX, destinyY);
        ctx.stroke();
    }

    drawTriangle(color) {
        let ctx = this.refs.canvas.getContext("2d")
        let currentTriangleStyle = this.state.styles.triangles.currentTriangleStyle
        let functions = {
            "simple": this.drawTriangleSimple,
            "filled": this.drawTriangleFilled,
        }
        functions[currentTriangleStyle](color, ctx, random(this.props.canvas.height), random(this.props.canvas.width))
    }

    drawTriangleSimple(color, context, x, y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height));
        context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height));
        context.lineTo(x, y);
        context.strokeStyle = color
        context.stroke();
    }

    drawTriangleFilled(color, context, x, y) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height));
        context.lineTo(random(this.props.canvas.width), random(this.props.canvas.height));
        context.lineTo(x, y);
        context.fillStyle = color
        context.fill();
    }

    drawSquare(color) {
        let currentSquareStyle = this.state.styles.squares.currentSquareStyle
        let ctx = this.refs.canvas.getContext("2d")
        let functions = {
            "simple": this.drawSquareSimple,
            "filled": this.drawSquareFilled,
        }
        functions[currentSquareStyle](color, ctx, random(this.props.canvas.width), random(this.props.canvas.height))
    }

    drawSquareSimple(color, context, x, y) {
        context.strokeStyle = color
        context.strokeRect(x, y, 75, 75);
    }

    drawSquareFilled(color, context, x, y) {
        context.fillStyle = color
        context.fillRect(x, y, 75, 75)
    }

    drawRectangle(color) {
        let currentRectangleStyle = this.state.styles.rectangles.currentRectangleStyle
        let ctx = this.refs.canvas.getContext("2d")
        let functions = {
            "simple": this.drawRectangleSimple,
            "filled": this.drawRectangleFilled,
        }
        functions[currentRectangleStyle](color, ctx, random(this.props.canvas.width), random(this.props.canvas.height))
    }

    drawRectangleSimple(color, context, x, y) {
        context.strokeStyle = color
        context.strokeRect(x, y, 150, 75)
    }
    drawRectangleFilled(color, context, x, y) {
        context.fillStyle = color
        context.fillRect(x, y, 150, 75)
    }

    drawPoints(number) {
        let ctx = this.refs.canvas.getContext("2d")
        let originX = random(this.props.canvas.width)
        let originY = random(this.props.canvas.height)
        
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        for (let i = 0; i < number; i++) { ctx.lineTo(random(this.props.canvas.width), random(this.props.canvas.height)); }
        ctx.lineTo(originX, originY);
    }

    drawPoints4(color) {
        let ctx = this.refs.canvas.getContext("2d")
        let currentPoints4Style = this.state.styles.points4.currentPoints4Style
        this.drawPoints(4)
        if (currentPoints4Style === "simple") {
            ctx.strokeStyle = color
            ctx.stroke()
        }
        else if (currentPoints4Style === "filled") {
            ctx.fillStyle = color
            ctx.fill()
        }
    }

    drawPoints5(color) {
        let ctx = this.refs.canvas.getContext("2d")
        let currentPoints5Style = this.state.styles.points5.currentPoints5Style
        this.drawPoints(5)
        if (currentPoints5Style === "simple") {
            ctx.strokeStyle = color
            ctx.stroke()
        }
        else if (currentPoints5Style === "filled") {
            ctx.fillStyle = color
            ctx.fill()
        }
    }

    drawCircle(color) {
        let currentCircleStyle = this.state.styles.circles.currentCircleStyle;
        let ctx = this.refs.canvas.getContext("2d")
        let functions = {
            "simple": this.drawCircleSimple,
            "filled": this.drawCircleFilled,
        }
        functions[currentCircleStyle](color, ctx, random(this.props.canvas.width), random(this.props.canvas.height))

    }

    drawCircleSimple(color, context, x, y) {
        context.beginPath();
        context.strokeStyle = color
        context.arc(x, y, 40, 0, 2 * Math.PI);
        context.stroke();
    }

    drawCircleFilled(color, context, x, y) {
        context.beginPath();
        context.fillStyle = color
        context.arc(x, y, 40, 0, 2 * Math.PI);
        context.fill();
    }
    drawGradient() {
        let ctx = this.refs.canvas.getContext("2d")
        // Create gradient
        let grd = ctx.createLinearGradient(0, 0, 200, 0)
        ctx.beginPath();
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(random(500), random(500), 150, 80);
    }
}

function random(range) {
    let randomNumber = (Math.floor(Math.random() * range))
    return randomNumber
}

export default App