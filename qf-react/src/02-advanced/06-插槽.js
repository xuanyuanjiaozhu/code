import React, {Component} from 'react';

class Child extends Component{
    render() {
        return(
            <div>
                child
                {/*{插槽 vue slot}*/}
                {this.props.children[0]}
                {this.props.children[1]}
                {this.props.children[2]}
            </div>
        )
    }

}
export default class App extends Component {
    render()
    {
        return (
            <div>
                <p>App</p>
                <Child>
                    <div>111111111</div>
                    <div>222222222</div>
                    <div>333333333</div>
                </Child>
            </div>
        );
    }
}
