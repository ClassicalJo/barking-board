import React from 'react'

class SubStyleSelector extends React.Component {
    render() {
        
        let subStyle = this.props.styles[this.props.currentStyleSelector].currentSubStyleSelector
        if (this.props.currentStyleSelector === "lines") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="upperleft">Upper left corner</option>
                    <option value="upperright">Upper right corner</option>
                    <option value="bottomleft">Bottom left corner</option>
                    <option value="bottomright">Bottom right corner</option>
                </select>
            )
        }
        else if (this.props.currentStyleSelector === "triangles") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="simple" disabled={!this.props.styles.triangles.subStyles.simple.bought}>Simple triangles</option>
                    <option value="filled" disabled={!this.props.styles.triangles.subStyles.filled.bought}>Filled triangles</option>
                </select>
            )
        }
        else if (this.props.currentStyleSelector === "squares") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="simple" disabled={!this.props.styles.squares.subStyles.simple.bought}>Simple square</option>
                    <option value="filled" disabled={!this.props.styles.squares.subStyles.filled.bought}>Filled square</option>
                </select>
            )
        }
        else if (this.props.currentStyleSelector === "rectangles") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="simple" disabled={!this.props.styles.rectangles.subStyles.simple.bought}>Simple rectangle</option>
                    <option value="filled" disabled={!this.props.styles.rectangles.subStyles.filled.bought}>Filled rectangle</option>
                </select>
            )
        }
        else if (this.props.currentStyleSelector === "points4") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="simple" disabled={!this.props.styles.points4.subStyles.simple.bought}>Simple 4 points</option>
                    <option value="filled" disabled={!this.props.styles.points4.subStyles.filled.bought}>Filled 4 points</option>
                </select>
            )
        }
        else if (this.props.currentStyleSelector === "points5") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="simple" disabled={!this.props.styles.points5.subStyles.simple.bought}>Simple 5 points</option>
                    <option value="filled" disabled={!this.props.styles.points5.subStyles.filled.bought}>Filled 5 points</option>
                </select>
            )
        }
        else if (this.props.currentStyleSelector === "circles") {
            return (
                <select ref={this.props.innerRef} onChange={this.props.onChange} value={subStyle}>
                    <option value="simple" disabled={!this.props.styles.circles.subStyles.simple.bought}>Simple circle</option>
                    <option value="filled" disabled={!this.props.styles.circles.subStyles.filled.bought}>Filled circle</option>
                </select>
            )
        }
    }
}

export default React.forwardRef((props, ref) => <SubStyleSelector
    innerRef={ref} {...props} />);