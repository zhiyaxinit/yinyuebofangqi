import React, { Component } from 'react'
// import { getSongMp3 } from '../../server/searchMp3'
export default class Lyrcc extends Component {
  render() {
    return (
      <div className="m-lyric-area">
        <div className="m-lyric">
          <img src={this.props.imgUrl.replace('{size}',240)} className="lyrcc-potopic Rotationsss img"/>
          <p>{this.props.Geci}</p>
        </div>
      </div>
    )
  }
}
