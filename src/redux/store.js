import { projectsReducer } from "./reducers/ProjectsReducer"
import { catalogReducer } from "./reducers/CatalogReducer"
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		projectsReducer,
		catalogReducer
	},
	middleware: getDefaultMiddleware()
})