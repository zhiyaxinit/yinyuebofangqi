import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './player.css'

import {connect} from 'react-redux'
import { getSongMp3,getRc } from '../../server/searchMp3'

import Player from './player/player'

import classnames from 'classnames'

/* 
  拿歌曲：
    1. 在songList这个组件中点击了歌曲，点击那个歌曲就播放哪一个
      componentWillReceiveProps在这里接收props，去发送
    2. 点击上一曲下一曲
        在playBottom组件中就可以完成

*/

class PlayBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 1,
      currentTime:0,
      isShowPlayer: false,
      index: 0,  // 记录当前播放到哪一首歌曲
      isPlay: true,  // 记录歌曲是否在播放
      playInfo: {
        //imgUrl: ''
      },  // 要播放歌曲的信息
      GeciTime:[],
      SongGeci:[],
      Geci:''
    };
//拿到audio标签
    this.audio = React.createRef();
  }

  getSongInfoMethodByHash = (hash) => {
    
    if (hash) {
      getSongMp3({ hash }).then(({ data }) => {
        let index = this.props.songList.findIndex(item => item.hash === hash);
        console.log('data', data)

        this.setState({
          playInfo: data,
          index: index,
          isPlay: true
        })
      })
    }
  }
  //获取歌词的方法
  getGeciInfoMethodByHashKeyword = (hash,keyword) => {
    if(hash,keyword){
      getRc({hash,keyword}).then(({data}) =>{
         data.split('\n').pop()
        let SongGeci = data.split('\n')
        console.log('SongGeci',SongGeci)
        let GeciTime=[];
        SongGeci.map((item,index)=>{
          GeciTime.push(parseInt(item.slice(1,3))*60+parseInt(item.slice(4,6))+parseInt(item.slice(7,9))/100)
        })
        GeciTime.shift()
        this.setState({
          GeciTime:GeciTime,
          SongGeci:SongGeci
        })
        console.log('00',GeciTime)
      })
    }
  }
 
  //componentDidMount只会触发一次
  componentDidMount() {
    // 监听audio事件
    let audio = this.audio.current;
    //audio.addEventListener('')
  }

  // 只有外界出给你的props更新了，就会触发，组件内部状态变了，不触发
  componentWillReceiveProps(nextProps) { 
    // this.props 是更新之前的
    // 更新之后的是参数 nextProps
    //console.log('props更新了')
    // props更新的时候，需要向后端发送请求，拿到歌曲数据

    let { hash,filename } = nextProps;
    console.log('33333',nextProps)
    this.getSongInfoMethodByHash(hash)
    this.getGeciInfoMethodByHashKeyword(hash,filename)
  }

  // 下一首
  nextSong = () => {
    let index = this.state.index;
    index++;
    if(index > this.props.songList.length - 1){
      index = 0;
    }
    // 下一首歌曲的hash
    let hash = this.props.songList[index].hash;
    this.getSongInfoMethodByHash(hash)
    this.getGeciInfoMethodByHashKeyword(hash,this.props.songList[index].filename)
  }

  // 上一首
  prevSong = () => {
    let index = this.state.index;
    index--;
    if (index < 0) {
      index = this.props.songList.length - 1;
    }
    // 下一首歌曲的hash
    let hash = this.props.songList[index].hash;
    this.getSongInfoMethodByHash(hash)
    this.getGeciInfoMethodByHashKeyword(hash,this.props.songList[index].filename)
  }

  // 播放或暂停
  playOrPause =() => {
    let audio = this.audio.current;
    console.dir(audio)
    if (audio.paused){
      audio.play();
    }else{
      audio.pause();
    }

    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  // 音频加载完成
  onLoadedMetadata = () => {
    console.log('加载完成')
    this.setState({
      duration: this.audio.current.duration
    })
  }

  // 位置发生变化
  ontimeupdate = () => {
    console.log('正在播放')
    this.setState({
      currentTime: this.audio.current.currentTime
    })
    console.log('999',this.audio.current.currentTime)
    console.log('999',this.state.GeciTime)

    let New = [];
    this.state.SongGeci.map((item) =>{
    New.push(item)
    })
    let index = this.state.GeciTime.findIndex((item) => parseInt(item) > parseInt(this.audio.current.currentTime))
    let SongShow = New[index].replace(/^\[.+\]/,'');
    this.setState({
      Geci:SongShow
    })
    console.log('geci',SongShow)
  }

  // 在子级的子级中控制currentTime
  uodateCurrentTime = (t) => {
    this.setState({
      currentTime: t
    })

    this.audio.current.currentTime = t;
  }

  render() {
    let { playInfo} = this.state;

    /* console.log('当前播放的歌曲下表为', this.state.index)
    console.log('总时间', this.state.duration)
    console.log('当前播放时间', this.state.currentTime) */

    return this.props.hash ? ReactDOM.createPortal(
      
      <div className="play-bottom" onClick={() => {
        console.log('冒泡来了')
      }}>
        <audio id="audio"
          onLoadedMetadata={this.onLoadedMetadata}
          onTimeUpdate={this.ontimeupdate}
          onEnded={this.nextSong}
          ref={this.audio} 
          autoPlay src={playInfo.url}
        ></audio>
        <div className="play-left" onClick={() => {
          this.setState({
            isShowPlayer: true
          })
        }}>
          <img src={playInfo.imgUrl && playInfo.imgUrl.replace('{size}',240)} alt="" />
            <p>
            <span>{playInfo.songName}</span>
            <span>{playInfo.singerName}</span>
            </p>
        </div>
          <div className="play-right">
            <div className="iconfont  icon-audio_last_step prev-song"
            onClick={this.prevSong}
            ></div>
            <div
            className={classnames({
              iconfont: true,//符合命名规则
              'play-song': true,
              'icon-bofang': !this.state.isPlay,
              'icon-zanting': this.state.isPlay
            })}
              onClick={this.playOrPause}
            ></div>
            <div 
              className="iconfont  icon-audio_next_step next-song"
              onClick={this.nextSong}
            ></div>
          </div>
          {
            this.state.isShowPlayer 
              ? <Player 
                  playOrPause={this.playOrPause} 
                  isPlay={this.state.isPlay}
                  nextSong={this.nextSong}
                  prevSong={this.prevSong}
                  duration={this.state.duration}
                  currentTime={this.state.currentTime}
                  uodateCurrentTime={this.uodateCurrentTime}
                  imgUrl={this.state.playInfo.imgUrl}
                  Geci={this.state.Geci}
                /> 
              : null
          }
          
        </div>
    ,document.body) : null;
  }
}
//从redux中取出来的
//mapStateToprops取值来映射
function mapStateToprops(state) {
  return {
    hash: state.hash,
    filename: state.filename,
    songList: state.songList
  }
}

export default connect(mapStateToprops)(PlayBottom);
