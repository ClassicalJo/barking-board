import React from "react"
class SquareStyleSelector extends React.Component {
    render() {
        return (
            <select ref="squarestyleselector" onChange={this.props.onChange}>
                <option value="simple" disabled={!this.props.styles.squares.simple.bought}>Simple square</option>
                <option value="filled" disabled={!this.props.styles.squares.filled.bought}>Filled square</option>
            </select>
        )
    }
}

export default SquareStyleSelector