import React from 'react'
import { useDrag } from 'react-dnd'

export const Item = ({data, onclick}) => {

    const { title, id, type } = data

    const [collectedProps, drag] = useDrag({
        item: { type, title, id }
        // item: { type: 'car', title, id }
      })

    return (
        <div className='item' ref={drag} onClick={() => onclick(id)}>
            {title}
        </div>
    )
}