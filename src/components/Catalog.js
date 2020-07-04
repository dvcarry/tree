import React, { useState, useEffect } from 'react'
import { Tree } from 'antd';
import { makeKeysForArray } from './../helpers/functions';
import { AddItemForm } from './AddItemForm'
import { fetchAddNewItemToProject } from '../helpers/API';
import { Tabs } from 'antd'
import { items } from '../helpers/constants';
import { Item } from './Item';
const { TabPane } = Tabs;

export const Catalog = ({ catalog, selectNode, addNewItem, addToProject, deleteFromCatalog }) => {

    const [modal, setModal] = useState(false)
    
    // const [treeData, setTreeData] = useState([])
    const [treeData, setTreeData] = useState([])
    console.log("Catalog -> treeData", treeData)


    // const newCatalog = makeKeysForArray(catalog)
    // setTreeData(newCatalog)

    useEffect(() => {
        // const newCatalog = makeKeysForArray(catalog)
        // setTreeData(newCatalog)
        setTreeData(catalog)
    }, [catalog])

    // const treeData = makeKeysForArray(catalog)

    // const onSelect = (selectedKeys, info) => {
    //     selectNode(info.node.id)
    // };

    const onCreate = values => {
        setModal(false);
        addNewItem(values)
    };
    console.log("Catalog -> treeData", treeData)

    let tabs
    if (treeData.length > 0) {
        tabs = items.map(item => {

            const itemsElements = treeData
                .filter(el => el.type === item)
                .map(filtredItem => <Item data={filtredItem} key={filtredItem.id} onclick={(filtredItem) => selectNode(filtredItem)}/>)
                // .map(filtredItem => <p>ddd</p>)

            console.log("Catalog -> itemsElements", itemsElements)
            return (
                <TabPane tab={item} key={item}>
                    {itemsElements}
                </TabPane>
            )
        })

    }




    return (
        <div>
            {/* <Tree
                treeData={treeData}
                showLine
                draggable
                onSelect={onSelect}
                selectedKeys={['19']}
                defaultSelectedKeys={['19']}
            /> */}

            <button onClick={() => setModal(true)}>Add</button>
            {/* <button onClick={addToProject}>To project</button>
            <button onClick={deleteFromCatalog}>Delete</button> */}
            <Tabs defaultActiveKey="1">
                {tabs}
            </Tabs>

            <AddItemForm
                visible={modal}
                onCreate={onCreate}
                onCancel={() => {
                    setModal(false);
                }} />
        </div>
    )
}