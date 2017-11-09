// ///////////////////////////////
// Set up firebase
// ///////////////////////////////

// Why this file? because firebase is a bitch. It doesn't work in mocha unless you import the entire package.

// Import firebase elements we need
import * as firebase from 'firebase'

import config from './helpers/firebase-config'

// ///////////////////////////////
// Import functions
// ///////////////////////////////
import * as user from './functions/firebase-userman'
import * as contacts from './functions/firebase-contactman'
import * as meetings from './functions/firebase-meetingman'
import { listen } from './helpers/firebase-db'


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

	login( email, password ) 	{ return user.login( this, email, password ) }
	logout( ) 					{ return user.logout( this ) }
	register( email, password ) { return user.register( this, email, password ) }
	currentUser( ) 				{ return user.get( this ) }
	deleteUser( ) 				{ return user.destroy( this ) }

	// CONTACT MANAGEMENT
	addContact( name, bio, email, frequency )  { return contacts.create ( this, name, bio, email, frequency ) }
	getContacts( )					   		   { return contacts.get( this ) }
	updateContact( id, data )				   { return contacts.update( this, id, data ) }
	destroyContact( id )			           { return contacts.destroy( this, id ) }

	// MEETING MANAGEMENT
	addMeeting( contactid, date, location, meetingnotes ) { return meetings.create( this, contactid, date, location, meetingnotes ) }
	getMeetingsWith( contactid ) 						  { return meetings.get( this, contactid ) }
	updateMeeting( contactid, meetingid, newdata ) 		  { return meetings.update( this, contactid, meetingid, newdata ) }
	destroyMeeting( contactid, meetingid ) 				  { return meetings.destroy( this, contactid, meetingid ) }

	// HELPERS
	listen( path ) { return listen( this, path ) }

}

export default new App( config )