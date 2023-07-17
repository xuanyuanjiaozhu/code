import React, {Component} from 'react';


export default class App extends Component {
    state = {
        isCreated: true,
        myName:'yuan'
    }
    static getDerivedStateFromProps(nextProps,nextState){
        console.log("getDerivedStateFromProps",nextProps,nextState)

        // return null
        return{
            myName:nextState.myName.substring(0,1).toUpperCase() + nextState.myName.substring(1)
        }
    }
    render() {
        return (
            <div>
                <p>name:{this.state.myName}</p>
                <button onClick={()=>{
                    this.setState({
                        myName:'xiaoming',
                        isCreated:!this.state.isCreated
                    })
                }}>click</button>
                {/*{this.state.isCreated?<Child/>:''}*/}
                {/*{this.state.isCreated && <Child/>}*/}
            </div>
        );
    }
}

class Child extends Component{
    componentDidMount() {
        window.onresize = ()=>{
            console.log("onresize")
        }
        this.tiem = setInterval(function () {
            console.log("tiem")
        },1000)
    }


    componentWillUnmount() {
        console.log("componentWillUnmount")
        window.onresize = null;
        clearInterval(this.tiem)

    }

    render() {
        return(
            <div>Child</div>
        )
    }

}


