

export const makeNestedChildren = (arr, parent = 0) => {
    
    let out = []
    for (let i in arr) {
        if (arr[i].parent === parent) {
            let children = makeNestedChildren(arr, arr[i].id)

            if (children.length) {
                arr[i].children = children
            }

            out.push(arr[i])
        }
    }
    const newOut = out.map(item => {
        
        const newTitle = item.type === 'page' ? item.title.toUpperCase() : `<${item.title}/>`
        
        return {
            ...item,
            key: item.id,
            title: newTitle
        }

    })

    return newOut
}

export const makeKeysForArray = array => {
    console.log('wwww', array)
    const fakeArray = [{id: 1, title: 'PAGES', parent: 0}, {id: 2, title: 'COMPONENTS', parent: 0}, {id: 3, title: 'DATA', parent: 0}]
    
    const indexes = {
        page: 1,
        component: 2,
        data: 3
    }    
    
    const reallyArray = array.map(item => {
        return {
            ...item,
            key: item.id,
            parent: indexes[item.type]
        }
    })

    const resultArray = [...fakeArray, ...reallyArray]

    console.log('resulttt', resultArray)

    const result = makeNestedChildren(resultArray)

    return result
}