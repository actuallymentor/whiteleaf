const dev = process.env.NODE_ENV == 'development' ? true : false

const userReducer = ( state = null, action ) => {

	switch( action.type ) {

		// Login/register action logic
		case "LOGIN_FULFILLED":
		case "REGISTER_FULFILLED":
			// Payload contains the result of the firebase login promise chain
			return { ...state, email: action.payload.email, name: action.payload.displayName }
		break

		case "REGISTER_REJECTED":
		case "LOGIN_REJECTED":
			return state
		break

	
		// Logout action logic
		case "LOGOUT_FULFILLED":
			// Returning null here causes state.user to be nothing
			return null
		break

		// Just return the state if no known action is specified
		default:
			return state
	}
}

export default userReducer