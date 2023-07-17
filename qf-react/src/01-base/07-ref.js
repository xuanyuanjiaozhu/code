import React,{Component} from "react";

export default class App extends Component{

    myRef = React.createRef();
    render() {
        return(
            <div>
                <input type="text" ref={this.myRef}/>
                <button onClick={this.getRef}>获取Ref</button>
            </div>
        )
    }
    getRef = () => {
        console.log(this.myRef.current.value)
    }

}