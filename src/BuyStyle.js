import React from 'react'

class BuyStyle extends React.Component {
    render() {
        let stylesKeys = Object.keys(this.props.styles)
        stylesKeys.shift()
        let mappedStylesKeys = stylesKeys.map((key) => { return [key, this.props.styles[key].bought] })

        return (
            <div>
                <ul className="buy-styles"> {stylesKeys.map((x) => !this.props.styles[x].bought && <li
                    key={x}
                    onClick={this.props.onClick}
                    buy={x}
                    disabled={this.props.styles[x].bought}>
                    Buy {x} for 10 borkCoins!</li>)}
                </ul>
                <div className="style">
                    {mappedStylesKeys.map((x) => x[1] === true && !this.props.styles[x[0]].subStyles.filled.bought &&
                        <p
                            key={x}
                            onClick={this.props.onClick}
                            buy="filled"
                            stylefamily={x[0]}
                        ><span role="img" aria-label="money">💰</span> and buy filled {x[0]} for 100 borkcoins!</p>)}
                </div>

                <div className="style"
                    onClick={this.props.onClick}
                    buy="repeater">Buy a repeater for 100 coins!</div>
                <div className="style"
                    onClick={this.props.onClick}
                    buy="bot">Buy a bot for 100 coins!</div>
            </div >
        )
    }
}
export default BuyStyle