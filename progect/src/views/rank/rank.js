
import React, { Component } from 'react'
import { getRankList } from '../../server'
import { getDataComponent } from '../../components/getDataComponent'
import SongList from '../comm/songList'
import { List } from 'antd-mobile';

const Item = List.Item;
 class Rank extends Component {
  
  render() {
    console.log('222','info',this.props)
    let{data} = this.props.data
    return(
      <div className="singer-list">
        <List>
          {
            data.map((item,index) => {
              return (
                <Item
                  key={index}
                  thumb={item.imgurl.replace('{size}',240)}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`/rank/info/`+item.rankid)
                   }}
                >{item.rankname}</Item>
              )
            })
          }
          
        </List>
      </div>
    )
  }
}
export default getDataComponent('getRankList',function(props){
  return {
    singerid: props.match.params.id
  }
})(Rank)