import React, {Component} from "react";
import Film from "./maizuocomponent/Film";
import Cinema from "./maizuocomponent/Cinema";
import Center from "./maizuocomponent/Center";
import './css/maizuo.css'

export default class App extends Component {

    state = {
        current: 0,
        list: [
            {id: 1, text: '电影'},
            {id: 2, text: '影院'},
            {id: 3, text: '我的'},
        ]
    }

    render() {
        return (
            <div>
                {this.state.current == 0 && <Film/>}
                {this.state.current == 1 && <Cinema/>}
                {this.state.current == 2 && <Center/>}

                <div className={'nav' }>{
                    this.state.list.map((item, index) =>
                        <p className={this.state.current === index ? 'on':''} key={item.id} onClick={()=>{
                            this.setState({
                                current:index
                            })
                        }}>{item.text}</p>
                    )
                }</div>

            </div>
        )
    }
}