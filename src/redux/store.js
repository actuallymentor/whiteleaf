import { applyMiddleware, combineReducers, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './reducer-user'
import logger from 'redux-logger'

const reducers = combineReducers( { 
	user: userReducer,
 } )

const middleware = applyMiddleware( logger, promiseMiddleware() )
const store = createStore( reducers, middleware )

export default store