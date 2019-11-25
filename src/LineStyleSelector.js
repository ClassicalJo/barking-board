import React from 'react'
class LineStyleSelector extends React.Component {
    render() {
        return (
            <select ref="linestyleselector" onChange={this.props.onChange}>
                <option value="upperleft">Upper left corner</option>
                <option value="upperright">Upper right corner</option>
                <option value="bottomleft">Bottom left corner</option>
                <option value="bottomright">Bottom right corner</option>
            </select>
        )
    }
}
export default LineStyleSelector