import React from 'react'

class BuyStyle extends React.Component {
    render() {
        let stylesKeys = Object.keys(this.props.styles)
        let mappedStylesKeys = stylesKeys.map((key) => { return [key, this.props.styles[key]] })
        stylesKeys.shift()

        return (
            <div>
                <div>{stylesKeys.map((x) => <div
                    onClick={this.props.onClick}
                    buystyle={x}>
                    Buy {x} for 10 borkcoins
                </div>)}
                    <div>
                        {mappedStylesKeys.map((x) => x[1]===true && <div>and buy filled {x[0]} for moar money!</div>)}
                    </div>
                </div>

            </div>
        )
    }
}
export default BuyStyle