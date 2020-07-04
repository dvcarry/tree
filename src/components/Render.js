import React from 'react'
import { Item } from './Item'
import { useDrop } from 'react-dnd'

export const Render = ({renderElements}) => {

    const [collectedProps, drop] = useDrop({
        accept: ['element', 'component'],
        drop: item => {
        console.log("Description -> item", item)
            
            // addCar(item.title)
        }
      })

    let itemsToRender = null
    if (renderElements && renderElements.length > 0) {
        itemsToRender = renderElements.map(item => <Item data={item}/>)
    }
    

    return (        
        <div className="render field" ref={drop}>            
            {itemsToRender}
        </div>
    )
}