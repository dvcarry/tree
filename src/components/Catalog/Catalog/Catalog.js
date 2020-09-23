import React, { useState, useEffect, useContext } from 'react'
import { Tree } from 'antd';
import { makeKeysForArray } from '../../../helpers/functions';
import { AddItemForm } from '../AddItem/AddItemForm'
import { fetchAddNewItemToProject, fetchGetCatalog, fetchGetProject } from '../../../helpers/API';
import { Tabs } from 'antd'
import { items } from '../../../helpers/constants';
import { Item } from '../../Catalog/Item/Item';
import { ProjectContext } from '../../../context/projectContext';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogThunk } from '../../../redux/reducers/CatalogReducer';
import { useParams } from 'react-router-dom';
const { TabPane } = Tabs;

// export const Catalog = ({ catalog, selectNode, addNewItem, addToProject, deleteFromCatalog }) => {
export const Catalog = ({ addNewItem, addToProject, deleteFromCatalog }) => {

    const [modal, setModal] = useState(false)

    const { project_id } = useParams()

    // const [treeData, setTreeData] = useState([])

    // const { catalog, setCatalog, addToCatalog, setProject } = useContext(ProjectContext)

    const dispatch = useDispatch()

    const { catalog } = useSelector(state => state.catalogReducer)

    // useEffect(() => {
    //     // const newCatalog = makeKeysForArray(catalog)
    //     // setTreeData(newCatalog)
    //     setTreeData(catalog)
    // }, [catalog])

    useEffect(() => {
        dispatch(getCatalogThunk(project_id))
    }, [])


    // useEffect(() => {
    //     const fetchData = async () => {
    //       const newCatalog = await fetchGetCatalog()
    //       setCatalog(newCatalog)
    //       const newProject = await fetchGetProject()
    //       setProject(newProject)
    //     }
    //     fetchData()
    //   }, [])

    const onCreate = values => {
        setModal(false);
        // addNewItem(values)
        // addToCatalog(values)
    };

    // let tabs
    // if (catalog.length > -1) {
    //     console.log('ddd')
    let tabs = items.map(item => {

        const itemsElements = catalog
            .filter(el => el.type === item)
            .map(filtredItem => {
                return (
                    <Item
                        data={filtredItem}
                        key={filtredItem.id}
                    />
                )
            })

        return (
            <TabPane tab={item} key={item}>
                {itemsElements}
            </TabPane>
        )
    })
    // }

    console.log("Catalog -> items", tabs)

    return (
        <div>
            <button onClick={() => setModal(true)}>Add</button>

            <Tabs defaultActiveKey="2" tabPosition='left'>
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