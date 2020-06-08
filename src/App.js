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
    baiduMap().then(res => {
      this.props.handleCity(res.address.city)
    })
  }
  render() {    
    return (
     <div className="App">
       <HashRouter>
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
     </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    city:state.city.citylist.city
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleCity(value) {
      let action = {
        type:'add_city',
        value:value
      }
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
