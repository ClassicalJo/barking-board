import React from "react"
class Points5StyleSelector extends React.Component {
    render() {
        return (
            <select ref="points5styleselector" onChange={this.props.onChange}>
                <option value="simple" disabled={!this.props.styles.points5.simple.bought}>Simple 5 points</option>
                <option value="filled" disabled={!this.props.styles.points5.filled.bought}>Filled 5 points</option>
            </select>
        )
    }
}

export default Points5StyleSelector