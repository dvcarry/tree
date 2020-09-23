import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Project } from './context/projectContext';
import { SelectedNode } from './context/selectedNodeContext';
import { Main } from './components/Main';
import { SelectProject } from './components/SelectProject/Projects/SelectProject';
import { Route, Switch } from 'react-router-dom';
import { Catalog } from './components/Catalog/Catalog/Catalog';




function App() {

  // const [selectedNode, setSelectedNode] = useState(null)
  // const [itemsSelectedNode, setItemsSelectedNode] = useState(null)
  // // console.log("App -> selectedNode", selectedNode)
  // const [catalog, setCatalog] = useState([])
  // const [project, setProject] = useState([])


  // // const { project, catalog, setProject, setCatalog } = useContext(ProjectContext)



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const newProject = await fetchGetProject()
  //     setProject(newProject)
  //   }
  //   fetchData()
  // }, [])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const newCatalog = await fetchGetCatalog()
  //     setCatalog(newCatalog)
  //   }
  //   fetchData()
  // }, [])



  // const setSelect = id => {
  //   const selectObj = catalog.find(item => item.id === id)
  //   // setSelectedNode(id)
  //   setSelectedNode(selectObj)
  //   const selectedElements = project.filter(item => item.parent === id)
  //   setItemsSelectedNode(selectedElements)
  // }


  // const addNewItem = async newItem => {

  //   let itemWithUpLetter = { ...newItem }
  //   if (newItem.type === 'component') {
  //     const newTitle = newItem.title[0].toUpperCase() + newItem.title.slice(1)
  //     itemWithUpLetter.title = newTitle
  //   }

  //   const newItemFromDb = await fetchAddNewItemToCatalog(itemWithUpLetter)
  //   setCatalog([...catalog, newItemFromDb])
  // }

  // const addToProject = async () => {
  //   const parentId = selectedNode.type === 'page' ? 0 : 999999999
  //   const newProjectItem = await fetchAddNewItemToProject({ id_element: selectedNode.id, parent: parentId })
  //   const title = catalog.find(item => item.id === selectedNode.id).title
  //   setProject([...project, { ...newProjectItem, title: title }])
  // }

  // const deleteFromCatalog = async () => {
  //   await fetchDeleteFromCatalog({ id: selectedNode.id })
  //   setCatalog(catalog.filter(item => item.id !== selectedNode.id))
  //   await deleteFromProject()
  // }

  // const deleteFromProject = async () => {
  //   if (!project.find(item => item.id_element === selectedNode.id)) return
  //   const idOfNode = project.find(item => item.id_element === selectedNode.id).id
  //   await fetchDeleteFromProject({ id: idOfNode })
  //   setProject(project.filter(item => item.id !== idOfNode))
  // }


  return (
    <>    
      <Switch>
        <Route exact path='/' component={SelectProject} />
        <Route path='/:project_id' component={Main} />

      </Switch>    

      {/* <SelectProject />
        <Project>
          <SelectedNode>
            <Main />
          </SelectedNode>
        </Project> */}
    </>

  );
}

export default App;
