import React from 'react'

class BuyStyle extends React.Component {
    render() {
        let stylesKeys = Object.keys(this.props.styles)
        let mappedStylesKeys = stylesKeys.map((key) => { return [key, this.props.styles[key].bought] })
        stylesKeys.shift()        
        return (
            <div>
                <div className="buy-styles">{stylesKeys.map((x) => !this.props.styles[x].bought && <div><input
                    onClick={this.props.onClick}
                    buy={x}
                    value={`Buy ${x} for 10 borkcoins`}
                    disabled={this.props.styles[x].bought}
                /></div>)}
                </div>
                <div className="style">
                    {mappedStylesKeys.map((x) => x[1] === true  && !this.props.styles[x[0]].filled.bought &&
                        <div>
                            <p
                                onClick={this.props.onClick}
                                buy="filled"
                                styleFamily={x[0]}
                            >💰 and buy filled {x[0]} for 100 borkcoins!</p></div>)}
                </div>

                <div className="style"
                onClick={this.props.onClick}
                buy="repeater">And buy a repeater for A LOT of coins!</div>
            </div>
        )
    }
}
export default BuyStyle