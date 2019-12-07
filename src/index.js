import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./index.css"

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: {
                width: window.innerWidth * 0.5,
                height: window.innerHeight * 0.5,
            }
        }
        this.updateCanvas = this.updateCanvas.bind(this)
    }

    updateCanvas = () => {

        this.setState((prevState) => ({
            canvas: {
                ...prevState.canvas,
                width: window.innerWidth * 0.5,
                height: window.innerHeight * 0.5,
            }
        }))
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateCanvas)
    }
    render(){
        return <App canvas={this.state.canvas}/>
    }
}
ReactDOM.render(<Index />, document.getElementById("root")) 