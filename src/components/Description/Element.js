import React, { useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ProjectContext } from '../../context/projectContext'
import { Item } from '../Item'
import { Prop } from './Prop'
import { SelectedNodeContext } from '../../context/selectedNodeContext'

export const Element = ({ data, onclick, dataOfElement }) => {

    const { title, id, type, id_element } = data


    const { addToProject, deleteFromProject } = useContext(ProjectContext)
    const { setSelectedNode } = useContext(SelectedNodeContext)


    // const [collectedProps, drag] = useDrag({
    //     item: { type, title, id }
    //     // item: { type: 'car', title, id }
    // })


    const [collectedProps, drop] = useDrop({
        accept: ['data', 'datas'],
        drop: item => {
        console.log("Element -> item", item)
            
            addToProject(item.id, data.id_element)
        }
    })

    const dataOfElementRender = dataOfElement.map(item => <Prop data={item} />)

    return (
        <div
            className={`element ${type === 'component' ? 'blue' : 'grey'}`}
            ref={drop}
        >
            <div className="element_title">
                <h3 onClick={() => setSelectedNode(id_element)}>{title}</h3>
                <span className='remove' onDoubleClick={() => deleteFromProject(id)}>Удалить</span>
            </div>

            <div className="element_data">
                {dataOfElementRender}
            </div>

        </div>
    )
}