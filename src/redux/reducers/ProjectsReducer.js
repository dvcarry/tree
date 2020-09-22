import { projectsAPI } from "../../helpers/API"

////////////////////// CONSTANT ///////////////////////////
const TOGGLE_LOADING = 'TOGGLE_LOADING'
const SET_PROJECTS = 'SET_PROJECTS'


////////////////////// STATE ///////////////////////////
const initialState = {
    projects: [],
    loading: false,
	currentProject: null
}


////////////////////// REDUCER ///////////////////////////
export const projectsReducer = (state = initialState, action) => {
    console.log(action)
	switch (action.type) {
		case TOGGLE_LOADING:			
			return {...state, loading: action.payload}
		case SET_PROJECTS:			
			return {...state, projects: action.payload}
		default:
			return state;
	}
}


////////////////////// ACTIONS ///////////////////////////

const toggleLoadingAC = payload => {
console.log("payload", payload)
    return {
        type: TOGGLE_LOADING,
        loading: payload
    }
}

const setProjectsAC = payload => {
    return {
        type: TOGGLE_LOADING,
        payload
    }
}



// export const setCurrentUserInfo = currentUserInfo => ({type: SET_USER_INFO, currentUserInfo});

export const getProjectsThunkCreator = () => {
	return (dispatch) => {
        console.log('started')
        const a = toggleLoadingAC(true)
        console.log("getProjectsThunkCreator -> a", a)
        
        dispatch(toggleLoadingAC(true));

        // projectsAPI.getProjects().then(data => {
        //     dispatch(toggleLoadingAC(false));
        //     dispatch(setProjectsAC(data));
        // })
		// userAPI.getUsers(currentPage, pageSize).then(data => {
		// 	dispatch(toggleIsFetching(false));
		// 	dispatch(setUserd(data.item));
		// });
	}
}
