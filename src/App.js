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
            styles: {
                lines: {
                    currentLineStyle: "upperleft",
                    bought: true,
                    upperleft: {
                        bought: true,
                        x: 0,
                        y: 0,
                    },
                    upperright: {
                        bought: false,
                        x: 500,
                        y: 0,
                    },
                    bottomleft: {
                        bought: false,
                        x: 0,
                        y: 500,
                    },
                    bottomright: {
                        bought: false,
                        x: 500,
                        y: 500
                    }
                },
                triangles: false,
                squares: false,
                rectangles: false,
                points4: false,
                points5: false,
                circles: false,
            },
            colors: {
                "#000000": true,
            },


        }
        this.buy = this.buy.bind(this)
        this.buyColor = this.buyColor.bind(this)
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
        this.drawGradient = this.drawGradient.bind(this)
        this.handleOnChangeTimesSelector = this.handleOnChangeTimesSelector.bind(this)
        this.handleOnChangeStyleSelector = this.handleOnChangeStyleSelector.bind(this)
        this.handleOnChangeLineStyleSelector = this.handleOnChangeLineStyleSelector.bind(this)
        this.handleOnChangeColorSelector = this.handleOnChangeColorSelector.bind(this)
        this.handleOnChangeStyleRoulette = this.handleOnChangeStyleRoulette.bind(this)
        this.handleOnChangeColorRoulette = this.handleOnChangeColorRoulette.bind(this)


    }

    render() {
        return (
            <div>
                <canvas ref="canvas" id="barking-board" height="500" width="500"></canvas>
                <input ref="timesselector" type="number" defaultValue={this.currentTimesSelector} onChange={this.handleOnChangeTimesSelector}></input>
                <input type="button" value="draw" onClick={() => this.draw(this.state.currentTimesSelector)} />
                <input type="button" value="clear" onClick={this.clear} />
                <a>Random style: </a>
                <input
                    ref="styleroulette"
                    type="checkbox"
                    checked={this.state.styleroulette}
                    onChange={this.handleOnChangeStyleRoulette} />
                <a>Random color: </a>
                <input
                    ref="colorroulette"
                    type="checkbox"
                    checked={this.state.colorroulette}
                    onChange={this.handleOnChangeColorRoulette} />
                <StyleSelector
                    ref="styleselector"
                    styles={this.state.styles}
                    currentStyleSelector={this.state.currentStyleSelector}
                    onChange={this.handleOnChangeStyleSelector}
                    onChangeLineStyleSelector={this.handleOnChangeLineStyleSelector} />

                <select ref="colorselector" onChange={this.handleOnChangeColorSelector}>
                    {Object.keys(this.state.colors).map((x) => <option
                        key={x}
                        value={x}
                        style={{ backgroundColor: x }}
                    >
                        {x}
                    </option>)}

                </select>
                <div>Coins: {this.state.currentCoins}</div>
                <BuyStyle styles={this.state.styles} onClick={this.buy} />
                <BuyColor ref="color" onClick={this.buyColor} />
            </div>
        )
    }

    handleOnChangeTimesSelector() {
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
        let boughtStyle = event.target.attributes.buystyle.nodeValue
        this.setState((state) => (state.currentCoins = state.currentCoins - 10))
        this.setState((prevState => ({
            styles: {
                ...prevState.styles,
                [boughtStyle]: true
            }
        })))
    }

    buyColor() {
        let colorBought = this.refs.color.refs.color.value
        this.setState((state) => (state.currentCoins = state.currentCoins - 10))
        this.setState((prevState => ({
            colors: {
                ...prevState.colors,
                [colorBought]: true
            }
        })))
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
        ctx.clearRect(0, 0, 500, 500);
        ctx.clearRect(0, 0, 500, 500);
    }

    drawLine(color) {
        let currentLineStyle = this.state.styles.lines.currentLineStyle
        let ctx = this.refs.canvas.getContext("2d")
        let destinyX = random(500)
        let destinyY = random(500)
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.moveTo(this.state.styles.lines[currentLineStyle].x, this.state.styles.lines[currentLineStyle].y)
        ctx.lineTo(destinyX, destinyY);
        ctx.stroke();
    }

    drawTriangle(color) {
        let ctx = this.refs.canvas.getContext("2d")
        let originX = random(500)
        let originY = random(500)
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(random(500), random(500));
        ctx.lineTo(random(500), random(500));
        ctx.lineTo(originX, originY);
        ctx.stroke();
    }

    drawSquare(color) {
        let ctx = this.refs.canvas.getContext("2d")
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.strokeRect(random(500), random(500), 75, 75);
    }

    drawRectangle(color) {
        let ctx = this.refs.canvas.getContext("2d")
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.strokeRect(random(500), random(500), 150, 75);
    }

    drawPoints(number, color) {
        let ctx = this.refs.canvas.getContext("2d")
        let originX = random(500)
        let originY = random(500)
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        for (let i = 0; i < number; i++) { ctx.lineTo(random(500), random(500)); }
        ctx.lineTo(originX, originY);
        ctx.stroke();
    }

    drawPoints4(color) {
        this.drawPoints(4, color)
    }

    drawPoints5(color) {
        this.drawPoints(5, color)
    }

    drawCircle(color) {
        let ctx = this.refs.canvas.getContext("2d")
        ctx.strokeStyle = color
        ctx.beginPath();
        ctx.arc(random(500), random(500), 40, 0, 2 * Math.PI);
        ctx.stroke();
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