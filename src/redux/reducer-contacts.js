import moment from 'moment'

const contactsReducer = ( state = [], action ) => { 

	switch( action.type ) { 

		case 'GETALL_FULFILLED':
			// action.payload is an array resulting from a transformed firebase call
			// Generate 'lastmeeting' points
			const contacts = action.payload.map( contact => { 
				// If the last meeting if known, use it
				if ( contact.lastmeeting ) return contact

				// If no meetings are registered, assume the last touch point was 1 year ago
				if ( contact.meetings.length == 0 ) { 
					contact.lastmeeting =  365
					return contact
				}

				// Add the lastmeeting
				// The ... is because .min only takes parameters but not arrays
				contact.lastmeeting = Math.min( ...contact.meetings.map( meeting => moment( ).diff( moment( meeting.date, 'DD-MM-YYYY' ), 'days' ) ) )
				return contact
			} )
			return action.payload ? action.payload : state
		break

		case 'ADDONE_FULFILLED':
			return state
		break
		
		default:
			return state

	 }

 }

 export default contactsReducer