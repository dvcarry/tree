import React, { useState, useEffect, useContext } from 'react'
import { Tree } from 'antd';
import { makeKeysForArray } from './../helpers/functions';
import { AddItemForm } from './AddItemForm'
import { fetchAddNewItemToProject, fetchGetCatalog, fetchGetProject } from '../helpers/API';
import { Tabs } from 'antd'
import { items } from '../helpers/constants';
import { Item } from './Item';
import { ProjectContext } from '../context/projectContext';
const { TabPane } = Tabs;

// export const Catalog = ({ catalog, selectNode, addNewItem, addToProject, deleteFromCatalog }) => {
export const Catalog = ({ selectNode, addNewItem, addToProject, deleteFromCatalog }) => {

    const [modal, setModal] = useState(false)
    
    // const [treeData, setTreeData] = useState([])

    const { catalog, setCatalog, addToCatalog, setProject } = useContext(ProjectContext)

    // useEffect(() => {
    //     // const newCatalog = makeKeysForArray(catalog)
    //     // setTreeData(newCatalog)
    //     setTreeData(catalog)
    // }, [catalog])


    useEffect(() => {
        const fetchData = async () => {
          const newCatalog = await fetchGetCatalog()
          setCatalog(newCatalog)
          const newProject = await fetchGetProject()
          setProject(newProject)
        }
        fetchData()
      }, [])

    const onCreate = values => {
    console.log("Catalog -> values", values)
        setModal(false);
        // addNewItem(values)
        addToCatalog(values)
    };

    let tabs
    if (catalog.length > 0) {
        tabs = items.map(item => {

            const itemsElements = catalog
                .filter(el => el.type === item)
                .map(filtredItem => <Item data={filtredItem} key={filtredItem.id} onclick={(filtredItem) => selectNode(filtredItem)}/>)

            return (
                <TabPane tab={item} key={item}>
                    {itemsElements}
                </TabPane>
            )
        })

    }




    return (
        <div>
            <button onClick={() => setModal(true)}>Add</button>

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