import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Empty } from './Empty'


export const TreeItem = ({ title, spans, visible, click, id, parent, changeParent, addNew, type, deleteFromProject, changeParentInProject, opened }) => {

    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'component', id, from: 'tree' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ['component', 'element', 'data', 'datas', 'condition', 'function'],
        canDrop: (item, monitor) => item.id !== id,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: item => {
            console.log(item.id, id, item.from)

            if (item.from === 'tree') {
                changeParentInProject(item.id, id)
            } else {
                addNew(item.id, id)
            }
            // addNew(item.id, id)
            // changeParent(item.id, id)
        }
    })

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1
    const isActive = canDrop && isOver
    let backgroundColor = ''
    if (isActive) {
        backgroundColor = '#4e98d4'
    }
    let fontWeight = 300
    if (type === 'component' || type === 'datas') {
        fontWeight = 700
    }
    let color = 'black'
    if (type === 'data' || type === 'datas') {
        color = 'red'
    } else if (type === 'function') {
        color = 'blue'
    }


    return (
        <div ref={ref} className='item' hidden={!visible} style={{ opacity }}>
            {
                Array(spans).fill().map(item => <Empty />)
            }
            <span className='collapse' onClick={() => click(id)}> &#8744; </span>
            <span onDoubleClick={() => deleteFromProject(id)} className='value' style={{ backgroundColor, fontWeight, color }}>{title}</span>
        </div>
    )
}