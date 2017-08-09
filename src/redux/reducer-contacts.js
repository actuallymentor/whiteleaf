const contactReducer = ( state = false, action ) => { 

	switch( action.type ) { 

		case 'GETALL_FULFILLED':
			return { ...state, contacts: action.payload.friends }
		break

		case 'ADDONE_FULFILLED':
			return state
		break
		
		default:
			return state

	 }

 }