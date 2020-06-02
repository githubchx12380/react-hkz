import React from 'react';

import { HashRouter,Switch,Route,Redirect }  from 'react-router-dom'

import Home from '../src/view/Home'
import SelectCity from '../src/view/SelectCity'
import MapFound from '../src/view/Mapfound'
import NotPage from '../src/view/NotPage'

class App extends React.Component {
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
           <Route path="/selectcity" component={SelectCity}></Route>
           <Route path="/mapfound" component={MapFound}></Route>
           <Route exact component={NotPage}></Route>
         </Switch>
       </HashRouter>
     </div>
    )
  }
}
export default App;
