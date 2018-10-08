import React,{Component} from 'react';
import {getRankInfo} from '../../server/rank';
import SongList from '../comm/songList';
export default class RankInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            info:''
        }
    }
    componentDidMount(){
        getRankInfo({id:this.props.match.params.id}).then(({data})=>{
            console.log('1111',data)
            let info = data.info
            console.log('22',info);
            let list = data.songs.list
            console.log('33',list);
            this.setState({
                data:list,
                info:info.imgurl
            })
        })
    }
    render(){
        let {match} = this.props;
        let {data,info} = this.state;
        return(
            <div>
                <img 
                    style={{marginTop:'-2rem'}}
                    alt={info.filename} 
                    src={info.replace('{size}',400)} />
                <div style={{ marginTop: '-2rem' }}>
                    <SongList songList={data}></SongList>
                </div>
            </div>
        )
    }
}