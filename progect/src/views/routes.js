import React,{Component} from 'react'
import config from '../router/config'
import {Route} from 'react-router-dom'
class Routes extends Component{
    render(){
        return(
            <React.Fragment>
                {
                    config.map((item) =>{
                        return (
                            <Route
                                exact
                                key={item.path}
                                path={item.path}
                                component={item.component}
                            >
                            </Route>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}
export default Routes