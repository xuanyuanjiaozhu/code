import React, {Component} from 'react';
import Center from "./maizuocomponent/Center";
import Cinema from "./maizuocomponent/Cinema";
import Film from "./maizuocomponent/Film";
import Navbar from "./maizuocomponent/Navbar";
import Tabbar from "./maizuocomponent/Tabbar";
class App extends Component{
    state = {
        current:0
    }

    componentDidMount() {
        this.setState({
            current:this.state.current +1
        })
        console.log(this.state.current,'1')//0
        this.setState({
            current:this.state.current + 1
        })
        console.log(this.state.current,'2')//0
        setTimeout(()=>{
            this.setState({
                current:this.state.current+1
            })
            console.log(this.state.current,'3')//1
            this.setState({
                current:this.state.current+1
            })
            console.log(this.state.current,'4')//1
        },0)
    }

    which(){
        switch (this.state.current) {
            case 0:
                return <Film/>
            case 1:
                return <Cinema/>
            case 2:
                return <Center/>
            default:
                return null
        }
    }
    render()
    {
        return (
            <div>
                <Navbar/>
                {
                    //表达式  支持函数表达式
                    this.which()
                }
                <Tabbar current={this.state.current} setCurrent={(index)=>{
                    this.setState({
                        current : index
                    })
                }}/>
            </div>
        );
    }
}

export default App;