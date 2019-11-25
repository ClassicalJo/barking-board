import React from 'react'

class BuyColor extends React.Component {
    render() {
        return (
            <div className="buy-color">
                <p>Buy a color for 5 borkcoins</p>
                <input
                    type="color"
                    ref="color" />
                <input
                    buy='color'
                    type="button"
                    value="Buy color"
                    onClick={this.props.onClick} />
            </div>
        )
    }
}

export default BuyColor