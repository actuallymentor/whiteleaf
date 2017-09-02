// ///////////////////////////////
// This module manages the contacts
// of a user
// ///////////////////////////////

import moment from 'moment'

import * as db from '../helpers/firebase-db'

const MakeObjAndArray = ( thecontacts ) => { 
	// Fb results are objects like: { 'id': { name: 'Potato' }

	// Make the results array
	const contactarray = []
	for ( let id in thecontacts ) { contactarray.push( { ...thecontacts[id], id: id } ) }

	// Return both the array and object for for easy access
	return { array: contactarray, object: thecontacts }
 }
const makeArrayMeetingsArray = contacts => {
	if ( !contacts ) return contacts
	contacts.array = contacts.array.map( contact => {
		contact.meetings = MakeObjAndArray( contact.meetings )
		return contact
	} )
	return contacts
}

const makeObjectMeetingsArray = contacts => {
	for ( let id in contacts.object ) {
		// Copy the meetings to new variable
		const oldmeetings = { ...contacts.object[id].meetings }
		// Empty the meetings key
		contacts.object[id].meetings = {}
		if ( !oldmeetings ) contacts.object[id].meetings = { array: [], object: {} }
		contacts.object[id].meetings = MakeObjAndArray( oldmeetings )
	}
	return contacts
}

const addLastMeeting = contacts => {
	const now = moment()
	contacts.array = contacts.array.map( contact => { 

		// If no meetings are registered, assume the last touch point was 1 year ago
		if ( contact.meetings.array.length == 0 ) { return { ...contact, lastmeeting: 365 } }

		// Add the lastmeetingm. The ... is because .min only takes parameters but not arrays
		contact.lastmeeting = Math.min( ...contact.meetings.array.map( meeting => now.diff( moment( meeting.date, 'DD-MM-YYYY' ), 'days' ) ) )
		return contact
	} )
	return contacts
}


// Add a contact
export const create = ( app, name, bio, email, frequency ) => {
	// Write data to user's contacts child
	return db.append( app, 'contacts', { name: name, bio: bio, email: email, frequency: frequency } )
}

// Read a speficic contact from db
export const get = ( app ) => {
	
	// Read a node
	return db.read( app, `contacts` ).then( MakeObjAndArray ).then( makeArrayMeetingsArray ).then( makeObjectMeetingsArray ).then( addLastMeeting )
}

// Update an existing contact
export const update = ( app, contactid, newdata ) => {
	// Update a contact
	return db.update( app, `contacts/${contactid}`, newdata )
}

// Remove a contact
export const destroy = ( app, contactid ) => {
	return db.destroy( app, `contacts/${contactid}` )
}