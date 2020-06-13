import React from 'react'
import { NavBar, Icon,PickerView } from 'antd-mobile';
import SearchInput from '../../../components/common/searchInput'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import { get_option } from '../../../api/Found'
import { map_city } from '../../../api/Map'
const seasons = [
    [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ],
    [
      {
        label: '春',
        value: '春',
      },
      {
        label: '夏',
        value: '夏',
      },
    ],
  ];
  
  const season = [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ];
  
  const province = [
    {
      label: '北京',
      value: '01',
      children: [
        {
          label: '东城区',
          value: '01-1',
        },
        {
          label: '西城区',
          value: '01-2',
        },
        {
          label: '崇文区',
          value: '01-3',
        },
        {
          label: '宣武区',
          value: '01-4',
        },
      ],
    },
    {
      label: '浙江',
      value: '02',
      children: [
        {
          label: '杭州',
          value: '02-1',
          children: [
            {
              label: '西湖区',
              value: '02-1-1',
            },
            {
              label: '上城区',
              value: '02-1-2',
            },
            {
              label: '江干区',
              value: '02-1-3',
            },
            {
              label: '下城区',
              value: '02-1-4',
            },
          ],
        },
        {
          label: '宁波',
          value: '02-2',
          children: [
            {
              label: 'xx区',
              value: '02-2-1',
            },
            {
              label: 'yy区',
              value: '02-2-2',
            },
          ],
        },
        {
          label: '温州',
          value: '02-3',
        },
        {
          label: '嘉兴',
          value: '02-4',
        },
        {
          label: '湖州',
          value: '02-5',
        },
        {
          label: '绍兴',
          value: '02-6',
        },
      ],
    },
  ];
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

      this.setState({filter_option})
      console.log(this.state.filter_option);
      
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
                <div>222</div>
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