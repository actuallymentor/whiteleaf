// ///////////////////////////////
// This module contains functions
// that manage user data
// ///////////////////////////////

// Email registration and login
export const register = ( app, email, password ) => app.auth().createUserWithEmailAndPassword( email, password )
export const login = ( app, email, password ) => app.auth().signInWithEmailAndPassword( email, password )

// Grabbing the currently logged in user
export const get = app => {
	return new Promise( resolve => {
		app.auth( ).onAuthStateChanged( user => {
			if ( user ) resolve( user )
		} )
	} )
}

// Delete the current user
export const destroy = app => {
	return new Promise( resolve => {
		app.auth( ).onAuthStateChanged( user => {
			if ( user ) user.delete( ).then( resolve )
		} )
	} )
}