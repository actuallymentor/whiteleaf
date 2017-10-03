// ///////////////////////////////
// This module manages the contacts
// of a user
// ///////////////////////////////

import * as db from '../helpers/firebase-db'

import * as transform from '../helpers/data-transformations'

// Add a contact
export const create = ( app, name, bio, email, frequency ) => {
	// Write data to user's contacts child
	return db.append( app, 'contacts', { name: name, bio: bio, email: email, frequency: frequency } )
}

// Read a speficic contact from db
export const get = ( app ) => {
	
	// Read a node
	return db.read( app, `contacts` )
	.then( transform.addIdToObj )
	.then( transform.makeObjAndArray )
	.then( transform.makeArrayMeetingsArray )
	.then( transform.makeObjectMeetingsArray )
	.then( transform.addLastMeeting )
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