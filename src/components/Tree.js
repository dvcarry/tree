import React, { useState, useEffect } from 'react'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FastClone } from 'fastest-clone';
import lodash from 'lodash'


const array = [
    { id: 1, title: 'hello1', type: 'page', parent: 0 },
    { id: 2, title: 'hello2', type: 'page', parent: 0 },
    { id: 3, title: 'hello3', type: 'component', parent: 1 },
    { id: 4, title: 'hello4', type: 'component', parent: 1 },
    { id: 5, title: 'hello5', type: 'component', parent: 1 },
    { id: 6, title: 'hello6', type: 'component', parent: 2 },
    { id: 7, title: 'hello7', type: 'component', parent: 2 },
    { id: 8, title: 'hello8', type: 'component', parent: 2 }
]


function getNestedChildren(arr, parent = 0) {
    
    let out = []
    for (let i in arr) {
        if (arr[i].parent === parent) {
            let children = getNestedChildren(arr, arr[i].id)

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
            // title: `<${item.title}/>`
            title: newTitle
        }
    })
    return newOut
}


export const TreeComp = () => {

    console.log('array', array)

    const [treeDataRaw, setTreeDataRaw] = useState(lodash.cloneDeep(array))
    const [treeData, setTreeData] = useState(treeDataRaw)

    useEffect(() => {
        const newArray = lodash.cloneDeep(treeDataRaw)
        setTreeData(getNestedChildren(newArray))
    }, [treeDataRaw])


    const onDrop = info => {

        if (info.dragNode.parent === 0) return

        const newTreeData = treeDataRaw.map(item => {

            if (info.dragNode.id === item.id) {
                return {
                    ...item,
                    parent: info.node.id
                }
            } else {
                return item
            }
        })

        setTreeDataRaw(newTreeData)
    }

    return (
        <>
            <Tree
                treeData={treeData}
                showLine
                draggable
                onDrop={onDrop}
            />
        </>
    )
}