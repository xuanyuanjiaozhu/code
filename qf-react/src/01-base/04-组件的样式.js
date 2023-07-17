import React, {Component} from 'react';
import './css/index.css' //导入css文件 webpack的支持
class App extends Component {
    render() {
        var myname='kerwin';
        var obj = {
            backgroundColor:'yellow',
            fontSize:'18px'
        }
        return (
            <div>
                <p style={obj}>{myname}</p>
                <div style={{color:'#00ff00'}} >111111111</div>
                <div className="a">ooooooooooo</div>
            </div>
        );
    }
}

export default App;