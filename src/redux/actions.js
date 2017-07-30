const actions = {
	// The login action function returns an action with the user as supplied by the code that triggers the dispatcher.
	login: user => ( { type: 'login', user: user } )
}

export default actions