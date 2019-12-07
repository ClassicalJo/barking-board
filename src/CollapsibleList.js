import React from 'react'

class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }


    toggleMenu() {
        this.setState((state) => ({ open: !state.open }))
    }

    render() {
        return (
            <div className = {this.props.listClassName}>
                <div onClick={() => this.toggleMenu()}>{this.props.title}</div>
                {this.state.open ? <div>{this.props.children}</div> : null}
            </div>
        )
    }
}

export default Collapsible