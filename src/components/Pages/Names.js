import React from 'react';
import { useContext } from 'react';
import { ProjectContext } from '../../context/projectContext';
import { Name } from './Name';

export const Names = () => {

    const { catalog } = useContext(ProjectContext)

    const usedTypes = [...new Set(catalog.map(item => item.type))]
    
    const itemsToRender = usedTypes.map(type => {
        const itesFilterByType = catalog.filter(item => item.type === type).map(item => <Name {...item} />)
        return (
            <>
                <h2>{type[0].toUpperCase() + type.slice(1)}</h2>
                {itesFilterByType}
            </>
        )
    })

    return (
        <div>
            {itemsToRender}
        </div>
    )
}