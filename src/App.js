import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { TreeComp } from './components/Tree';
import { Catalog } from './components/Catalog';
import { Description } from './components/Description';
import { fetchGetCatalog, fetchAddNewItemToCatalog, fetchAddNewItemToProject, fetchGetProject, fetchDeleteFromCatalog, fetchDeleteFromProject } from './helpers/API';
import { Test } from './components/Test';


// const array = [
//   { id: 1, title: 'hello1', type: 'page', parent: 0 },
//   { id: 2, title: 'hello2', type: 'page', parent: 0 },
//   { id: 3, title: 'hello3', type: 'component', parent: 1 },
//   { id: 4, title: 'hello4', type: 'component', parent: 1 },
//   { id: 5, title: 'hello5', type: 'component', parent: 1 },
//   { id: 6, title: 'hello6', type: 'component', parent: 2 },
//   { id: 7, title: 'hello7', type: 'component', parent: 2 },
//   { id: 8, title: 'hello8', type: 'component', parent: 2 }
// ]


function App() {

  const [selectedNode, setSelectedNode] = useState(null)
  console.log("App -> selectedNode", selectedNode)
  const [catalog, setCatalog] = useState([])
  const [project, setProject] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      const newProject = await fetchGetProject()
      setProject(newProject)
    }
    fetchData()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      const newCatalog = await fetchGetCatalog()
      setCatalog(newCatalog)
    }
    fetchData()
  }, [])



  const setSelect = id => {
    const selectObj = catalog.find(item => item.id === id)
    setSelectedNode(selectObj)
  }


  const addNewItem = async newItem => {

    let itemWithUpLetter = { ...newItem }
    if (newItem.type === 'component') {
      const newTitle = newItem.title[0].toUpperCase() + newItem.title.slice(1)
      itemWithUpLetter.title = newTitle
    }

    const newItemFromDb = await fetchAddNewItemToCatalog(itemWithUpLetter)
    setCatalog([...catalog, newItemFromDb])
  }

  const addToProject = async () => {
    const parentId = selectedNode.type === 'page' ? 0 : 999999999
    const newProjectItem = await fetchAddNewItemToProject({ id_element: selectedNode.id, parent: parentId })
    const title = catalog.find(item => item.id === selectedNode.id).title
    setProject([...project, { ...newProjectItem, title: title }])
  }

  const deleteFromCatalog = async () => {
    await fetchDeleteFromCatalog({ id: selectedNode.id })
    setCatalog(catalog.filter(item => item.id !== selectedNode.id))
    await deleteFromProject()
  }

  const deleteFromProject = async () => {
    if (!project.find(item => item.id_element === selectedNode.id)) return
    const idOfNode = project.find(item => item.id_element === selectedNode.id).id
    await fetchDeleteFromProject({ id: idOfNode })
    setProject(project.filter(item => item.id !== idOfNode))
  }


  return (
    <div className="App">
      <TreeComp
        array={project}
        setProject={array => setProject(array)}
        selectNode={id => setSelect(id)}
      />
      {/* <Catalog
        catalog={catalog}
        selectNode={id => setSelect(id)}
        addNewItem={newItem => addNewItem(newItem)}
        addToProject={addToProject}
        deleteFromCatalog={deleteFromCatalog}
      />
      <Description selectedNode={selectedNode} /> */}
      <Test />
    </div>
  );
}

export default App;
