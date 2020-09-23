import { projectsReducer } from "./reducers/ProjectsReducer"
import { catalogReducer } from "./reducers/CatalogReducer"
// import { createStore, applyMiddleware, combineReducers } from "redux"
// import { composeWithDevTools } from "redux-devtools-extension"
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { logger } from "redux-logger"
// import thunk from 'redux-thunk';

// let reducers = combineReducers({
// 	projectPage: projectsReducer,
// 	// dialogPage: dialogReducer,
// 	// sidebarPage: sidebarReducer
// })




export const store = configureStore({
	reducer: {
		projectsReducer,
		catalogReducer
	},
	middleware: getDefaultMiddleware()
})

// export const store = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(thunk))
//     // composeWithDevTools(applyMiddleware(logger, thunk))
// )

// export const store = createStore(reducers, applyMiddleware(thunk))