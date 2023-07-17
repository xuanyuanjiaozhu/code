import React, {Component} from 'react';
import BetterScroll from "better-scroll";

export default class App extends Component{

    state = {
        myname:'yuan'
    }
    componentWillMount() {
        console.log("componentWillMount") //获取失败
    }
    componentDidMount() {

        console.log("componentDidMount") //成功获取
    }
    render()    {
        console.log("render")
        return (
            <div>
                <button onClick={()=>{
                    this.setState({
                        myname:"techui"
                    })
                }}>click</button>
                <p id="myname">{this.state.myname}</p>

            </div>
        );
    }

    /**
     * componentWillUpdate 过期但是可以使用，不过控制台会有提示
     * 前面添加UNSAFU_ 意思不安全
     */
    componentWillUpdate() {
        console.log('componentWillUpdate',document.getElementById("myname").innerText)
    }
    componentDidUpdate(prevProps,prevState) {
        // prevProps:更新前的props
        // prevState:更新前的state
        console.log("componentDidUpdate",prevProps,prevState,document.getElementById("myname").innerText)
        //更新后，想要获取DOM节点，更新
    }
}

