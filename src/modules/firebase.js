// ///////////////////////////////
// Set up firebase
// ///////////////////////////////

// Import firebase elements we need
import firebase from 'firebase'
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
		this.auth = this.fb.auth()
		this.db = this.fb.database()
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
	addContact( name, bio, channels )  { return contacts.create ( this, name, bio, channels ) }
	getContacts( )					   { return contacts.get( this ) }
	updateContact( id, data )		   { return contacts.update( this, id, data ) }

}

export default new App( config )