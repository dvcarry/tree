import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { ProjectContext } from '../../context/projectContext'

export const Prop = ({ data, onclick }) => {

    const { title, id, type } = data
    const { deleteFromProject } = useContext(ProjectContext)

    // const [collectedProps, drag] = useDrag({
    //     item: { type, title, id }
    //     // item: { type: 'car', title, id }
    // })

    return (
        <span
            className={`prop${type === 'datas' ? ' array' : ''}`}
            onDoubleClick={() => deleteFromProject(id)}
        // ref={drag}
        // onClick={() => onclick(id)}

        >
            {title}
        </span>
    )
}