import request from '../request'

//轮播图
export const Home_Swiper = () => {
    return request({
        url:'/home/swiper',
    })
}


//group 
export const group_Data = () => {
    return request({
        url:'/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    })
}