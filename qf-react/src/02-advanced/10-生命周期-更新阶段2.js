import React, {Component} from 'react';

export default class App extends Component {
    state = {
        myname:'yuan'
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('pppppp')
        // return false 阻止更新
        // return true  应该更新
        // this.state  老状态
        // nextState  新状态
        if (JSON.stringify(this.state) !== JSON.stringify(nextState)){
            return true;
        }
        return false;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('gengxi')
    }

    render() {
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
}

