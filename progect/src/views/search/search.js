import React, { Component } from "react";
import { SearchBar, Button, WhiteSpace, WingBlank } from "antd-mobile";
import { connect } from "react-redux";
import "./search.css";
import { List } from "antd-mobile";
import jsonp from "jsonp";
const Item = List.Item;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      songList: []
    };
  }
  componentDidMount() {
    this.jsonPFun(
      "http://mobilecdn.kugou.com/api/v3/search/hot",
      "format=jsonp&plat=0&count=30&callback"
    );
  }

  jsonPFun = (url, params) => {
    jsonp(
      url,
      {
        param: params
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let list = data.data.info;
          this.setState({
            data: list
          });
        }
      }
    );
  };
  render() {
    let { data } = this.state;
    return (
      <div>
        <SearchBar
          placeholder="歌手/歌名/拼音"
          maxLength={8}
          onSubmit={value => {
            this.jsonPFun(
              "http://mobilecdn.kugou.com/api/v3/search/song",
              `format=jsonp&keyword=${value}&page=1&pagesize=30&showtype=1&callback`
            );
          }}
        />
        <div className="singer">
          <div className="search-list-title">最近热门</div>
          <List className="my-list">
            {data.map((item, index) => {
              return (
                <Item
                  key={index}
                  arrow="empty"
                  onClick={e => {
                    const value = e.target.children.length?e.target.children[0].innerHTML:e.target.innerHTML;
                    jsonp(
                      "http://mobilecdn.kugou.com/api/v3/search/song",
                      {
                        param: `format=jsonp&keyword=${value}&page=1&pagesize=30&showtype=1&callback`
                      },
                      (err, data) => {
                        if (err) {
                          console.log(err);
                        } else {
                          if (this.state.data.filter(item=>item.filename===value).length) return;
                          let list = data.data.info;
                          this.setState({
                            data: list
                          });
                        }
                      }
                    );

                    this.props.dispatch({
                      type: "updateHash",
                      hash: item.hash,
                      filename:item.filename
                    });
                    this.props.dispatch({
                      type: "updateSongList",
                      songList: this.state.data
                    });
                  }}
                >
                  {item.keyword}
                  {item.filename}
                </Item>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}
export default connect()(Search);
