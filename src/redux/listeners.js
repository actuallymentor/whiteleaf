const dev = process.env.NODE_ENV == 'development' ? true : false
import store from './store'
import { update as updateContacts } from './actions-contacts'
import * as transform from '../modules/helpers/data-transformations'

// Firebase listeners
export const contacts = app => {
	return app.listen( 'contacts' )
	.then( listener => listener.on( 'value', snapshot => {
		Promise.resolve( snapshot.val( ) )
		.then( transform.MakeObjAndArray )
		.then( transform.makeArrayMeetingsArray )
		.then( transform.makeObjectMeetingsArray )
		.then( transform.addLastMeeting )
		.then( prettydata => {
			store.dispatch( updateContacts( prettydata ) )
		} )
	} ) )
	.catch( err => { if ( dev ) console.log( 'User not yet logged in' ) } )
}

export const meetings = true