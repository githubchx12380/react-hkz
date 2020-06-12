import React, { Component } from 'react';

import { NavBar, Icon } from 'antd-mobile';

import { connect } from 'react-redux'

import styles from './index.module.scss'

import { map_city,map_houseinfo } from '../../api/Map'

let BMap = window.BMap

let map;
let num = 1
class MapFound extends Component {
    state = {  }

    mapLevel = [
        { level: 1, zoom: 10, className: 'map_label' },  // 一级市
        { level: 2, zoom: 14, className: 'map_label' },  // 一级市
        { level: 3, zoom: 15, className: 'map_rect' },  // 一级市
    ];
    num = 0
    handlehouseRender = async (id,center) => {
        setTimeout(() => {
            map.clearOverlays()
        })
        console.log(center,this.mapLevel[this.num].zoom);
        
        map.centerAndZoom(center,this.mapLevel[this.num].zoom)
        const houseInfo = (await map_houseinfo(id)).data.body
        

        houseInfo.forEach(item => {
                const point = new BMap.Point(item.coord.longitude,item.coord.latitude)
                let opts = {
                    position:point,
                    offset: new BMap.Size(-50,Math.floor(Math.random() * 10) + 1)
                }
                // map.centerAndZoom(point,mapLevel[num])
                const label = new BMap.Label(`<div class="${this.mapLevel[this.num].className}"><span>${item.label}</span>${item.count}套<span></span></div>`,opts)
                label.setStyle({
                    backgroundColor:'none',
                    border:'none'
                })
                
                map.addOverlay(label)
                label.addEventListener('click', () => {
                    if(this.num === 2) {

                    }else{
                        this.num++
                        this.handlehouseRender(item.value,point)
                    }
                })
                
        })
    }
    async componentDidMount() {
       const { city } = this.props
       map = new BMap.Map("map_container");          // 创建地图实例  
       map.addControl(new BMap.NavigationControl());    
       setTimeout(() => {
        map.addControl(new BMap.ScaleControl())
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