import React from 'react';

// import { HashRouter,Switch,Route,Redirect }  from 'react-router-dom'

import TabBar from '../../components/common/TabBar'

class Home extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="Home">
                <TabBar />
            </div>
         );
    }
}
 
export default Home;