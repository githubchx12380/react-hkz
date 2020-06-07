import React from 'react'
import { Carousel } from 'antd-mobile';

import request from '../../../request'
import { Home_Swiper } from '../../../api/Home'

class Swiper extends React.Component {
  state = {
    data: [],
    imgHeight: '56.53vw',  
  }
  componentDidMount() {
    Home_Swiper().then(res => {
      this.setState({data:res.data.body})
    })
  }
  render() {
    const swiper_data = this.state.data
    return (
        <div style={{height:this.state.imgHeight}}>
          { !!swiper_data.length && 
           <Carousel
              autoplay
              infinite
            >
              {swiper_data.map(item => (
                <a
                  key={item}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={request.defaults.baseURL + item.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          }
        </div>
       
    );
  }
}

export default Swiper

