import React from 'react'

class StyleSelector extends React.Component {
    render() {
        return (
            <div>
                <select ref={this.props.innerRef} onChange={this.props.onChange}>
                    {Object.keys(this.props.styles).map((x) =>
                        <option
                            disabled={!this.props.styles[x].bought}
                            key={x}
                            value={x}>
                            {x}
                        </option>)}
                </select>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <StyleSelector
    innerRef={ref} {...props}
/>);