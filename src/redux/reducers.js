const appstate = ( state = { user: null }, action ) => {
	switch( action.type ) {

		case "login":
			return { user: user }
		break

		// Just return the state if no known action is specified
		default:
			return state
	}
}

export default appstate