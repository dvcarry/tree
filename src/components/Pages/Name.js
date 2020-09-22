import React from 'react';
import { useContext } from 'react';
import { ProjectContext } from '../../context/projectContext';

export const Name = ({ title, description, id }) => {

    const { editCatalog } = useContext(ProjectContext)

    const onChangeHandler = e => {
        console.log(e.currentTarget.getAttribute('name'))
        editCatalog(id, {[e.currentTarget.getAttribute('name')]: e.currentTarget.textContent})
    }

    return (
        <div className='name'>
            <h3 contentEditable="true" onInput={onChangeHandler} name='title'>{title}</h3>
            <p contentEditable="true" onInput={onChangeHandler} name='description'>{description}</p>
        </div>
    )
}