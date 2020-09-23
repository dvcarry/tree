import React, { useContext, useState, useEffect } from 'react'
import { Tag } from 'antd'
import { useDrop } from 'react-dnd'
import { Render } from './Render'
import { ProjectContext } from '../../context/projectContext'
import { ComponentProps } from './ComponentProps'
import { ComponentData } from './ComponentData'
import { Field } from './Field'
import { Arrays } from './Arrays'
import { SelectedNodeContext } from '../../context/selectedNodeContext'
import { Component } from './Component'
// import { Data } from './Data'

// export const Description = ({ selectedNode, addToProject, allElements }) => {
export const Description = ({ addToProject, allElements }) => {

    const [props, setProps] = useState([])
    const [nodeInfo, setNodeInfo] = useState(null)

    const { selectedNode } = useContext(SelectedNodeContext)

    const { project, deleteFromCatalog, catalog } = useContext(ProjectContext)


    useEffect(() => {
        if (selectedNode) {
            const node = catalog.find(item => item.id === selectedNode)
            const parentIds = project
                .filter(item => item.id_element === selectedNode)
                .map(el => ({ id: el.parent, title: catalog.find(element => element.id === el.parent).title }))

            const childrens = project
                .filter(item => item.parent === selectedNode).map(el => el.id_element)
            const props = catalog.filter(item => childrens.includes(item.id) && item.type === 'props').map(el => ({ id: el.id, title: el.title }))

            setNodeInfo(
                {
                    id: selectedNode,
                    title: node.title,
                    description: node.description,
                    type: node.type,
                    parents: parentIds,
                    props: props,
                    renderElements: project.filter(item => item.parent === selectedNode && (item.type === 'element' || item.type === 'component'))
                }
            )
        }
    }, [selectedNode, project])


    const [collectedProps, drop] = useDrop({
        accept: ['element', 'component'],
        drop: item => {

            // addCar(item.title)
        }
    })

    const deleteHandler = () => {
        deleteFromCatalog(selectedNode.id)
    }

    const addToProps = (item, type) => {
        if (props.some(el => el.id === item.id)) {
            setProps(props.map(el => el.id === item.id ? { ...el, type: type } : el))
        } else {
            setProps([...props, {
                ...item,
                type
            }])
        }
    }


    // let renderElements = null
    // if (allElements && allElements.length > 0) {
    //     renderElements = allElements.filter(item => item.type === 'element' || item.type === 'component')
    // }
    // if (allElements && allElements.length > 0) {
    //     renderElements = project.filter(item => item.type === 'element' || item.type === 'component')
    // }

    // const findAllProps = selectedNode && project.filter(item => item.parent === selectedNode.id)



    const renderElements = selectedNode && project.filter(item => item.parent === selectedNode.id)
    const renderElementsArray = selectedNode && renderElements.map(item => item.id)
    const allProps = selectedNode && project.filter(item => renderElementsArray.includes(item.parent))

    const typesOfSource = ['props', 'context', 'state']

    const renders = typesOfSource
        .map(item => {
            return (
                <ComponentProps
                    addToProps={(item, typeOfSource) => addToProps(item, typeOfSource)}
                    typeOfSource={item}
                    data={props.filter(datael => datael.type === item)}
                />
            )
        })

    let renderDesc = null

    if (nodeInfo) {
        if (nodeInfo.type === 'datas') {
            // renderDesc = <Arrays selectedNode={selectedNode} renderElements={project.filter(item => item.parent === selectedNode.id )} />
            renderDesc = <Field
                selectedNode={selectedNode}
                acceptTypesArray={['data']}
                fieldElements={project.filter(item => item.parent === selectedNode.id)}
            />
        }
        // else if (nodeInfo.type === 'component') {
        //     // renderDesc = <Arrays selectedNode={selectedNode} renderElements={project.filter(item => item.parent === selectedNode.id )} />
        //     renderDesc = <Render selectedNode={selectedNode} renderElements={nodeInfo.renderElements} />
        // }
    }

    const router = {
        component: <Component nodeInfo={nodeInfo} />,
        // data: <Data />
    }


    return (
        <div>
            {
                nodeInfo &&
                (
                    <>
                        <div className="desc_heading">
                            <div className="desc_title">
                                <h2>{nodeInfo.title}</h2>
                                <Tag color="success">{nodeInfo.type}</Tag>
                            </div>
                            <div className="desc_buttons">
                                <button onClick={deleteHandler}>Delete</button>
                                <button onClick={deleteHandler}>Edit</button>
                            </div>
                        </div>
                        <p>{nodeInfo.description}</p>
                        {/* <Component nodeInfo={nodeInfo} /> */}
                        {router[nodeInfo.type]}
                    </>
                )

            }



            {renderDesc}


        </div>
    )
}