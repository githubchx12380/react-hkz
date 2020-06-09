let a = 1

const fn = () => {
    return new Promise((resolve,reject) => {
        a += a
        return a
    })
}