const dev = process.env.NODE_ENV == 'development' ? true : false

const userReducer = ( state = false, action ) => {
	switch( action.type ) {

		// Login action logic
		case "LOGIN_PENDING":
			if ( dev ) console.log( 'Login was requested with ', action.payload )
			return state
		break
		case "LOGIN_FULFILLED":
			if ( dev ) console.log( 'Login fulfilled with', action.payload )
			// Payload contains the result of the firebase login promise chain
			return { ...state, email: action.payload.email }
		break
		case "LOGIN_REJECTED":
			if ( dev ) console.log( 'Login rejected with', action.payload )
			return state
		break

		// Register action logic
		case "REGISTER_PENDING":
			if ( dev ) console.log( 'Login was requested with ', action.payload )
			return state
		break
		case "REGISTER_FULFILLED":
			if ( dev ) console.log( 'Login fulfilled with', action.payload )
			// Payload contains the result of the firebase login promise chain
			return { ...state, email: action.payload.email }
		break
		case "REGISTER_REJECTED":
			if ( dev ) console.log( 'Login rejected with', action.payload )
			return state
		break

		// Just return the state if no known action is specified
		default:
			return state
	}
}

export default userReducer