import React, { createContext, useState } from 'react'

export const SelectedNodeContext = createContext()

export const SelectedNode = ({children}) => {

    const [selectedNode, setSelected] = useState(null)

    const setSelectedNode = node => {
        setSelected(node)
    }

    return (
        <SelectedNodeContext.Provider value={{selectedNode, setSelectedNode}}>
            {children}
        </SelectedNodeContext.Provider>
    )
}