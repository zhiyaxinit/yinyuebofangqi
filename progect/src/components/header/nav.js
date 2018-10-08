import React, { Component } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';
import { navConfig} from '../../router/config'
import { withRouter } from 'react-router-dom'
const tabs = navConfig;

//  Line 5:  Import in body of module; reorder to top
class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let initialPage = 0;
    // 刷新之后，通过地址栏的地址找到对应的下标，给到初始的tabs
    let item = tabs.findIndex((item) => this.props.location.pathname === item.path)
    if(item !== -1){
      initialPage = item;
    }
    return (
      <div>
        <Tabs tabs={tabs}
          initialPage={initialPage}
          onChange = {(tab,index) => {
            console.log(tab, index)
            this.props.history.push(tab.path);
          }}
        ></Tabs>
      </div>
    )
  }
}

export default withRouter(Nav)
