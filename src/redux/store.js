import { combineReducers, createStore } from 'redux'
import userReducer from './userReducer'

const reducers = combineReducers( { 
	user: userReducer,
	
 } )

let store = createStore( reducers )

store.subscribe( f => { console.log( store.getState() ) } )
store.dispatch( { type: 'login', user: { name: 'Mentor' } } )

export default store