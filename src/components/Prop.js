import React from 'react'
import { useDrag } from 'react-dnd'

export const Prop = ({ data, onclick }) => {

    const { title, id, type } = data

    // const [collectedProps, drag] = useDrag({
    //     item: { type, title, id }
    //     // item: { type: 'car', title, id }
    // })

    return (
        <span
            className='prop'
            // ref={drag}
            // onClick={() => onclick(id)}
            
        >
            {title}
        </span>
    )
}