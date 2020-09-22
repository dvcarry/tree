import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { fetchAddNewProject, fetchGetAllProjects } from '../../../helpers/API';
import { getProjectsThunkCreator } from '../../../redux/reducers/ProjectsReducer';
import { AddProject } from '../AddProject/AddProject';
import { Project } from '../Project/Project';
import './Projects.css'

export const SelectProject = () => {

    const [projects, setProjects] = useState()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const getProjects = () => {
            const projects = getProjectsThunkCreator(1)
            console.log("getProjects -> projects", projects)
            // setProjects(projects)
        }
        getProjects()
    }, [])

    const createProject = async values => {
        const newProject = await fetchAddNewProject(values)
        setProjects([...projects, newProject])
        setModal(false)
    }

    return (
        <div class="Projects" uk-grid>
            <Button
                onClick={() => setModal(true)}
            >
                Создать
            </Button>

            {
                projects && projects.map(project => (
                    <Project
                        key={project.id}
                        {...project}
                    />

                ))
            }
            {/* <Modal /> */}
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