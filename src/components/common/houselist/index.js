import React from 'react'

import styles from './index.module.scss'

import request from '../../../request'

class HouseList extends React.Component {
    state = {

    }
    render() {
        const { item } = this.props

        return (
            <div className={styles.houselist}>
                <div className={styles.house_item_img}>
                    <img src={request.defaults.baseURL + item.houseImg} alt="" />
                </div>
                <div className={styles.house_item_info}>
                    <h4 className={styles.item_title}>{item.title}</h4>
                    <span className={styles.item_desc}>{item.desc}</span>
                    <div className={styles.item_icons}>
                        {
                            item.tags.map((item,index) => <span key={index}>{item}</span>)
                        }
                    </div>
                    <h4 className={styles.item_money}>{item.price}</h4>
                </div>
            </div>
        );
    }
}

export default HouseList;