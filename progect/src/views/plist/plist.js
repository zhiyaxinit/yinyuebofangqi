import React,{Component} from 'react';
import {getPlist} from '../../server';
import { List } from 'antd-mobile';
import { getDataComponent } from '../../components/getDataComponent'
const Item = List.Item;
const Brief = Item.Brief;
class Plist extends Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                data:[]
            }
        }
    }
    componentDidMount(){
        getPlist().then(({data})=>{
            console.log(data)
            this.setState({
                data:data
            })
        })
    }
    render(){
        let {data} = this.state.data
        console.log('歌单',this.state.data.data)
        return(
            <div className="singer-list">
                <List>
                    {
                        data.map((item,index)=>{
                            return(
                                <Item
                                    key={index}
                                    thumb={item.imgurl.replace('{size}',240)}
                                    arrow="horizontal"
                                    onClick={()=>{
                                        this.props.history.push('/plist/list/'+item.specialid)
                                    }}
                                    multipleLine
                                >{item.specialname}
                                    <Brief><i className='iconfont icon-erji'></i>{item.playcount}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}
export default getDataComponent('getPlist')(Plist)