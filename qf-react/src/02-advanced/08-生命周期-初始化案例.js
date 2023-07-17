import React, {Component} from 'react';
import BetterScroll from "better-scroll"

export default class App extends Component {
    state = {
        list:['111',"2222","3333","4444","5555","666",'&&&',"888",'9999',
            "7777","987987","753","68","23","6657","789","8768","456"]
    }
    componentWillMount() {
        // console.log(document.querySelectorAll('li')) //获取失败
    }
    componentDidMount() {

        console.log(document.querySelectorAll('li')) //成功获取
        new BetterScroll("#wrapper")
    }

    render()    {
        return (
            <div id="wrapper" style={{height:"200px",background:"yellow",overflow:'hidden'}}>
                <ul>
                    {this.state.list.map(item=>{
                        return <li key={item}>{item}</li>
                    })}
                </ul>
            </div>
        );
    }
}

