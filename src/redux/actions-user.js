import app from '../modules/firebase'

export const login = ( email, password ) => ( { 
	type: 'LOGIN',
	// COntact firebase and try to log in. If ann goes well, return the current user.
	payload: app.login( email, password )
			.then( f => app.currentUser() )
			.catch( e => alert( e.message ) )
 } )

export const logout = f => ( { 
	type: 'LOGOUT',
	payload: app.logout( )
 } )

export const register = ( name, email, password ) => ( { 
	type: 'REGISTER',
	payload: app.register( email, password )
	.then( f => app.currentUser() )
	.then( user => user.updateProfile( { displayName: name } ) )
	.then( f => app.currentUser() )
	.catch( e => alert( e.message ) )
 } )