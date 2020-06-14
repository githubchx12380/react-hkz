import React from 'react';

import './styles/App.scss';

import { HashRouter,Switch,Route,Redirect }  from 'react-router-dom'

import { connect } from 'react-redux'


import Home from '../src/view/Home'
import SelectCity from '../src/view/SelectCity'
import MapFound from '../src/view/Mapfound'
import NotPage from '../src/view/NotPage'

import baiduMap from './utils/baiduMap'

class App extends React.Component {
  componentDidMount() {
      this.props.handleCity()
  }
  render() {    
    return (
     <div className="App">
       {
         (this.props.city) && <HashRouter>
         <Switch>
           <Route exact path="/">
              <Redirect to="/home">
              </Redirect>
           </Route>
           <Route path="/home" component={Home}></Route>
           <Route path="/citylist" component={SelectCity}></Route>
           <Route path="/mapfound" component={MapFound}></Route>
           <Route exact component={NotPage}></Route>
         </Switch>
       </HashRouter>
       }
     </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    city:state.city.citylist.city,
  }
}
const mapDispatchToProps = (dispatch) => ({
    handleCity:() => {
      baiduMap().then(res => {
        let action = {
          type:'add_city',
          value:res.address.city
        }
        dispatch(action)
      })
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(App);


