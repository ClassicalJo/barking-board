import React from "react"
class TriangleStyleSelector extends React.Component {
    render() {
        return (
            <select ref="trianglestyleselector" onChange={this.props.onChange}>
                <option value="simple" disabled={!this.props.styles.triangles.simple.bought}>Simple triangles</option>
                <option value="filled" disabled={!this.props.styles.triangles.filled.bought}>Filled triangles</option>
            </select>
        )
    }
}

export default TriangleStyleSelector