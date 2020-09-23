import React, { useState, useEffect, useContext } from 'react';
import { TreeItem } from './TreeItem';
import { findNested, getNestedChildren } from '../../helpers/functions';
import { ProjectContext } from '../../context/projectContext';
import { useSelector } from 'react-redux';

const data = [    
    {
        id: 1,
        type: 'component',
        title: 'Index',
        parent: 0,
    }
]

export const TreeComp = () => {

    const tree = useSelector(state => state.catalogReducer.tree)
    console.log("TreeComp -> tree", tree)

    // const { project, addToProject, catalog, deleteFromProject, changeParentInProject } = useContext(ProjectContext)
    // const [tree, setTree] = useState(data)    

    // const out = []

    // function getNestedChildren(arr, parent = 0, span = 0) {
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

    // useEffect(() => {
    //     const newData = getNestedChildren([...data, ...project])
    //     setTree(newData)
    // }, [data, project])
    
    // useEffect(() => {
        
    // })

    // const changeParent = (id, parentId) => {
    //     const newTree = tree.map(item => item.id === id ? { ...item, parent: parentId } : { ...item })
    //     const newNewTree = getNestedChildren(newTree)
    //     setTree(newNewTree)
    // }

    // const addNew = async (elementId, parentId) => {
    //     const newItem = await addToProject(elementId, parentId)
    //     setTree([...tree, newItem])
        
    // }

    // const collapseHandler = id => {
    //     const arrayOfNestedItems = findNested(id, tree)

    //     const arrayChangedOpened = tree.map(item => item.id === id ? { ...item, opened: !item.opened } : { ...item })
    //     const newData = arrayChangedOpened.map(item => {
    //         return arrayOfNestedItems.includes(item.id)
    //             ? { ...item, visible: !item.visible }
    //             : { ...item }
    //     })
    //     setTree(newData)
    // }


    return (
        <div>
            {
                tree && tree.map(item => {
                    return (
                        <TreeItem
                            {...item}
                            // click={collapseHandler}
                            // changeParent={changeParent}
                            // addNew={addNew}
                            // deleteFromProject={deleteFromProject}
                            // changeParentInProject={changeParentInProject}
                        />
                    )

                })
            }
        </div>
    )
}