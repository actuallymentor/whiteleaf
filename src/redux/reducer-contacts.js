import moment from 'moment'

const contactsReducer = ( state = { array: [], object: {} }, action ) => { 

	switch( action.type ) { 

		case 'UPDATE_FULFILLED':
		case 'GETALL_FULFILLED':
			// action.payload is an array of contacts resulting from a transformed firebase call
			return action.payload ? action.payload : state
		break

		case 'ADDONE_FULFILLED':
			return state
		break

		case 'CLEAR_FULFILLED':
			return null
		break
		
		default:
			return state

	 }

 }

 export default contactsReducer