import React from "react"
class Points4StyleSelector extends React.Component {
    render() {
        return (
            <select ref="points4styleselector" onChange={this.props.onChange}>
                <option value="simple" disabled={!this.props.styles.points4.simple.bought}>Simple 4 points</option>
                <option value="filled" disabled={!this.props.styles.points4.filled.bought}>Filled 4 points</option>
            </select>
        )
    }
}

export default Points4StyleSelector