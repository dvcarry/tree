import React from 'react'
import { DataProp } from './DataProp'

export const Parents = ({parents}) => {

    const parentsToRender = parents && parents.map(item => <DataProp key={item.id} data={item}/>)

    return (
        <div>
            <h3>Parents</h3>
            {parentsToRender}
        </div>
    )
}