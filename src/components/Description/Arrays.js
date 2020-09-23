import React, { useContext } from 'react'
// import { Item } from '../Item'
import { useDrop } from 'react-dnd'
import { Element } from './Element'
import { ProjectContext } from '../../context/projectContext'
import { DataProp } from './DataProp'

export const Arrays = ({ selectedNode, renderElements }) => {

    const { project, addToProject } = useContext(ProjectContext)

    const [collectedProps, drop] = useDrop({
        accept: ['data'],
        drop: item => {
            addToProject(item, selectedNode.id)
            // addCar(item.title)
        }
    })

    let itemsToRender = null
    if (renderElements && renderElements.length > 0) {
        itemsToRender = renderElements.map(item => <DataProp data={item}/>)
    }


    return (
        <div className="field" ref={drop}>
            {itemsToRender}
        </div>
    )
}