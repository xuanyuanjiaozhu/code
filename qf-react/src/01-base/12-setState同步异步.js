import React,{Component} from "react";

export default class App extends Component{
    state ={
        num:1
    }

    render() {
        return(
            <div>
                <span>{this.state.num}</span>
                <button onClick={this.handleAdd1}>add1</button>
                <button onClick={this.handleAdd2}>add2</button>
            </div>
        )
    }
    handleAdd1 = ()=>{
        this.setState({
            num:this.state.num + 1
        })
        this.setState({
            num:this.state.num + 1
        })
        this.setState({
            num:this.state.num + 1
        })
    }
    handleAdd2 = ()=>{
        setTimeout(()=>{
            this.setState({
                num:this.state.num + 1
            })
            this.setState({
                num:this.state.num + 1
            })
            this.setState({
                num:this.state.num + 1
            })
        },0)

    }
}