import moment from 'moment'

const contactsReducer = ( state = { array: [], object: {} }, action ) => { 

	switch( action.type ) { 

		case 'GETALL_FULFILLED':
			// action.payload is an array resulting from a transformed firebase call
			return action.payload ? action.payload : state
		break

		case 'ADDONE_FULFILLED':
			return state
		break
		
		default:
			return state

	 }

 }

 export default contactsReducer