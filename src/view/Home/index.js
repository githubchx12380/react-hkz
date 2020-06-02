import React from 'react';

import { Route,Redirect }  from 'react-router-dom'

import TabBar from '../../components/common/TabBar'

import Index from './Index_'
import Found from './Found'
import My from './My'

class Home extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="Home">
                <Route exact path="/home">
                    <Redirect to="/home/index"></Redirect>
                </Route>
                <Route path="/home/index" component={Index}></Route>
                <Route path="/home/found" component={Found}></Route>
                <Route path="/home/my" component={My}></Route>
                <TabBar {...this.props} />
            </div>
         );
    }
}
 
export default Home;