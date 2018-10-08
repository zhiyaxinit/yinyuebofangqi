import React,{Component} from 'react';
import {getDataComponent} from '../../../components/getDataComponent';
import {List} from 'antd-mobile'
import '../singer.css'
const Item = List.Item
class singerList extends Component{
    render(){
        let{data} = this.props.data;
        console.log('singlist',data);
        return(
            <div className="singer-list">
                <List>
                    {
                        data.map((item)=>{
                            return(
                                <Item
                                    key={item.singerid}
                                    thumb={item.imgurl.replace('{size}',240)}
                                    arrow="horizontal"
                                    onClick={()=>{
                                        this.props.history.push(`/singer/info/${item.singerid}`)
                                    }}
                                >{item.singername}</Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}
export default getDataComponent('getSingerList',function(props){
    return {classid:props.match.params.id}
})(singerList)