
const city = {
    citylist:{
        city:'',
    }
}

const reducer = (state = city,action) => {
    if(action.type === 'add_city') {
        let result = JSON.parse(JSON.stringify(state))
        result.citylist.city = action.value
        return result
    }
    return state
}

export default reducer
