import React,{Component} from "react";

class Navbar extends Component{
    render() {
        return(
            <div>navbar</div>
        )
    }

}
function Swiper() {
    return(
        <div>swiper</div>
    )
}
// class Swiper extends Component{
//     render() {
//         return(
//             <div>swiper</div>
//         )
//     }
// }
const Tabbar = ()=> <div>tabbar</div>
// class Tabbar extends Component{
//     render() {
//         return(
//             <div>tabbar</div>
//         )
//     }
// }

export default class App extends Component{
    render() {
        return(
            <div>
                <Navbar></Navbar>
                <Swiper></Swiper>
                <Tabbar></Tabbar>
            </div>
        )
    }

}