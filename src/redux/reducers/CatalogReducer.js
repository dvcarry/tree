import { projectsAPI, catalogAPI, treeAPI } from "../../helpers/API"
import { createAction, createReducer } from "@reduxjs/toolkit"
import { findNested, getNested, getNestedChildren, makeNestedChildren } from "../../helpers/functions"

////////////////////// CONSTANT ///////////////////////////
const toggleFetching = createAction('TOGGLE_FETCHING')
const setCatalog = createAction('SET_CATALOG')
const setProjectId = createAction('SET_PROJECTID')
const addToCatalog = createAction('ADD_TO_CATALOG')

const setTree = createAction('SET_TREE')
const addToTree = createAction('ADD_TO_TREE')
const deleteFromTree = createAction('DELETE_FROM_TREE')
const changeParentTree = createAction('CHANGE_PARENT_IN_TREE')
const collapseItemTree = createAction('COLLAPSE_ITEM_IN_TREE')

const selectItem = createAction('SELECT_ITEM')


////////////////////// STATE ///////////////////////////
const initialState = {
    project: null,
    catalog: [],
    tree: [],
    selected: null,
    loading: false
}


////////////////////// REDUCER ///////////////////////////
export const catalogReducer = createReducer(initialState, {
    [toggleFetching]: (state) => {
        state.loading = !state.loading
    },
    [setCatalog]: (state, action) => {
        state.catalog = action.payload
    },
    [addToCatalog]: (state, action) => {
        state.catalog = [...state.catalog, action.payload]
    },
    [setTree]: (state, action) => {
        state.tree = action.payload
    },
    [addToTree]: (state, action) => {
        const spans = state.tree.find(item => item.id === action.payload.parent).spans + 1
        const parentIndex = state.tree.findIndex(item => item.id === action.payload.parent)
        const newItem = {
            id: action.payload.id,
            type: action.payload.type,
            id_element: action.payload.id_element,
            title: action.payload.title,
            parent: action.payload.parent,
            visible: true,
            opened: true,
            spans

        }
        const newTree = [...state.tree.slice(0, parentIndex + 1), newItem, ...state.tree.slice(parentIndex + 1)]
        state.tree = [...newTree]
    },
    [setProjectId]: (state, action) => {
        state.project = action.payload
    },
    [deleteFromTree]: (state, action) => {
        state.tree = state.tree.filter(item => item.id !== action.payload)
    },
    [changeParentTree]: (state, action) => {

        const newTree = state.tree.map(item => item.id === action.payload.currentId ? { ...item, parent: action.payload.newParentId } : { ...item })
        const newNewTree = getNested(newTree)         
        state.tree = newNewTree


        // const spans = state.tree.find(item => item.id === action.payload.newParentId).spans + 1
        // const oldItem = state.tree.find(item => item.id === action.payload.currentId)
        // const newItem = {
        //     ...oldItem,
        //     parent: action.payload.newParentId,
        //     spans
        // }

        // const treeNoItem = state.tree.filter(item => item.id !== action.payload.currentId)
        // const parentIndex = treeNoItem.findIndex(item => item.id === action.payload.newParentId)

        // const newTree = [...treeNoItem.slice(0, parentIndex + 1), newItem, ...treeNoItem.slice(parentIndex + 1)]
        // state.tree = [...newTree]
        // state.tree = state.tree.filter(item => item.id !== action.payload)
    },
    [collapseItemTree]: (state, action) => {
        const arrayOfNestedItems = findNested(action.payload, state.tree)
        const arrayChangedOpened = state.tree.map(item => item.id === action.payload ? { ...item, opened: !item.opened } : { ...item })
        const currentStatus = state.tree.find(item => item.id === action.payload).opened
        const newTree = arrayChangedOpened.map(item => {
            return arrayOfNestedItems.includes(item.id)
                ? { ...item, visible: currentStatus ? false : true }
                : { ...item }
        })
        state.tree = [...newTree]
    },
    [selectItem]: (state, action) => {
        state.selected = action.payload
    }
})



////////////////////// THUNK ///////////////////////////

export const getCatalogThunk = (project_id) => dispatch => {
    dispatch(toggleFetching())
    dispatch(setProjectId(project_id))
    catalogAPI.getAll(project_id)
        .then(response => {
            dispatch(setCatalog(response))
            dispatch(toggleFetching())
        })
    treeAPI.get(project_id)
        .then(response => {
            const treeView = makeNestedChildren(response)
            dispatch(setTree(treeView))
        })
}

export const addCatalogThunk = (project_id, item) => dispatch => {
    console.log("item", item)
    catalogAPI.add(project_id, item)
        .then(response => {
            dispatch(addToCatalog(response))
        })
}

export const addTreeItemThunk = (item, parentId, project_id) => dispatch => {
    treeAPI.add({ id_element: item.id, parent: parentId, project_id })
        .then(response => {
            dispatch(addToTree({ ...item, ...response }))
        })
}

export const deleteTreeItemThunk = (id) => dispatch => {
    treeAPI.delete(id)
        .then(response => {
            dispatch(deleteFromTree(id))
        })
}

export const changeParentThunk = (currentId, newParentId) => dispatch => {
    treeAPI.changeParent(currentId, newParentId)
        .then(response => {
            dispatch(changeParentTree({ currentId, newParentId }))
        })
}

export const collapseItemThunk = (id) => dispatch => {
    dispatch(collapseItemTree(id))
}

export const selectItemThunk = (id) => dispatch => {
    dispatch(selectItem(id))
}