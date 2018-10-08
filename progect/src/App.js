import React,{Component} from 'react';
//先引入第三方组件库
import 'antd-mobile/dist/antd-mobile.css'
import Routes from './views/routes'
import {
  BrowserRouter as Router,
  NavLink,
  Route
} from 'react-router-dom'
// 一个组件在另一个组件的模板中使用，称之为是子组件 另一个是父组件
import Header from './components/header/header'
import PlayBottom from './components/playerBottom/playerBottom'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers/reducers'
let data={
  hash:'',
  songList:[]
}
//createStore创建一个容器
//reducers是改写规则；data数据初始化
//要让所有组件知道我的存在，所以要包装一下Provider，如果要使用redux,包装所有
let store = createStore(reducers,data);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <div className="content" style={{paddingTop: '1.75rem'}}>
                <Routes />
            </div>
            <PlayBottom  />
            
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;