import React from "react"
class CircleStyleSelector extends React.Component {
    render() {
        return (
            <select ref="circlestyleselector" onChange={this.props.onChange}>
                <option value="simple" disabled={!this.props.styles.circles.simple.bought}>Simple circle</option>
                <option value="filled" disabled={!this.props.styles.circles.filled.bought}>Filled circle</option>
            </select>
        )
    }
}

export default CircleStyleSelector