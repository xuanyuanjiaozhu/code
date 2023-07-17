import React, {Component} from 'react';
class Child extends Component{
    state = {
        title:'a'
    }
    render() {
        return(
            <div>child-{this.state.title}</div>
        )
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('child')
        //最先获得父组件传来的属性，可以利用属性进行ajax或逻辑处理
        //把属性转换为孩子的状态
        this.setState({
            title:nextProps.text + "yuan"
        })
    }
}
export default class App extends Component {
    state = {
        current:0,
        text:'11111'
    }

    render() {
        return (
            <div>
                跟新阶段3
                <button onClick={()=>{
                    this.setState({
                        current:this.state.current+1,
                        text:'22222'
                    })
                }}>click</button>
                <Child text={this.state.text}/>
            </div>
        );
    }
}

