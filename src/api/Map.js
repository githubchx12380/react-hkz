import request from '../request'

//获取当前定位城市value
export const map_city = (city) => {
    return request({
        url:'/area/info',
        params:{
            name:city
        }
    })
}


//通过value获取房源
export const map_houseinfo = (id) => {
    return request({
        url:'/area/map',
        params:{
            id
        }
    })
}

