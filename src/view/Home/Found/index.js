import React from 'react'
import { NavBar, Icon,PickerView } from 'antd-mobile';
import SearchInput from '../../../components/common/searchInput'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import { get_option } from '../../../api/Found'
import { map_city } from '../../../api/Map'

class Found extends React.Component {
    state = {
        filterOption: [
            { id: 1, title: '区域',cols:3 },
            { id: 2, title: '方式',cols:1 },
            { id: 3, title: '租金',cols:1 },
            { id: 4, title: '筛选' },
        ],
        currentIndex: -1,
        filter_option:[],
        filter_succeeData:[[],[],[],[]]
    }
    componentDidMount() {
        this.getoptionData()
    }
     getoptionData = async () => {
      let filter_option = []
      const { city } = this.props
      const cityId = (await map_city(city)).data.body.value
      const res = (await get_option(cityId)).data.body
      
      filter_option[0] = [
        res.area,
        res.subway
      ]

      filter_option[1] = res.rentType

      filter_option[2] = res.price

      filter_option[3] = [
        {title:'户型',children:res.roomType},
        {title:'朝向',children:res.oriented},
        {title:'楼层',children:res.floor},
        {title:'房屋亮点',children:res.characteristic},
      ]

      this.setState({filter_option})
      
    }
    onChange = (value) => {
      const { filter_succeeData,currentIndex } = this.state
      filter_succeeData[currentIndex] = value
      this.setState({ filter_succeeData })
    }
    ChangeRequestData = () => {
        let { filter_succeeData } = this.state
        let key = filter_succeeData[0]
        let result = {}
       
        result = {
            [key[0]]:['null',undefined,''].includes(key[2]) ?  key[1] : key[2],
            rentType:filter_succeeData[1][0],
            price:filter_succeeData[2][0],
            more:filter_succeeData[3].join(',')
        }
        this.emitRequest(result)
    }
    emitRequest = (result) => {
        Object.keys(result).forEach(key => {
            (key === 'undefined' || ['null',undefined,''].includes(result[key])) && delete result[key]
        })
        console.log(result);
        /* -------------------------------- */
    }
    right_filter = (value) => {
        const { filter_succeeData,currentIndex } = this.state
        let filter_more = filter_succeeData[currentIndex]
        if(filter_more.indexOf(value) === -1) {
            filter_more.push(value)
        }else{
            filter_more.splice(filter_more.indexOf(value),1)
        }
        this.setState({filter_succeeData})
    }
    handleDomContent = () => {
        const { currentIndex,filter_option,filterOption,filter_succeeData } = this.state
        if (currentIndex === 0 || currentIndex === 1 || currentIndex === 2) {
            return (
                <div>
                    <PickerView
                        onChange={this.onChange}
                        onScrollChange={this.onScrollChange}
                        value={filter_succeeData[currentIndex]}
                        data={filter_option[currentIndex]}
                        cols={filterOption[currentIndex].cols}
                    />
                </div>
            )
        } else if (currentIndex === 3) {
            return (
                <div className={styles.right_box}>
                  {
                    filter_option[currentIndex].map((item,index) => (
                      <div className={styles.right_option_banner} key={index}>
                        <div className={styles.right_title}>{item.title}</div>
                        <div className={styles.right_item_box}>
                          {
                            item.children.map((v,i) => (
                            <div key={i} onClick={() => this.right_filter(v.value)} className={
                                [
                                    styles.right_item,
                                    filter_succeeData[3].indexOf(v.value) !== -1 ? styles.active : ''
                                ].join(' ')
                            }>{v.label}</div>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }
    render() {
        const { city, history } = this.props
        const { filterOption, currentIndex } = this.state
        return (
            <div className={styles.found} >
                {
                    currentIndex !== -1 && 
                    <div className={styles.shade} onClick={() => this.setState({currentIndex:-1})}></div>
                }
                <NavBar
                    mode="light"
                    icon={<Icon size="md" type="left" />}
                    onLeftClick={() => history.goBack()}

                ><SearchInput city={city} /></NavBar>

             
                <div className={`${styles.option_box} ${currentIndex !== 3 && styles.zIndex}`}>
                    <div className={styles.filter_option}>
                        {
                            filterOption.map((item,index) => 
                            <span 
                                className={index === currentIndex ? styles.active : ''} 
                                key={item.id} 
                                onClick={() => {this.setState({currentIndex:index})}}>
                                    {item.title}
                                <i className="iconfont icon-arrow" />
                            </span>
                            )
                        }
                    </div>
                </div>

                {
                        currentIndex >= 0 && (
                        currentIndex <= 2 ? 
                        <div className={styles.box_zindex}>
                                <div className={styles.filter_content}>
                                    {this.handleDomContent()}
                                </div>
                                <div className={styles.filter_btn}>
                                    <div>取消</div>
                                    <div onClick={this.ChangeRequestData}>确定</div>
                                </div>
                        </div> : 
                        <div className={styles.box_zindex}>
                                <div className={styles.filter_content_right}>
                                    {this.handleDomContent()}
                                    <div className={styles.filter_btn}>
                                        <div>清除</div>
                                        <div onClick={this.ChangeRequestData}>确定</div>
                                    </div>
                                </div>
                                
                        </div>
                    )
                }

            </div>
        );
    }
}
const mapStateToProps = state => ({
    city: state.city.citylist.city,
})

export default connect(mapStateToProps)(Found);