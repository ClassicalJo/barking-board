import React from 'react'
import LineStyleSelector from "./LineStyleSelector"
import SquareStyleSelector from "./SquareStyleSelector"
import RectangleStyleSelector from "./RectangleStyleSelector"
import CircleStyleSelector from "./CircleStyleSelector"
import TriangleStyleSelector from "./TriangleStyleSelector"
import Points4StyleSelector from "./Points4StyleSelector"
import Points5StyleSelector from "./Points5StyleSelector"


class StyleSelector extends React.Component {
    render() {
        return (
            <div>
                <select ref="stylelist" onChange={this.props.onChange}>
                    {Object.keys(this.props.styles).map((x) =>
                        <option
                            disabled={!this.props.styles[x].bought}
                            key={x}
                            value={x}>
                            {x}
                        </option>)}
                </select>
                {this.props.currentStyleSelector === "lines" && <LineStyleSelector ref="linestyles" styles={this.props.styles} onChange={this.props.onChangeLineStyleSelector}/>}
                {this.props.currentStyleSelector === "squares" && <SquareStyleSelector ref="squarestyles" styles={this.props.styles} onChange={this.props.onChangeSquareStyleSelector}/>}
                {this.props.currentStyleSelector === "rectangles" && <RectangleStyleSelector ref="rectanglestyles" styles={this.props.styles} onChange={this.props.onChangeRectangleStyleSelector}/>}
                {this.props.currentStyleSelector === "circles" && <CircleStyleSelector ref="circlestyles" styles={this.props.styles} onChange={this.props.onChangeCircleStyleSelector}/>}
                {this.props.currentStyleSelector === "triangles" && <TriangleStyleSelector ref="trianglestyles" styles={this.props.styles} onChange={this.props.onChangeTriangleStyleSelector}/>}
                {this.props.currentStyleSelector === "points4" && <Points4StyleSelector ref="points4styles" styles={this.props.styles} onChange={this.props.onChangePoints4StyleSelector}/>}
                {this.props.currentStyleSelector === "points5" && <Points5StyleSelector ref="points5styles" styles={this.props.styles} onChange={this.props.onChangePoints5StyleSelector}/>}                
            </div>
        )
    }
}

export default StyleSelector