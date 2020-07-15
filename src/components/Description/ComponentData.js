import React from 'react'
import { DataProp } from './DataProp'

export const ComponentData = ({allProps}) => {
    
    const dataRender = allProps && allProps.map(item => <DataProp data={item}/>)

    console.log("ComponentData -> dataRender", dataRender)
    return (
        <div 
        // className='field'
        >

            {dataRender}
        </div>
    )
}