import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectThunk, getProjects } from '../../../redux/reducers/ProjectsReducer';
import { AddProject } from '../AddProject/AddProject';
import { Project } from '../Project/Project';
import './Projects.css'

export const SelectProject = () => {

    const [modal, setModal] = useState(false)

    const projectsData = useSelector(state => state.projectsReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    const createProject = async values => {
        dispatch(addProjectThunk(values))
        setModal(false)
    }

    return (
        <div className="Projects">
            <Button
                onClick={() => setModal(true)}
            >
                Создать
            </Button>

            {
                projectsData.loading
                    ? <p>Loading</p>
                    : projectsData.projects.map(project => (
                        <Project
                            key={project.id}
                            {...project}
                        />

                    ))
            }
            <AddProject
                visible={modal}
                onCreate={createProject}
                onCancel={() => {
                    setModal(false);
                }}
            />
        </div>
    )
}