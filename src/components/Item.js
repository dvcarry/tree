import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { SelectedNodeContext } from '../context/selectedNodeContext'

export const Item = ({ data }) => {


    const { title, id, type } = data

    const { setSelectedNode } = useContext(SelectedNodeContext)

    const [collectedProps, drag] = useDrag({
        item: { type, title, id }
    })

    return (
        <span
            className='item'
            ref={drag}
            onClick={() => setSelectedNode(id)}
        >

            {/* onClick={() => onclick(id)}> */}
            {title}
        </span>
    )
}