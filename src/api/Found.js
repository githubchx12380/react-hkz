import request from '../request'

//获取Found选项数据
export const get_option = (id) => {
    return request({
        url:'/houses/condition',
        params:{
            id
        }
    })
}

//筛选房源
export const filter_house = (params) => {
    return request({
        url:'/houses',
        params
    })
}