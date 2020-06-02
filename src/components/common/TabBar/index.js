import React from 'react'
import { TabBar } from 'antd-mobile';

class TabBarExample extends React.Component {
  state = {
    selectedTab: 'redTab',
    hidden: false,
  };
  render() {
    const history = this.props.history
    const pathname = this.props.location.pathname
    return (
      <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21b97a"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={ <i className="iconfont icon-ind" /> }
            selectedIcon={ <i className="iconfont icon-ind" /> }
            selected={pathname === '/home/index'}
            onPress={() => {history.push('/home/index')}}
          >
            
          </TabBar.Item>
          <TabBar.Item
            title="找房"
            key="Middle"
            icon={ <i className="iconfont icon-findHouse" /> }
            selectedIcon={ <i className="iconfont icon-findHouse" /> }
            selected={pathname === '/home/found'}
            onPress={() => {history.push('/home/found')}}
          >
            
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="Right"
            icon={ <i className="iconfont icon-my" /> }
            selectedIcon={ <i className="iconfont icon-my" /> }
            selected={pathname === '/home/my'}
            onPress={() => {history.push('/home/my')}}
          >
          
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample