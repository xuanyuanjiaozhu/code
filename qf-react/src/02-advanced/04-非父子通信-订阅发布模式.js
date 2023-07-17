import React, {Component} from 'react';

let bus = {
    list:[],
    subscribe(callback){
        this.list.push(callback)
    },
    publish(text){
        this.list.forEach(callback=>{
            callback && callback(text)
        })
    }
}


export default class App extends Component{

    render()
    {
        return (
            <div>
                消息订阅与发布
                <FilmItem/>
                <FilmDetail/>
                <FilmDetail/>
                <FilmDetail/>
                <FilmDetail/>
                <FilmDetail/>
                <FilmDetail/>
                <FilmDetail/>
            </div>
        );
    }
}
class FilmItem extends Component{
    render() {
        return(
            <div>
                发布者
                <button onClick={()=>{
                    bus.publish("12121212")
                }}>发布</button>
            </div>
        )
    }

}
class FilmDetail extends Component{
    constructor() {
        super();
        this.state = {
            text:''
        }
        bus.subscribe((text)=>{
            console.log(text,'订阅')
            this.setState({
                text:text
            })
        })
    }
    render() {
        return(
            <div>
                订阅{this.state.text}
            </div>
        )
    }

}