import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/reducers/ProjectsReducer';
import './Menu.css'

export const Menu = () => {

    const project = useSelector(state => state.catalogReducer.project)
    console.log("Menu -> project", project)
    const projects = useSelector(state => state.projectsReducer.projects)
    console.log("Menu -> projects", projects)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    let nameOfProject
    
    if (projects.length > 0 && project) {
        nameOfProject = projects && project && projects.find(item => item.id === Number(project)).name
    }
    console.log("Menu -> nameOfProject", nameOfProject)
    return (
        <div className='Menu'>
            Проект: {nameOfProject}
        </div>
    )
}