const dev = process.env.NODE_ENV == 'development' ? true : false
import store from './store'
import { update as updateContacts } from './actions-contacts'
import * as transform from '../modules/helpers/data-transformations'

// Firebase listeners
export const contacts = app => {
	return app.listen( 'contacts' )
	.then( listener => listener.on( 'value', snapshot => {
		return Promise.resolve( snapshot.val( ) )
		.then( transform.addIdToObj )
		.then( transform.makeObjAndArray )
		.then( transform.makeArrayMeetingsArray )
		.then( transform.makeObjectMeetingsArray )
		.then( transform.addLastMeeting )
		.then( prettydata => {
			return store.dispatch( updateContacts( prettydata ) )
		} )
	} ) )
	.catch( err => { if ( dev ) console.log( 'User not yet logged in', err ) } )
}

// Meetings is updates as contacts already, but I want this file to be modular already so I need 2 exports
export const meetings = true