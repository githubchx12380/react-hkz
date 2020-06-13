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
        filter_option:[]
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
    handleDomContent = () => {
        const { currentIndex,filter_option,filterOption } = this.state
        if (currentIndex === 0 || currentIndex === 1 || currentIndex === 2) {
            return (
                <div>
                    <PickerView
                        onChange={this.onChange}
                        onScrollChange={this.onScrollChange}
                        value={this.state.value}
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
                            <div key={i} className={styles.right_item}>{v.label}</div>
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
                                    <div>确定</div>
                                </div>
                        </div> : 
                        <div className={styles.box_zindex}>
                                <div className={styles.filter_content_right}>
                                    {this.handleDomContent()}
                                    <div className={styles.filter_btn}>
                                        <div>清除</div>
                                        <div>确定</div>
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