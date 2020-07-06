import React, { useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ProjectContext } from '../context/projectContext'
import { Item } from './Item'
import { Prop } from './Prop'

export const Element = ({ data, onclick, dataOfElement }) => {
    // console.log("Item -> data", data)

    const { title, id, type } = data
    console.log("Item -> type", type)

    const { addToProject } = useContext(ProjectContext) 

    // const [collectedProps, drag] = useDrag({
    //     item: { type, title, id }
    //     // item: { type: 'car', title, id }
    // })


    const [collectedProps, drop] = useDrop({
        accept: ['data'],
        drop: item => {
            console.log("Description -> item", item, data.id)
            addToProject(item, data.id)
            // addCar(item.title)
        }
    })

    const dataOfElementRender = dataOfElement.map(item => <Prop data={item}/>)

    return (
        <div
            className='element'
            ref={drop}
            // onClick={() => onclick(id)}
        >
            <h3>{title}</h3>
            <div className="element_data">
                {dataOfElementRender}
            </div>
        </div>
    )
}