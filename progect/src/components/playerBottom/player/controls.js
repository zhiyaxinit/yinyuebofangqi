import React, { Component } from 'react'
import classnames from 'classnames'
/* 
  touchStart
  touchMove
  touchEnd
*/
export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minX:0,
      maxX: 0,
      l: 0,
      isMove: false
    };
    this.circle = React.createRef()
    this.progress = React.createRef()
  }
  componentWillReceiveProps(nextProps){
    let l = this.props.currentTime / this.props.duration * this.state.maxX;
    if(!this.state.isMove){
      this.setState({
        l:l
      })
    }
  }
  componentDidMount() {
    this.setState({
      maxX: this.progress.current.clientWidth - this.circle.current.offsetWidth
    })
  }
  start = () => {
    this.setState({
      isMove: true
    })
  }
  move = (e) => {
    // 作用的手指的事件对象列表
    console.log(e.changedTouches[0])
    let react = this.progress.current.getBoundingClientRect().left;
    let l = e.changedTouches[0].pageX - react - this.circle.current.offsetWidth / 2
    
    if (l < this.state.minX) l = this.state.minX;
    if (l > this.state.maxX) l = this.state.maxX;

    this.setState({
      l:l
    })

  }
  end = () => {
    this.setState({
      isMove: false
    })

    if (this.props.uodateCurrentTime){
      let t = this.circle.current.offsetLeft / this.state.maxX * this.props.duration;
      this.props.uodateCurrentTime(t)
    }

  }
  progressStart = (e) => {
    this.move(e);
    // setState更新是异步的，所以要在数据更新之后，在获取元素的left
    // 写在setState第二个参数的回调函数中
    this.setState({
      isMove: true
    },() => {
      console.log('hello')
      if (this.props.uodateCurrentTime) {
        let t = this.circle.current.offsetLeft / this.state.maxX * this.props.duration;
        this.props.uodateCurrentTime(t)
      }
    })
    
  }
  progressEnd = () => {
    this.setState({
      isMove: false
    })
  }
  render() {

    //let l = this.props.currentTime / this.props.duration * this.state.maxX

    return (
      <div>
        <div className="m-bottom">
          <div className="m-progress-box">
            <span className="current-time">{parseInt
              (this.props.currentTime/60)+':'+(parseInt
              (this.props.currentTime%60)<10 ? '0'+parseInt
              (this.props.currentTime%60) : parseInt
              (this.props.currentTime%60))}</span>
            <div 
              className="m-progress" 
              ref={this.progress}
              onTouchStart={this.progressStart}
              onTouchEnd={this.progressEnd}
            >
              <div className="m-progress-line">
                <div className="m-progress-lineed" style={{ width: this.state.l + 'px' }}></div>
              </div>
              <div 
                className="m-progress-circle" ref={this.circle}
                  style={{left: this.state.l + 'px'}}
                  onTouchStart={this.start}
                  onTouchMove={this.move}
                  onTouchEnd={this.end}
                ></div>
            </div>
            <span className="total-time">{parseInt
              (this.props.duration/60)+':'+(parseInt
              (this.props.duration%60)<10 ? '0'+parseInt
              (this.props.duration%60) : parseInt
              (this.props.duration%60))}</span>
          </div>
          <div className="m-play-control">
            <div className="m-play-btn m-play-prev-btn iconfont icon-audio_last_step"
              onClick={this.props.prevSong}
            ></div>
            <div
              className={classnames({
                'm-play-play-btn': true,
                iconfont: true,
                'icon-bofang': !this.props.isPlay,
                'icon-zanting': this.props.isPlay
              })}
              onClick={this.props.playOrPause}
            ></div>
            <div 
            className="m-play-btn iconfont icon-audio_next_step m-play-next-btn"
              onClick={this.props.nextSong}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}
