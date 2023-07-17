import React,{Component} from "react";
import axios from "axios";

export default class Cinema extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cinemaList:[],
            filterList:[]
        }
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=3222091',
            method: "get",
            headers: {
                'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16666932774321183776374785","bc":"110100"}`,
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            // console.log(res.data.data.cinemas)
            this.setState({
                cinemaList:res.data.data.cinemas,
                filterList:res.data.data.cinemas
            },()=>{
                console.log(this.state.cinemaList);
            })
            console.log(this.state.cinemaList);
        })
    }
    render() {
        return(
            <div>
                <div><input type="text" className={'cinemaInput'} onInput={this.handleInput}/></div>
                <div>
                    {
                        this.state.cinemaList.map(item=><dl key={item.cinemaId}>
                            <dt>{item.name}</dt>
                            <dd>{item.address}</dd>
                        </dl>)
                    }
                </div>
            </div>
        )
    }
    handleInput = (event)=>{
        console.log(event.target.value)
        this.setState({
            cinemaList:this.state.filterList.filter(item=>item.name.toUpperCase().includes(event.target.value.toUpperCase())||
            item.address.toUpperCase().includes(event.target.value.toUpperCase()))
        })
    }
}