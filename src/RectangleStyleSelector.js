import React from "react"
class RectangleStyleSelector extends React.Component {
    render() {
        return (
            <select ref="rectanglestyleselector" onChange={this.props.onChange}>
                <option value="simple" disabled={!this.props.styles.rectangles.simple.bought}>Simple rectangle</option>
                <option value="filled" disabled={!this.props.styles.rectangles.filled.bought}>Filled rectangle</option>
            </select>
        )
    }
}

export default RectangleStyleSelector