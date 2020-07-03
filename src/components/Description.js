import React from 'react'
import { Tag } from 'antd'

export const Description = ({ selectedNode }) => {

    // const { title, type } = selectedNode

    console.log(selectedNode)

    return (
        <div>
            <h2>{selectedNode && selectedNode.title}</h2>
            <Tag color="success">{selectedNode && selectedNode.type}</Tag>
            <p>{selectedNode && selectedNode.description}</p>

        </div>
    )
}