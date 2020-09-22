import { projectsReducer } from "./reducers/ProjectsReducer"
import { createStore, applyMiddleware, combineReducers  } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { logger } from "redux-logger"
import thunk from 'redux-thunk';

let reducers = combineReducers({
	projectPage: projectsReducer,
	// dialogPage: dialogReducer,
	// sidebarPage: sidebarReducer
})



export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(logger, thunk))
)