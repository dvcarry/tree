import React, { useState, useEffect, useContext } from 'react'
import { Tree } from 'antd';
import lodash from 'lodash'
import { makeNestedChildren, makeDepoNode } from '../helpers/functions';
import { fetchChangeParentOfNode } from '../helpers/API';
import { ProjectContext } from '../context/projectContext';



export const TreeComp = ({array, setProject, selectNode}) => {


    const [treeData, setTreeData] = useState()
    console.log("TreeComp -> treeData", treeData)
    const { project, catalog } = useContext(ProjectContext)
    console.log("TreeComp -> project", project, catalog)


    const testData = catalog.map(item => ({...item, parent: 0}))

    useEffect(() => {

        const newArray = lodash.cloneDeep(project)
        console.log("TreeComp -> newArray", newArray)
        const arrayWithChildren = makeNestedChildren(newArray)        
        console.log("TreeComp -> arrayWithChildren", arrayWithChildren)
        setTreeData(arrayWithChildren)
        // const newArray = lodash.cloneDeep(array)
        // const arrayWithDepo = makeDepoNode(newArray)
        // const arrayWithChildren = makeNestedChildren(arrayWithDepo)        
        // setTreeData(makeNestedChildren(arrayWithChildren))
        
    }, [project])

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
                treeData={testData}
                showLine
                draggable
                onSelect={onSelect}
                onDrop={onDrop}
                id='tree'
            />
        </>
    )
}