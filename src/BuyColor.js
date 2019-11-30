import React from 'react'

class BuyColor extends React.Component {
    render() {
        return (
            <div className="buy-color">
                <p>Buy a color for 5 borkcoins</p>
                <input
                    type="color"
                    ref={this.props.innerRef} />
                <input
                    buy='color'
                    type="button"
                    value="Buy color"
                    onClick={this.props.onClick} />
                <input
                    buy="random-color"
                    type="button"
                    value="@"
                    onClick={this.props.onClick} />
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <BuyColor
    innerRef={ref} {...props} />);