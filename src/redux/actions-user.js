import app from '../modules/firebase'

export const login = ( email, password ) => ( { 
	type: 'LOGIN',
	// COntact firebase and try to log in. If ann goes well, return the current user.
	payload: app.login( email, password ).then( f => app.currentUser() )
 } )

export const register = ( email, password ) => ( { 
	type: 'REGISTER',
	payload: app.register( email, password ).then( f => app.currentUser() )
 } )