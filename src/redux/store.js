import { applyMiddleware, combineReducers, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './reducer-user'
import contactReducer from './reducer-contacts'
import logger from 'redux-logger'
import app from '../modules/firebase'

const reducers = combineReducers( { 
	user: userReducer,
	contacts: contactReducer
 } )

const middleware = applyMiddleware( logger, promiseMiddleware() )
const store = createStore( reducers, middleware )

export default store