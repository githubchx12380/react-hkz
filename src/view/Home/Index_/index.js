import React from 'react'

import Swiper from '../../../components/common/Swiper'

import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'

class Index extends React.Component {
    state = { 
        menu:[
            {id:1,title:'整租',img:Nav1},
            {id:2,title:'合租',img:Nav2},
            {id:3,title:'地图找房',img:Nav3},
            {id:4,title:'去出租',img:Nav4},
        ]
        
     }
    render() { 
        const menu  = this.state.menu
       
        return ( 
            <div>
                <Swiper />
                {menu.map((item) => {
                   return <div key={item.id}>
                            <img src={item.img} alt=""/>
                            <span>{item.title}</span>
                          </div>
                })}
            </div>
         );
    }
}
 
export default Index;