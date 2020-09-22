import React from 'react';
import { useHistory } from 'react-router-dom';
import './Project.css'

export const Project = ({ name, id }) => {

    const history = useHistory()

    return (
        <div
            className="Card"
            onClick={() => history.push(`/${id}`)}
        >
            <h3 className="Card_title">{name}</h3>

        </div>
    )
}