// ///////////////////////////////
// This module contains functions
// for writing data to the db
// ///////////////////////////////

// Use the .set() function to overwrite a node
export const overwrite = ( app, path, data ) => {
	return app.currentUser().then( user => {
		return app.db.ref( `users/${ user.uid }` ).child( path ).set( data )
	} )
}

// Append data to node using .push()
export const append = ( app, path, data ) => {
	return app.currentUser().then( user => {
		return app.db.ref( `users/${ user.uid }/${ path }` ).push( data )
	} )
}

// Read a db snapshot and return it
export const read = ( app, path ) => {
	return app.currentUser().then( user => {
		return app.db.ref( `users/${user.uid}/${path}` ).once( 'value' )
	} )
}

// Use the .update() function to update a node
export const update = ( app, path, data ) => {
	return app.currentUser().then( user => {
		return app.db.ref( `users/${ user.uid }/${ path }` ).update( data )
	} )
}

// Use .remove() to delete a reference

export const destroy = ( app, ref ) => {
	return app.fb.db().ref( ref ).remove()
}