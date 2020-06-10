import React, { Component } from 'react';

import { NavBar, Icon } from 'antd-mobile';

import { connect } from 'react-redux'

import styles from './index.module.scss'

import { map_city,map_houseinfo } from '../../api/Map'

let BMap = window.BMap

class MapFound extends Component {
    state = {  }
    async componentDidMount() {
       const { city } = this.props
       var map = new BMap.Map("map_container");          // 创建地图实例  
       var point = map.centerAndZoom(city)
       map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 
       map.addControl(new BMap.NavigationControl());    
       setTimeout(() => {
        map.addControl(new BMap.ScaleControl());    
       },1000)
       map.addControl(new BMap.OverviewMapControl());    
       map.addControl(new BMap.MapTypeControl()); 

       const id = (await map_city(city)).data.body.value
       const houseInfo = (await map_houseinfo(id)).data.body
       console.log(houseInfo);
       
       houseInfo.forEach(item => {
            let opts = {
                position:new BMap.Point(item.coord.longitude,item.coord.latitude)
            }
            const label = new BMap.Label(`<div class="map_label"><span>${item.label}</span>${item.count}套<span></span></div>`,opts)
            label.setStyle({
                backgroundColor:'none',
                border:'none'
            })
            map.addOverlay(label)
       })
       

    }
    render() { 
        return ( 
            <div className={styles.map_box}>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                >地图酒店</NavBar>
                <div className={styles.map_container} id="map_container"></div>
            </div>
         );
    }
}
 

const mapStateToProps = (state) => ({
    city:state.city.citylist.city
})


export default connect(mapStateToProps)(MapFound);