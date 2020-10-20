import React from 'react'
import { useDrag } from 'react-dnd'
import './Item.css'

export const Item = ({ data, click, sum }) => {


    const { title, id, type } = data

    const [collectedProps, drag] = useDrag({
        item: { type, title, id }
    })

    return (
        <div
            className='item catalog_item'
            ref={drag}
            onClick={() => click(id)}
        >
            <span>{title}</span>
            <span>{sum}</span>
            
        </div>
    )
}