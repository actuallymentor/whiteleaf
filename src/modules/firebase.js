// ///////////////////////////////
// Set up firebase
// ///////////////////////////////

// Import firebase elements we need
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import db from 'firebase/database'
import config from './helpers/firebase-config'

// ///////////////////////////////
// Import functions
// ///////////////////////////////
import * as user from './functions/firebase-userman'
import * as contacts from './functions/firebase-contactman'


// ///////////////////////////////
// App wrapper
// ///////////////////////////////
class App {

	constructor( config ) {
		// Init firebase & link auth and db
		this.fb = firebase
		this.fb.initializeApp( config )
		this.fb.auth = auth
		this.fb.db = db
	}

	// USER MANAGEMENT

	// Login
	login( email, password ) 	{ return user.login( this, email, password ) }
	// Logout
	logout( ) 					{ return user.logout( this ) }
	// Register
	register( email, password ) { return user.register( this, email, password ) }
	// Get current user
	currentUser( ) 				{ return user.get( this ) }
	// Delete the current user
	deleteUser( ) 				{ return user.destroy( this ) }

	// CONTACT MANAGEMENT

	// Write new contact
	makeContact( name, bio, channels ) { return contacts.create ( this, name, bio, channels ) }
}

export default new App( config )