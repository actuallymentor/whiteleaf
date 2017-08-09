import app from '../modules/firebase'

export const getall = f => ( { 
	type: 'GETALL',
	payload: app.getContacts( )
 } )

export const addcontact = ( name, bio, channels ) => { 
	type: 'ADDONE',
	payload: app.addContact( name, bio, channels )
 }