import React, { useState, useEffect } from 'react'
import { Tree } from 'antd';
import { makeKeysForArray } from './../helpers/functions';
import { AddItemForm } from './AddItemForm'
import { fetchAddNewItemToProject } from '../helpers/API';

export const Catalog = ({ catalog, selectNode, addNewItem, addToProject, deleteFromCatalog }) => {

    const [modal, setModal] = useState(false)
    const [treeData, setTreeData] = useState([])

    // const newCatalog = makeKeysForArray(catalog)
    // setTreeData(newCatalog)
    
    useEffect(() => {
        const newCatalog = makeKeysForArray(catalog)
        setTreeData(newCatalog)
    }, [catalog])

    // const treeData = makeKeysForArray(catalog)

    const onSelect = (selectedKeys, info) => {
        selectNode(info.node.id)
    };

    const onCreate = values => {
        setModal(false);
        addNewItem(values)
    };


    return (
        <div>
            <Tree
                treeData={treeData}
                showLine
                draggable
                onSelect={onSelect}
                selectedKeys={['19']}
                defaultSelectedKeys={['19']}
            />

            <button onClick={() => setModal(true)}>Add</button>
            <button onClick={addToProject}>To project</button>
            <button onClick={deleteFromCatalog}>Delete</button>

            <AddItemForm
                visible={modal}
                onCreate={onCreate}
                onCancel={() => {
                    setModal(false);
                }} />
        </div>
    )
}