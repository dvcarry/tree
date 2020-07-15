import React, { useContext } from 'react'
import { Item } from '../Item'
import { useDrop } from 'react-dnd'
import { Element } from './Element'
import { ProjectContext } from '../../context/projectContext'
import { SelectedNodeContext } from '../../context/selectedNodeContext'

export const Render = ({ renderElements }) => {
console.log("Render -> renderElements", renderElements)

    const { project, addToProject } = useContext(ProjectContext)
    const { selectedNode } = useContext(SelectedNodeContext)

    const [collectedProps, drop] = useDrop({
        accept: ['element', 'component'],
        drop: item => {
            console.log("Render -> item", item)

            addToProject(item.id, selectedNode)
            // addCar(item.title)
        }
    })

    let itemsToRender = null
    if (renderElements && renderElements.length > 0) {
        itemsToRender = renderElements.map(item => {
            const dataOfElement = project.filter(el => el.parent === item.id_element && (el.type === 'data' || el.type === 'datas'))
            return <Element data={item} dataOfElement={dataOfElement} />
        })
    }


    return (
        <>
            <h3>Render</h3>
            <div className="render field" ref={drop}>
                {itemsToRender}
            </div>
        </>
    )
}