import React from 'react'
import { useDrag } from 'react-dnd'

export const Car = ({title}) => {

    const [collectedProps, drag] = useDrag({
        item: { type: 'car', title }
      })

    return (
        <div className='test' ref={drag}>
            {title}
        </div>
    )
}