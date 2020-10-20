import React, { useState, useEffect } from 'react'
import './Catalog.css'
import { AddItemForm } from '../AddItem/AddItemForm'
import { items } from '../../../helpers/constants';
import { Item } from '../../Catalog/Item/Item';
import { useDispatch, useSelector } from 'react-redux';
import { addCatalogThunk, getCatalogThunk, selectItemThunk } from '../../../redux/reducers/CatalogReducer';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner';


export const Catalog = () => {

    const [modal, setModal] = useState(false)
    const [type, setType] = useState('component')

    const { project_id } = useParams()

    const dispatch = useDispatch()

    const { catalog, loading, tree } = useSelector(state => state.catalogReducer)


    useEffect(() => {
        dispatch(getCatalogThunk(project_id))
    }, [])

    const onCreate = values => {
        setModal(false);
        dispatch(addCatalogThunk(project_id, { ...values, type }))
    };

    const clickHandler = id => {
        dispatch(selectItemThunk({type: 'catalog', id: id}))
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='catalog'>
            {/* <div className='catalog_section'> */}
                <div className='catalog_types'>
                    {
                        items.map(item => {

                            const sumOfItems = catalog.filter(catalogItem => catalogItem.type === item).length

                            return (
                                <div
                                    className={item === type ? 'catalog_component activecatalog' : 'catalog_component'}
                                    onClick={() => setType(item)}
                                    key={item}
                                >                                    
                                    <span>{item}</span>
                                    <span className='catalog_component_sum'>{sumOfItems}</span>

                                </div>
                            )
                        })
                    }
                </div>
                <div className='catalog_items'>
                    {/* <div className='catalog_panel'>
                        <button
                            onClick={() => setModal(true)}
                        >
                            Add
                        </button>
                    </div> */}
                    {
                        catalog
                            .filter(item => item.type === type)
                            .sort((a, b) => b.title.toLowerCase() < a.title.toLowerCase() ? 1 : -1)
                            .map(item => {

                                const sumOfItems = tree.filter(treeItem => treeItem.id_element === item.id).length

                                return (
                                    <Item
                                        data={item}
                                        key={item.id}
                                        sum={sumOfItems}
                                        click={clickHandler}
                                    />
                                )
                            })
                    }
                </div>
            {/* </div> */}

            <AddItemForm
                visible={modal}
                onCreate={onCreate}
                type={type}
                onCancel={() => {
                    setModal(false);
                }} />

        </div>

    )
}