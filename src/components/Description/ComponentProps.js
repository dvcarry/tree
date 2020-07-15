import React from 'react'
import { useDrop } from 'react-dnd'
import { DataProp } from './DataProp'

export const ComponentProps = ({typeOfSource, addToProps, data}) => {
console.log("ComponentProps -> data", data)
    
    const [collectedProps, drop] = useDrop({
        accept: ['dataprop'],
        drop: item => {
            // console.log("Description -> item", item)
            addToProps(item, typeOfSource)
            // addToProject(item, selectedNode.id)
            // addCar(item.title)
        }
    })

    const propsToRender = data.map(item => <DataProp data={item} />)
    
    return (
        <div className='field' ref={drop}>
            <h3>{typeOfSource}</h3>
            {propsToRender}
        </div>
    )
}