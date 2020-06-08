import React from 'react';

import { NavBar, Icon } from 'antd-mobile';

import { connect } from 'react-redux'

import styles from './index.module.scss'
import handleData from './handleData'



class SelectCity extends React.Component {
    state = {
        citylist: []
    }
    componentDidMount() {
        //获取城市列表
        handleData(this.props.city).then(res => {
            this.setState({ citylist: res })
        })
    }
    render() {
        const { history } = this.props
        const { citylist } = this.state
        console.log(citylist);
        
        return (
            <div className={styles.SelectCity}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >选择城市</NavBar>
                <div>
                    {
                        citylist.map((item, index) => {
                            return <div>
                                <div  className={styles.title_style} key={index}>{item.title}</div>
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

const mapStateToProps = (state) => {
    return {
        city: state.city.citylist.city
    }
}


export default connect(mapStateToProps)(SelectCity);