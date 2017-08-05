import { applyMiddleware, combineReducers, createStore } from 'redux'
import userReducer from './userReducer'
import logger from 'redux-logger'

const reducers = combineReducers( { 
	user: userReducer,
	
 } )

const middleware = applyMiddleware( logger )
const store = createStore( reducers, middleware )

store.dispatch( { type: 'login', user: { name: 'Mentor' } } )

export default store