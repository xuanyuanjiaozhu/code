import React,{Component} from "react";

export default class App extends Component{
    state = {
        list:[]
    }
    myText = React.createRef();
    render() {
        return(
            <div>
                <div>
                    <input type="text" ref={this.myText}/>
                    <button onClick={()=>{
                        console.log(this.myText.current.value)
                        // let newList = [...this.state.list,this.myText.current.value]
                        let newList = [...this.state.list];
                        newList.push({
                            id:Math.random()*100000,
                            myText:this.myText.current.value
                        });
                        this.myText.current.value = '';
                        this.setState({
                            list:newList
                        })
                    }
                    }>添加</button>
                </div>
                <div>{
                    this.state.list.map((item,index)=>
                    <p key={item.id}>
                        {/*<span>{item.myText}</span>*/}
                        <span dangerouslySetInnerHTML={
                            {
                                __html:item.myText
                            }
                        }></span>
                        <button onClick={()=>{
                            let newList = [...this.state.list];
                            newList.splice(index,1)
                            this.setState({
                                list:newList
                            })
                        }}>删除</button>
                    </p>)
                }</div>
                {/*{this.state.list.length == 0 ? <div>暂无待办事项</div> : null}*/}
                {/*<div className={this.state.list.length == 0 ? 'hidden' : ''}>暂无待办事项</div>*/}
                {this.state.list.length == 0 && <div>暂无待办事项</div>}
            </div>
        )
    }
}