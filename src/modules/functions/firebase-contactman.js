// ///////////////////////////////
// This module manages the contacts
// of a user
// ///////////////////////////////

import * as db from '../helpers/firebase-db'

const MakeObjArray = ( values ) => { 
	// Fb results are objects like:
	// { 
	// 	'KrAWm10QZiIDNKtcIdZ': { 
	// 		name: 'Potato'
	// 	},
	// 	'yuGguyGygbIIUHiubIU': { 
	// 		name: 'Potato'
	// 	}
	// }
	const results = []
	for ( let id in values ) { results.push( { ...values[id], id: id } ) }
	return results
 }


// Add a contact
export const create = ( app, name, bio, email, frequency ) => {
	// Write data to user's contacts child
	return db.append( app, 'contacts', { name: name, bio: bio, email: email, frequency: frequency } )
}

// Read a speficic contact from db
export const get = ( app ) => {
	// Read a node
	return db.read( app, `contacts` ).then( MakeObjArray )
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