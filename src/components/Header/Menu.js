import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
    return (
        <div className='menu'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='names'>Names</NavLink>
        </div>
    )
}