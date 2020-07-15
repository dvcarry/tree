import React from 'react'
import { Parents } from './Parents'
import { Render } from './Render'
import { Props } from './Props'

export const Component = ({nodeInfo}) => {

    return (
        <>
            <Parents parents={nodeInfo.parents}/>
            <Props nodeInfo={nodeInfo} fieldElements={nodeInfo.props} />
            <Render renderElements={nodeInfo.renderElements}/>
        </>
    )
}