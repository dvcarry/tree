import React, { useContext } from 'react'
import { Item } from './Item'
import { useDrop } from 'react-dnd'
import { Element } from './Element'
import { ProjectContext } from './../context/projectContext'

export const Render = ({ selectedNode, renderElements }) => {
    console.log("Render -> selectedNode", selectedNode)

    const { project, addToProject } = useContext(ProjectContext)

    const [collectedProps, drop] = useDrop({
        accept: ['element', 'component'],
        drop: item => {
            // console.log("Description -> item", item)
            addToProject(item, selectedNode.id)
            // addCar(item.title)
        }
    })

    let itemsToRender = null
    if (renderElements && renderElements.length > 0) {
        itemsToRender = renderElements.map(item => {
            const dataOfElement = project.filter(el => el.parent === item.id)
            console.log("Render -> dataOfElement", dataOfElement)
            return <Element data={item} dataOfElement={dataOfElement}/>
        })
    }

    console.log('render of render')

    return (
        <div className="render field" ref={drop}>
            {itemsToRender}
        </div>
    )
}