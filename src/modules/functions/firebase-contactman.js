// ///////////////////////////////
// This module manages the contacts
// of a user
// ///////////////////////////////

import * as db from '../helpers/firebase-db'

const verify = data => {
	
}


// Add a contact
export const create = ( app, name, bio, channels = [] ) => {
	// Write data to user's contacts child
	return db.append( app, 'contacts', { name: name, bio: bio, channels: channels } )
}

// Read a speficic contact from db
export const read = ( app, query ) => {
	
}

// Update an existing contact
export const update = ( app, data ) => {
	
}

// Remove a contact
export const destroy = ( app, data ) => {
	
}