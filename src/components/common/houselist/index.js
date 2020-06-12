import React from 'react'

import styles from './index.module.scss'

class HouseList extends React.Component {
    state = {

    }
    render() { 
        return ( 
            <div className={styles.houselist}>
                <div className={styles.house_item_img}>
                    
                </div>
                <div className={styles.house_item_info}>
                    <h4 className={styles.item_title}>峻林 4室2厅 25000元</h4>
                    <span className={styles.item_desc}>四室/95/南/峻林</span>
                    <div className={styles.item_icons}>
                        <span>近地铁</span>
                        <span>近地铁</span>
                    </div>
                    <h4 className={styles.item_money}>25000</h4>
                </div>
            </div>
         );
    }
}
 
export default HouseList;