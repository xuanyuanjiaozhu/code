import React, {Component} from 'react';

export default class App extends Component {
    state = {
        myname:'yuan'
    }

    /**
     * componentWillMount 控制台有警告
     * 前面添加 UNSAFE_ 不安全的意思
     */
    UNSAFE_componentWillMount() {
        console.log('第一次 componentWillMount 组件将要挂载到真是的DOM之前 ',
            this.state.myname,document.getElementById('myname'))
        //第一次上树前的 最后一次修改状态的机会
        this.setState({
            myname:"Yuan"
        })
        //初始化数据的作用
    }
    componentDidMount() {
        console.log('第一次 componentDidMount 已经渲染到DOM中',this.state.myname,document.getElementById('myname'))
        //数据请求   axios  订阅函数的调用   setInterval  基于创建好的DOM进行初始化 batter-scroll


    }

    render()    {
        console.log('render 正在渲染中',this.state.myname,document.getElementById('myname'))
        return (
            <div>
                声明周期
                <span id="myname">{this.state.myname}</span>
            </div>
        );
    }
}

