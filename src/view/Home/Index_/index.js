import React from 'react'

import Swiper from '../../../components/common/Swiper'

import styles from './index.module.scss'

import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'

import { group_Data } from '../../../api/Home'
import request from '../../../request'
class Index extends React.Component {
    state = { 
        menu:[
            {id:1,title:'整租',img:Nav1},
            {id:2,title:'合租',img:Nav2},
            {id:3,title:'地图找房',img:Nav3},
            {id:4,title:'去出租',img:Nav4},
        ],
        group:[]
    }
    componentDidMount() {
        this.get_groupData()
    }
    //获取group数据
    get_groupData() {
        group_Data().then(res => {
            this.setState({group:res.data.body})
        })
    }
    render() { 
        const { group,menu }  = this.state
       
        return ( 
            <div>
                <Swiper />
                <div className={styles.menu_parent}>
                    {menu.map((item) => {
                    return <div key={item.id} className={styles.menu_item}>
                                <img src={item.img} alt=""/>
                                <span>{item.title}</span>
                            </div>
                    })}
                </div>
                <div className={styles.group}>
                    <div className={styles.group_title}>
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </div>
                    <div className={styles.group_parent}>
                        {
                            group.map(item =>
                             <div key={item.id} className={styles.group_item}>
                                <div className={styles.content}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                    </div>
                                    <div>
                                        <img style={{width:'53px'}} src={request.defaults.baseURL + item.imgSrc} alt=""/>
                                    </div>
                             </div>)
                        }
                        
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Index;