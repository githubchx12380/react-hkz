//改造城市数据
import { get_citylist,get_hot } from '../../api/Home'

const handleData = (dqcity) => {
    return new Promise(async resolve => {
        let cityList = []
        cityList.push({
            title:'当前城市',
            children:[{city:dqcity.replace(/市$/,'')}]
        })

        const cityHot = (await get_hot()).data.body
        
        cityList.push({
            title:'热门城市',
            children:cityHot.map(v => ({city:v.label}))
        })        
        const newList = (await get_citylist()).data.body
        
        newList.sort((a,b) => a.short > b.short ? 1 : -1)        
        
        newList.forEach(item => {
            const faont = item.short.charAt(0).toUpperCase()
            const index = cityList.findIndex(item => {
                return item.title === faont
            })
            if(index === -1) {
                cityList.push({
                    title:faont,
                    children:[{city:item.label}]
                })
            }
            else{   
                cityList[index].children.push({city:item.label})
            }            
        })        
        
       resolve(cityList)
    })
}

export default handleData