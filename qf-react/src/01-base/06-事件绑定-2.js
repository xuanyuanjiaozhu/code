import React, { Component } from 'react'

export default class App extends Component {
  a = 100;
  render() {
    return (
      <div>
        <input />
        <button onMouseOver={()=>{
            console.log('add1','如果处理逻辑过多，不推荐这种写法',this.a)
        }}>add1</button>
        <button onClick={this.handleClick2.bind(this)}>add2-不推荐</button>
        <button onClick={this.handleClick3}>add3-推荐</button>
        <button onClick={()=>this.handleClick4()}>add4-比较推荐--因为可以传参</button>
      </div>
    )
  }

  handleClick2(){
    console.log('click2',this.a);
  }
  handleClick3 = (evt)=>{
    console.log('click3',this.a,evt.target);
  }
  handleClick4(){
    console.log('click4',this.a);
  }
}
/**
 * React 并不会真正的绑定事件到每个具体的《》的元素上，而是采用事件代理的模式
 */
/**
 * call 改变this指向，自动执行函数
 * apply 改变this指向，自动执行函数
 * bind 改变this指向，需要手动执行函数
 */

//  var obj1 = {
//   name:'obj1',
//   getName(){
//     console.log(this.name)
//   }
// }

// var obj2 = {
//   name:'obj2',
//   getName(){
//     console.log(this.name)
//   }
// }
// obj1.getName()//obj1
// obj1.getName.call(obj2)//obj2
// obj1.getName.apply(obj2)//obj2
// obj1.getName.bind(obj2)()//obj2
// obj2.getName()//obj2

// var obtn = document.getElementById('btn');
// obtn.onclick = function(){
//   console.log(this);
// }