

export const makeNestedChildren = (arr, parent = 0) => {
console.log("makeNestedChildren -> arr", arr)
    
    let out = []
    for (let i in arr) {
        if (arr[i].parent === parent) {
            let children = makeNestedChildren(arr, arr[i].id_element)

            if (children.length) {
                arr[i].children = children
            }

            out.push(arr[i])
        }
    }

    return out
    // const newOut = out.map(item => {
        
    //     let newTitle =''

    //     if (item.type === 'page') {
    //         newTitle = item.title.toUpperCase()
    //     } 
    //     else if (item.type === 'component') {
    //         newTitle = `<${item.title}/>`
    //     } else {
    //         newTitle = item.title
    //     }       
        
    //     // = item.type === 'page' ? item.title.toUpperCase() : `<${item.title}/>`
        
    //     return {
    //         ...item,
    //         key: item.id,
    //         title: newTitle
    //     }

    // })

    // return newOut
}

export const makeDepoNode = (array) => {
    const depoNode = { id: 999999999, title: '-DEPO-', type: 'depo', parent: 0 }
    return [...array, depoNode]
}

export const makeKeysForArray = array => {

// console.log("array", array)


    const fakeArray = [{id: 1, title: 'PAGES', parent: 0}, {id: 2, title: 'COMPONENTS', parent: 0}, {id: 3, title: 'DATA', parent: 0}]
    
    const indexes = {
        page: 1,
        component: 2,
        data: 3
    }    
    
    let reallyArray = []
    
    if (array.length > 0) {
        reallyArray = array.map(item => {
            return {
                ...item,
                key: item.id,
                parent: indexes[item.type]
            }
        })
    }


    const resultArray = [...fakeArray, ...reallyArray]

    // console.log('resulttt', resultArray)

    const result = makeNestedChildren(resultArray)

    return result
}


export const findNested = (id, arr, result = []) => {    
    
    for (let i in arr) {
        if (arr[i].parent === id) {
            result.push(arr[i].id)
            findNested(arr[i].id, arr, result)
        }
    }

    return result
}
