import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ProjectContext } from '../../context/projectContext'

export const DataProp = ({ data }) => {

    const { title, id, type } = data
    const { deleteFromProject } = useContext(ProjectContext)

    // const [collectedProps, drag] = useDrag({
    //     item: { type, title, id }
    //     // item: { type: 'car', title, id }
    // })

    const [collectedProps, drag] = useDrag({
        item: { type: 'dataprop', title, id }
        // item: { type: 'car', title, id }
      })

    return (
        <span
            className='prop'
        ref={drag}
        onDoubleClick={() => deleteFromProject(id)}
        // onClick={() => onclick(id)}

        >
            {title}
        </span>
    )
}