import React,{Component} from "react";

export default class App extends Component{

    // state = {
    //     isShow:true
    // }
    constructor() {
        super();
        this.state = {
            isShow:true
        }
    }

    render() {
        return(
            <div>
                <p>App</p>
                <button onClick={()=>{
                    this.setState({
                        isShow:!this.state.isShow
                    })
                }}>{this.state.isShow?'收藏':'取消收藏'}</button>
            </div>
        )
    }

}