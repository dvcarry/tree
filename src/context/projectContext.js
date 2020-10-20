// import React, { createContext, useState } from 'react'
// import { fetchAddNewItemToProject, fetchAddNewItemToCatalog, fetchDeleteFromProject, fetchDeleteFromCatalog, fetchChangeParentOfNode } from '../helpers/API'
// import { order } from '../helpers/constants'

// export const ProjectContext = createContext()

// export const Project = ({ children }) => {

//   const [catalog, setCatalog] = useState([])
//   const [project, setProject] = useState([])

//   const orderForProject = array => {
//     const orderedProject = array.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
//     setProject(orderedProject)
//   }

  // const addToProject = async (selectedNode, parentId) => {
  //   const parentId = selectedNode.type === 'page' ? 0 : 999999999

  //   const newProjectItem = await fetchAddNewItemToProject({ id_element: selectedNode, parent: parentId })
  //   console.log("addToProject -> newProjectItem", newProjectItem)
  //   const node = catalog.find(item => item.id === selectedNode)
  //   const newProject = [...project, { ...newProjectItem, title: node.title, type: node.type }]
  //   orderForProject(newProject)
  //   setProject([...project, { ...newProjectItem, title: node.title, type: node.type }])
  // }

//   const changeParentInProject = async (id, parentId) => {
//     await fetchChangeParentOfNode(id, parentId)
//     const changedProject = project.map(item => item.id === id ? { ...item, parent: parentId } : { ...item })
//     orderForProject(changedProject)
//     // setProject(changedProject)
//   }

//   const addToCatalog = async newItem => {

//     let itemWithUpLetter = { ...newItem }
//     if (newItem.type === 'component') {
//       const newTitle = newItem.title[0].toUpperCase() + newItem.title.slice(1)
//       itemWithUpLetter.title = newTitle
//     }

//     const newItemFromDb = await fetchAddNewItemToCatalog(itemWithUpLetter)
//     setCatalog([...catalog, newItemFromDb])
//   }

//   const deleteFromProject = async (id) => {
//     // if (!project.find(item => item.id_element === selectedNode.id)) return
//     // const idOfNode = project.find(item => item.id_element === selectedNode.id).id
//     if (project.some(item => item.parent === id)) return
//     await fetchDeleteFromProject({ id })
//     setProject(project.filter(item => item.id !== id))
//   }

//   const deleteFromCatalog = async (id) => {
//     await fetchDeleteFromCatalog({ id })
//     setCatalog(catalog.filter(item => item.id !== id))
//     await deleteFromProject(id)
//   }

//   return (
//     <ProjectContext.Provider value={{
//       catalog, project,
//       addToProject, setCatalog, addToCatalog,
//       setProject, deleteFromProject, deleteFromCatalog,
//       changeParentInProject
//     }}>
//       {children}
//     </ProjectContext.Provider>
//   )

// }