import React from 'react';

import { NavBar, Icon } from 'antd-mobile';


import styles from './index.module.scss'
import handleData from './handleData'

import baiduMap from '../../utils/baiduMap'


class SelectCity extends React.Component {
    state = {
        citylist: []
    }
    componentDidMount() {
        //获取城市列表
        baiduMap().then(ress => {
            handleData(ress.address.city).then(res => {
                this.setState({ citylist: res })
            })
        })
       
    }
    render() {
        const { history } = this.props
        const { citylist } = this.state
        return (
            <div className={styles.SelectCity}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >选择城市</NavBar>
                <div className={styles.city_parent}>
                    {
                        citylist.map((item, index) => {
                            return <div  key={index}>
                                <div  className={styles.title_style}>{item.title}</div>
                               {
                                    item.children.map((child, childindex) => {
                                      return <div key={childindex} className={styles.item_style} >{child.city}</div>
                                    })
                               }
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}



export default SelectCity;