import React, { useContext } from 'react'
import { Tag } from 'antd'
import { useDrop } from 'react-dnd'
import { Render } from './Render'
import { ProjectContext } from '../context/projectContext'

export const Description = ({ selectedNode, addToProject, allElements }) => {

    // const { title, type } = selectedNode

    // console.log(allElements)

    const { project } = useContext(ProjectContext)

    const [collectedProps, drop] = useDrop({
        accept: ['element', 'component'],
        drop: item => {
            
            // addCar(item.title)
        }
      })
    
    // let renderElements = null
    // if (allElements && allElements.length > 0) {
    //     renderElements = allElements.filter(item => item.type === 'element' || item.type === 'component')
    // }
    // if (allElements && allElements.length > 0) {
    //     renderElements = project.filter(item => item.type === 'element' || item.type === 'component')
    // }

    const renderElements = selectedNode && project.filter(item => item.parent === selectedNode.id)

    return (
        <div>
            <h2>{selectedNode && selectedNode.title}</h2>
            <Tag color="success">{selectedNode && selectedNode.type}</Tag>
            <p>{selectedNode && selectedNode.description}</p>
            <h3>Render</h3>
            {/* <div className="render field" ref={drop}></div> */}
            <Render selectedNode={selectedNode} renderElements={renderElements}/>

        </div>
    )
}