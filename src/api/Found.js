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