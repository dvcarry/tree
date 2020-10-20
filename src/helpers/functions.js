


// export const makeNestedChildren = (array, parent = 0) => {

//     const arrayWithUpElement = [
//         {
//             id: 1,
//             type: 'component',
//             title: 'Index',
//             parent: 0,
//         },
//         ...array
//     ]
//     console.log("makeNestedChildren -> arrayWithUpElement", arrayWithUpElement)

//     let out = []

//     const makeNested = (arr , parent = 0) => {
//         for (let i in arr) {
//             if (arr[i].parent === parent) {
//                 let children = makeNested(arr, arr[i].id_element)

//                 if (children.length) {
//                     arr[i].children = children
//                 }

//                 out.push(arr[i])
//             }
//         }
//     }

//     makeNested(arrayWithUpElement)

// for (let i in arr) {
//     if (arr[i].parent === parent) {
//         let children = makeNestedChildren(arr, arr[i].id_element)

//         if (children.length) {
//             arr[i].children = children
//         }

//         out.push(arr[i])
//     }
// }

// return out


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
// }

export const makeNestedChildren = array => {

    const arrayWithUpElement = [
        {
            id: 1,
            type: 'component',
            title: 'Index',
            parent: 0,
        },
        ...array
    ]

    const out = []

    function getNestedChildren(arr, parent = 0, span = 0) {
        for (let i in arr) {
            if (arr[i].parent === parent) {
                out.push({ ...arr[i], spans: span, visible: true, opened: true })
                ++span
                getNestedChildren(arr, arr[i].id, span)
                --span
            }
        }
    }

    getNestedChildren(arrayWithUpElement)
    return out
}


export function getNested(array) {

    const out = []

    function getNestedChildren(arr, parent = 0, span = 0) {
        for (let i in arr) {
            if (arr[i].parent === parent) {
                out.push({ ...arr[i], spans: span, visible: true, opened: true })
                ++span
                getNestedChildren(arr, arr[i].id, span)
                --span
            }
        }        
    }

    getNestedChildren(array)

    return out
}

// const out = []

// export function getNestedChildren(arr, parent = 0, span = 0) {
//     for (let i in arr) {
//         if (arr[i].parent === parent) {
//             out.push({ ...arr[i], spans: span, visible: true, opened: true })
//             ++span
//             getNestedChildren(arr, arr[i].id, span)
//             --span
//         }
//     }
//     return out
// }


export const makeDepoNode = (array) => {
    const depoNode = { id: 999999999, title: '-DEPO-', type: 'depo', parent: 0 }
    return [...array, depoNode]
}

export const makeKeysForArray = array => {

    // console.log("array", array)


    const fakeArray = [{ id: 1, title: 'PAGES', parent: 0 }, { id: 2, title: 'COMPONENTS', parent: 0 }, { id: 3, title: 'DATA', parent: 0 }]

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
