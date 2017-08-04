const userReducer = ( state = null, action ) => {
	switch( action.type ) {

		case "login":
			return { ...state, ...action.user }
		break

		// Just return the state if no known action is specified
		default:
			return state
	}
}

export default userReducer