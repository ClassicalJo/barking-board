import React from 'react'

class BuyStyle extends React.Component {
    render() {
        let stylesKeys = Object.keys(this.props.styles)
        let mappedStylesKeys = stylesKeys.map((key) => { return [key, this.props.styles[key]] })
        stylesKeys.shift()

        return (
            <div className="buy-styles">
                <div className="style">{stylesKeys.map((x) => <div>
                    <p 
                    buystyle={x}
                    onClick={this.props.onClick}
                    >💰 Buy {x} for 10 borkcoins</p>
                </div>)}
                    <div className="style">
                        {mappedStylesKeys.map((x) => x[1]===true && <div><p>💰 and buy filled {x[0]} for moar money!</p></div>)}
                    </div>
                </div>

            </div>
        )
    }
}
export default BuyStyle