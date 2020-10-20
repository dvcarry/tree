import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { addTreeItemThunk, changeParentThunk, collapseItemThunk, deleteTreeItemThunk, selectItemThunk } from '../../redux/reducers/CatalogReducer';
import { Empty } from './Empty';
import './TreeItem.css';


export const TreeItem = ({ title, spans, visible, hasChildren, id, parent, changeParent, addNew, type, deleteFromProject, changeParentInProject, opened }) => {

    const ref = useRef(null);

    const dispatch = useDispatch()

    const project_id = useSelector((state) => state.catalogReducer.project)
    const activeItem = useSelector((state) => state.catalogReducer.item)

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
            console.log('drop', item)

            if (item.from === 'tree') {
                dispatch(changeParentThunk(item.id, id))
            } else {
                dispatch(addTreeItemThunk(item, id, project_id))
            }
            // addNew(item.id, id)
            // changeParent(item.id, id)
        }
    })

    const deleteHandler = id => {
        dispatch(deleteTreeItemThunk(id))
    }

    const collapseHandler = id => {
        dispatch(collapseItemThunk(id))
    }

    const selectHandler = id => {
        console.log("id", id)
        dispatch(selectItemThunk({ type: 'tree', id }))
    }



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

    const classes = ['collapse']
    if (!opened) {
        classes.push('collapsed')
    }


    return (
        <div ref={ref} className='item' hidden={!visible} style={{ opacity }}>
            {
                Array(spans).fill().map((item, i) => <Empty key={i} last={spans === i + 1} />)
            }
            <span
                className={classes.join(' ')}
                onClick={() => collapseHandler(id)}
            >
                {

                    hasChildren && <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="down" width=".7em" height=".7em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
                    // hasChildren && <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
                }
            </span>
            <span
                onDoubleClick={() => deleteHandler(id)}
                onClick={() => selectHandler(id)}
                className={activeItem === id ? 'active' : ''}
                style={{ backgroundColor, fontWeight, color }}
            >
                {title}
            </span>
        </div>
    )
}