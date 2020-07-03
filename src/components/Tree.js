import React, { useState, useEffect } from 'react'
import { Tree } from 'antd';
import lodash from 'lodash'
import { makeNestedChildren, makeDepoNode } from '../helpers/functions';
import { fetchChangeParentOfNode } from '../helpers/API';



export const TreeComp = ({array, setProject, selectNode}) => {


    const [treeData, setTreeData] = useState()

    useEffect(() => {

        const newArray = lodash.cloneDeep(array)
        const arrayWithDepo = makeDepoNode(newArray)
        const arrayWithChildren = makeNestedChildren(arrayWithDepo)        
        setTreeData(makeNestedChildren(arrayWithChildren))
        
    }, [array])

    const onSelect = (selectedKeys, info) => {        
        console.log("onSelect -> info", info)        
        selectNode(info.node.id)
    };


    const onDrop = async info => {

        console.log(info)

        // if (info.dragNode.parent === 0) return
        if (info.dragNode.type === 'page') return
    
        await fetchChangeParentOfNode(info.node.id, info.dragNode.id)

        const newTreeData = array.map(item => {

            if (info.dragNode.id === item.id) {
                return {
                    ...item,
                    parent: info.node.id
                }
            } else {
                return item
            }
        })

        setProject(newTreeData)

    }

    return (
        <>
            <Tree
                treeData={treeData}
                showLine
                draggable
                onSelect={onSelect}
                onDrop={onDrop}
                id='tree'
            />
        </>
    )
}