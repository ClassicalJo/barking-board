import React from 'react'
import LineStyleSelector from "./LineStyleSelector"

class StyleSelector extends React.Component {
    render() {
        return (
            <div>
                <select ref="stylelist" onChange={this.props.onChange}>
                    {Object.keys(this.props.styles).map((x) =>
                        <option
                            disabled={!this.props.styles[x]}
                            key={x}
                            value={x}>
                            {x}
                        </option>)}
                </select>
                {this.props.currentStyleSelector === "lines" && <LineStyleSelector ref="linestyles" onChange={this.props.onChangeLineStyleSelector}/>}
            </div>
        )
    }
}

export default StyleSelector