import { projectsAPI, catalogAPI, treeAPI } from "../../helpers/API"
import { createAction, createReducer } from "@reduxjs/toolkit"

////////////////////// CONSTANT ///////////////////////////
const toggleFetching = createAction('TOGGLE_FETCHING')
const setCatalog = createAction('SET_CATALOG')
const addToCatalog = createAction('ADD_TO_CATALOG')

const setTree = createAction('SET_TREE')


////////////////////// STATE ///////////////////////////
const initialState = {
    catalog: [],
    tree: [],
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
})



////////////////////// THUNK ///////////////////////////

export const getCatalogThunk = (project_id) => dispatch => {
    dispatch(toggleFetching())
    catalogAPI.getAll(project_id)
        .then(response => {
            dispatch(setCatalog(response))
            dispatch(toggleFetching())
        })
    treeAPI.get(project_id)
        .then(response => {
            dispatch(setTree(response))
        })
}

export const addCatalogThunk = (item) => dispatch => {
    catalogAPI.add(item)
        .then(response => {
            dispatch(addToCatalog(response))
        })
}

// export const getTreeThunk = (project_id) => dispatch => {   
//     dispatch(toggleFetching())
//     catalogAPI.getAll(project_id)
//         .then(response => {
//             dispatch(setCatalog(response))
//             dispatch(toggleFetching())
//         })
// }


