import axios from 'axios'

const request = axios.create({
    baseURL:'http://157.122.54.189:9060'
})

export default request