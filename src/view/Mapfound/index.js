import React, { Component } from 'react';

import { NavBar, Icon } from 'antd-mobile';

import { connect } from 'react-redux'

import styles from './index.module.scss'

import { map_city,map_houseinfo } from '../../api/Map'

let BMap = window.BMap

let map;
class MapFound extends Component {
    state = {  }
    handlehouseRender = async (id,city) => {
        setTimeout(() => {
            map.clearOverlays()
        })
        
        const houseInfo = (await map_houseinfo(id)).data.body
        
        houseInfo.forEach(item => {
           
                let opts = {
                    position:new BMap.Point(item.coord.longitude,item.coord.latitude),
                    offset: new BMap.Size(-50,Math.floor(Math.random() * 10) + 1)
                }
                const label = new BMap.Label(`<div class="map_label"><span>${item.label}</span>${item.count}套<span></span></div>`,opts)
                label.setStyle({
                    backgroundColor:'none',
                    border:'none'
                })
                
                map.addOverlay(label)
                label.addEventListener('click', () => {
                    this.handlehouseRender(item.value)
                    map.zoomIn()
                })
                
        })
    }
    async componentDidMount() {
       const { city } = this.props
       map = new BMap.Map("map_container");          // 创建地图实例  
       map.centerAndZoom(city)
       map.addControl(new BMap.NavigationControl());    
       setTimeout(() => {
        map.addControl(new BMap.ScaleControl());    
       },1000)
       map.addControl(new BMap.OverviewMapControl());    
       map.addControl(new BMap.MapTypeControl()); 

       const id = (await map_city(city)).data.body.value
        this.handlehouseRender(id,city)
       

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