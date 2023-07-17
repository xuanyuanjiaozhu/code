import React, {Component} from 'react';

class Tabbar extends Component {
    render() {
        return (
            <div>
                Tabbar{this.props.current}
                <p>
                    <button onClick={()=>this.props.setCurrent(2)}>button</button>
                </p>
            </div>
        );
    }
}

export default Tabbar;