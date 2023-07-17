import React from "react";
import ReactDOM from "react-dom"
import {createRoot} from "react-dom/client"

import App from "./02-advanced/15-新生命周期-getDerivedStateFromProps"

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>)
// import App from './01-base/01-class组件'
// import App from './01-base/03-组件的嵌套'
// ReactDOM.render(<App/>,document.getElementById('root'))
// //方式一
// ReactDOM.render('111',document.getElementById('root'))
// // 方式二
// ReactDOM.render(<div>体验React</div>,document.getElementById('root'))
// //方式三
// class App extends React.Component{
//     render() {
//         return(
//             <div>
//                 <p>ppppp</p>
//                 <i>iiiiiii</i>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(<App />,document.getElementById('root'));
// 方式四
// const App  = (props)=><h1 style={{color:'red'}}>欢迎来到新世界</h1>
// ReactDOM.render(<App />,document.getElementById('root'));
// 方式五
// const app = new App({
//     name:'react'
// }).render();
// ReactDOM.render(app,document.getElementById('root'))