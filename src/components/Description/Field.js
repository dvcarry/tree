import React, { useContext } from 'react'
import { ProjectContext } from '../../context/projectContext'
import { useDrop } from 'react-dnd'
import { DataProp } from './DataProp'

export const Field = ({ selectedNode, acceptTypesArray, fieldElements, typeOfItem }) => {

    const { project, addToProject } = useContext(ProjectContext)

    const [collectedProps, drop] = useDrop({
        accept: acceptTypesArray,
        drop: item => {  
            if (fieldElements.some(el => el.id_element === item.id)) return
            
            addToProject(item.id, selectedNode.id)
        }
    })

    let itemsToRender = null
    if (fieldElements && fieldElements.length > 0) {
        itemsToRender = fieldElements.map(item => <DataProp data={item} />)
    }

    return (
        <div className="field" ref={drop}>
            {itemsToRender}
        </div>
    )
}