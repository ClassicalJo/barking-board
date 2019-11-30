import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./index.css"

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: {
                width: 800,
                height: 500,
            }
        }
    }
    render(){
        return <App canvas={this.state.canvas}/>
    }
}
ReactDOM.render(<Index />, document.getElementById("root")) 