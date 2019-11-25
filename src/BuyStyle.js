import React from 'react'

class BuyStyle extends React.Component {
    render() {
        let stylesKeys = Object.keys(this.props.styles)
        let mappedStylesKeys = stylesKeys.map((key) => { return [key, this.props.styles[key].bought] })
        console.log (mappedStylesKeys)
        stylesKeys.shift()

        return (
            <div>
                <div>{stylesKeys.map((x) => <div><input
                    onClick={this.props.onClick}
                    buystyle={x}
                    value={`Buy ${x} for 10 borkcoins`}
                    disabled={this.props.styles[x].bought}
                    /></div>)}
                </div>
                <div>
                    {mappedStylesKeys.map((x) => x[1] === true && <div>and buy filled {x[0]} for moar money!</div>)}
                </div>
            </div>
        )
    }
}
export default BuyStyle