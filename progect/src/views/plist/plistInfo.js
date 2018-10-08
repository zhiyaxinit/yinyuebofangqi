import React,{Component} from 'react';
import {getPlistInfo} from '../../server/plist';
import SongList from '../comm/songList';
export default class PlistInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            info:''
           
        }
    }
    componentDidMount(){
        getPlistInfo({id:this.props.match.params.id}).then(({data})=>{
            console.log('plistinfo',data)
            let info = data.info.list;
            console.log('111',info)
            let list = data.list.list.info;
            console.log('222',list)
            this.setState({
                data : list,
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
                    alt={info.singername} 
                    src={info.replace('{size}',400)} />
                <div style={{ marginTop: '-2rem' }}>
                    <SongList songList={data}></SongList>
                </div>
            </div>
        )
    }
}