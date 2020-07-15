import React from 'react'
import { Field } from './Field'

export const Props = ({nodeInfo, fieldElements}) => {
    return (
        <>
        <h3>Пропсы</h3>
            <Field selectedNode={nodeInfo} acceptTypesArray={['props']} fieldElements={fieldElements}/>
        </>
    )
}