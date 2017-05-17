// ///////////////////////////////
// This module manages the meetings
// related to a user
// ///////////////////////////////

import * as db from '../helpers/firebase-db'

// Add a contact
export const create = ( app, contactid, date, location, meetingnotes ) => {
	// Write data to user's contacts child
	return db.append( app, `contacts/${contactid}/meetings`, { date: date, location: location, notes: meetingnotes } )
}

// BELOW IS JUST COPY PASTE OF CONTACTS

// Read a speficic contact from db
export const get = ( app ) => {
	// Read a node
	return db.read( app, `contacts` )
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