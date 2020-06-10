import axios from 'axios'
import { Toast} from 'antd-mobile';
const request = axios.create({
    baseURL:'https://api-haoke-web.itheima.net',
    // baseURL:'http://157.122.54.189:9060'
})

let num = 0
request.interceptors.request.use(function (config) {
    num++
    Toast.loading('正在加载中..',3)
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
 
request.interceptors.response.use(function (response) {
    num--
    if(num === 0) {
        Toast.hide()
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default request