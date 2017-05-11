// ///////////////////////////////
// This module contains functions
// that manage user data
// ///////////////////////////////

// Email registration and login
export const register = ( app, email, password ) => app.fb.auth().createUserWithEmailAndPassword( email, password )
export const login = ( app, email, password ) => app.fb.auth().signInWithEmailAndPassword( email, password )

// Grabbing the currently logged in user
export const get = app => {
	return new Promise( ( resolve, reject ) => {
		app.fb.auth( ).onAuthStateChanged( user => {
			user ? resolve( user ) : reject( user )
		} )
	} )
}

// Log the user out
export const logout = app => app.fb.auth( ).signOut( )

// Delete the current user
export const destroy = app => {
	return new Promise( resolve => {
		app.fb.auth( ).onAuthStateChanged( user => {
			if ( user ) user.delete( ).then( resolve )
		} )
	} )
}