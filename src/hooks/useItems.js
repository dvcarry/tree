import React, { useState } from 'react'

const useProject = () => {

    const [project, setProject] = useState()

    const addToProject = async () => {
        const parentId = selectedNode.type === 'page' ? 0 : 999999999
        const newProjectItem = await fetchAddNewItemToProject({ id_element: selectedNode.id, parent: parentId })
        const title = catalog.find(item => item.id === selectedNode.id).title
        setProject([...project, { ...newProjectItem, title: title }])
      }

    
}