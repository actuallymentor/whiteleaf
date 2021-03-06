import app from '../modules/firebase'

export const getall = f => ( { 
	type: 'GETALL',
	payload: app.getContacts( )
 } )

export const update = values => ( {
	type: 'UPDATE',
	payload: Promise.resolve( values ).then( f => app.getContacts(  ) )
} )

export const savechanges = ( id, values ) => ( {
	type: 'UPDATE',
	payload: app.updateContact( id, values ).then( f => app.getContacts(  ) )
} )

export const addcontact = ( name, bio, email, frequency ) => ( { 
	type: 'ADDONE',
	payload: app.addContact( name, bio, email, frequency ).then( f => app.getContacts( ) )
 } )

export const clear = f => ( {
	type: 'CLEAR',
	payload: Promise.resolve( true )
} )