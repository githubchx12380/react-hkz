
const baiduMap = () => {
    return  new Promise((resolve,reject) => {
        const geolocation = new window.BMap.Geolocation();
            geolocation.getCurrentPosition(function(res){
                if(this.getStatus() === window.BMAP_STATUS_SUCCESS){
                    resolve(res)
                }
                else {
                    reject('err')
                }        
            })
    })
}

export default baiduMap

