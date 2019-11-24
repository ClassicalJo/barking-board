import React from 'react'

class BuyColor extends React.Component {
    render() {
        return (
            <div>Buy a color for 5 borkcoins
                <input type="color" ref="color"/><input type="button" value="Buy color" onClick={this.props.onClick} />
            </div>
        )
    }
}

export default BuyColor