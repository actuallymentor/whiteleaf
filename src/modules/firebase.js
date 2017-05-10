// ///////////////////////////////
// Set up firebase
// ///////////////////////////////

// Import firebase elements we need
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import db from 'firebase/database'

// ///////////////////////////////
// Import functions
// ///////////////////////////////
import * as user from './functions/firebase-userman'


// ///////////////////////////////
// App wrapper
// ///////////////////////////////
export default class App {

	constructor( config ) {
		// Init firebase & link auth and db
		this.fb = firebase
		this.fb.initializeApp( config )
		this.fb.auth = auth
		this.fb.db = db
	}

	// USER MANAGEMENT

	// Login
	login( email, password ) 	{ return user.login( this.fb, email, password ) }
	// Logout
	logout( ) 					{ return user.logout( this.fb ) }
	// Register
	register( email, password ) { return user.register( this.fb, email, password ) }
	// Get current user
	currentUser( ) 				{ return user.get( this.fb ) }
	// Delete the current user
	deleteUser( ) 				{ return user.destroy( this.fb ) }
}