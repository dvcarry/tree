import React, { createContext, useState } from 'react'
import { fetchAddNewItemToProject, fetchAddNewItemToCatalog } from '../helpers/API'

export const ProjectContext = createContext()

export const Project = ({ children }) => {

  const [catalog, setCatalog] = useState([])
  const [project, setProject] = useState([])

  const addToProject = async (selectedNode, parentId) => {
    // const parentId = selectedNode.type === 'page' ? 0 : 999999999
    const newProjectItem = await fetchAddNewItemToProject({ id_element: selectedNode.id, parent: parentId })
    const title = catalog.find(item => item.id === selectedNode.id).title
    setProject([...project, { ...newProjectItem, title: title }])
  }

  const addToCatalog = async newItem => {

    let itemWithUpLetter = { ...newItem }
    if (newItem.type === 'component') {
      const newTitle = newItem.title[0].toUpperCase() + newItem.title.slice(1)
      itemWithUpLetter.title = newTitle
    }

    const newItemFromDb = await fetchAddNewItemToCatalog(itemWithUpLetter)
    console.log("Project -> newItemFromDb", newItemFromDb)
    setCatalog([...catalog, newItemFromDb])
  }

  const deleteFromProject = async () => {
    if (!project.find(item => item.id_element === selectedNode.id)) return
    const idOfNode = project.find(item => item.id_element === selectedNode.id).id
    await fetchDeleteFromProject({ id: idOfNode })
    setProject(project.filter(item => item.id !== idOfNode))
  }

  return (
    <ProjectContext.Provider value={{ catalog, project, addToProject, setCatalog, addToCatalog, setProject }}>
      {children}
    </ProjectContext.Provider>
  )

}