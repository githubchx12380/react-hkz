import React from 'react'

import styles from './index.module.scss'

import { withRouter } from 'react-router-dom'

class SearchInput extends React.Component {
    render() {
        const { city } = this.props
        return (
                <div className={styles.search_input}>
                    <div className={styles.search_left} onClick={() => this.props.history.push('/citylist')}>
                        <span>{city.replace(/市$/,'')}</span>
                        <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className={styles.search_ipt}>
                        <i className="iconfont icon-seach"></i>
                        <div>请输入小区或地址</div>
                    </div>
                    <div className={styles.search_right}>
                        <i className="iconfont icon-map"></i>
                    </div>
                </div>
        )
    }
}

export default withRouter(SearchInput)