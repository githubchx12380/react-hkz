import React from 'react';

import { NavBar, Icon, Toast } from 'antd-mobile';


import styles from './index.module.scss'
import handleData from './handleData'

import { connect } from 'react-redux'

import baiduMap from '../../utils/baiduMap'

import { List } from 'react-virtualized'


class SelectCity extends React.Component {
    constructor() {
        super()
        this.refCom = React.createRef()
    }
    state = {
        citylist: [],
        letter:[],
        currentIndex:5
    }
    rowRenderer = ({key, index, style}) => {
        const { citylist } = this.state
        return (
          <div key={key} style={style} className={styles.city_parent}>
              <div className={styles.title_style}>{citylist[index].title}</div>
            {
                citylist[index].children.map((item,itemindex) => (
                    <div key={itemindex} className={styles.item_style} onClick={() => {this.citySateRedux(item.city)}}>{item.city}</div>
                ))
            }
          </div>
        );
    }
    //点击改变redux城市
    citySateRedux(city) {
       let { citylist } = this.state
       const findIndex = citylist[1].children.findIndex(v => v.city === city)
       if(findIndex === -1) {
           Toast.offline('此地区暂无房源',2)
           return
       }
       this.props.UpdateCity(city)
       this.props.history.goBack()
    }
    rowHeight = ({ index }) => {
        const { citylist } = this.state
        let height = citylist[index].children.length * 40 + 40
        return height
    }
    //改变索引,更换样式
     handleCurrentIndex = (currentIndex) => {
        this.setState({currentIndex})
        this.refCom.current.scrollToRow(currentIndex);
        
    }
    //获取城市列表
    componentDidMount() {
        console.log(this.props);
        
        
            handleData(this.props.city).then(res => {
                const letter = res.map(v => v.title)
                letter.splice(0,2,'#','热')
                this.setState({ citylist: res,letter:letter })
                this.refCom.current.measureAllRows(); 
            })     
    }
    //滚动高度监听,获取下标
    handleTopIndex = ({ startIndex }) => {
        if(startIndex === this.state.currentIndex) return
        this.setState({currentIndex:startIndex})
    }
    render() {
        const { history } = this.props
        const { citylist,letter,currentIndex } = this.state
        return (
            <div className={styles.SelectCity}>
                <NavBar
                    className={styles.nav_bar}
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.goBack()}
                >选择城市</NavBar>
                <List
                    ref={this.refCom}
                    onRowsRendered={this.handleTopIndex}
                    scrollToAlignment='start'
                    width={window.screen.width}
                    height={window.screen.height - 45}
                    rowCount={citylist.length}
                    rowHeight={this.rowHeight}
                    rowRenderer={this.rowRenderer}
                />
                <div className={styles.letter_box}>
                    <ul>
                        {
                            letter.map((item,index) => (
                                <li key={index} onClick={() => this.handleCurrentIndex(index)}>
                                    <span className={currentIndex === index ? styles.active_color : ''}>{item}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    city:state.city.citylist.city
})

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateCity(value){
            let action = {
                type:'add_city',
                value
            }
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SelectCity);