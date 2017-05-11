// ///////////////////////////////
// This module contains functions
// for writing data to the db
// ///////////////////////////////

// Use the .set() function to overwrite a node
export const overwrite = ( app, path, data ) => {
	return app.currentUser().then( user => {
		return app.fb.db().ref( `users/${ user.uid }` ).child( path ).set( data )
	} )
}

export const append = ( app, path, data ) => {
	return app.currentUser().then( user => {
		console.log( user )
		let childid = app.fb.db().ref( `users/${ user.uid }` ).child( path ).push().key
		return app.fb.db().ref( `users/${ user.uid }/` ).child( path ).child( childid ).set( data )
	} )
}

// Use the .update() function to update a node
export const update = ( app, data ) => {

}

// Use .remove() to delete a reference

export const destroy = ( app, ref ) => {
	return app.fb.db().ref( ref ).remove()
}