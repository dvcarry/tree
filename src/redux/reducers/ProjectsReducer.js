import { projectsAPI } from "../../helpers/API"
import { createAction, createReducer } from "@reduxjs/toolkit"

////////////////////// CONSTANT ///////////////////////////
const toggleFetching = createAction('TOGGLE_FETCHING')
const setProjects = createAction('SET_PROJECTS')
const addProject = createAction('ADD_PROJECT')


////////////////////// STATE ///////////////////////////
const initialState = {
    projects: [],
    loading: false,
    currentProject: null
}


////////////////////// REDUCER ///////////////////////////
export const projectsReducer = createReducer(initialState, {
    [toggleFetching]: (state) => {
        state.loading = !state.loading
    },
    [setProjects]: (state, action) => {
        state.projects = action.payload
    },
    [addProject]: (state, action) => {
        state.projects = [...state.projects, action.payload]
    },
})



////////////////////// THUNK ///////////////////////////

export const getProjects = () => dispatch => {   
    dispatch(toggleFetching())
    projectsAPI.getProjects()
        .then(response => {
            dispatch(setProjects(response))
            dispatch(toggleFetching())
        })
}

export const addProjectThunk = (project) => dispatch => {   
    projectsAPI.fetchAddProject(project)
        .then(response => {
            dispatch(addProject(response))
        })
}


