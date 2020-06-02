import React from 'react'
import { TabBar } from 'antd-mobile';

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
  }

  renderContent(pageText) {
    return (
        <>
        </>
    );
  }

  render() {
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
            selected
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
            {this.renderContent('Life')}
          </TabBar.Item>
          <TabBar.Item
            title="找房"
            key="Middle"
            icon={ <i className="iconfont icon-findHouse" /> }
            selectedIcon={ <i className="iconfont icon-findHouse" /> }
            selected
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
            {this.renderContent('Middle')}
          </TabBar.Item>
          <TabBar.Item
            title="找房"
            key="Right"
            icon={ <i className="iconfont icon-my" /> }
            selectedIcon={ <i className="iconfont icon-my" /> }
            selected
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
            {this.renderContent('Right')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample