import moment from 'moment'
const now = moment()

export const MakeObjAndArray = ( thecontacts ) => { 
	// Fb results are objects like: { 'id': { name: 'Potato' }

	// Make the results array
	const contactarray = []
	for ( let id in thecontacts ) { contactarray.push( { ...thecontacts[id], id: id } ) }

	// Return both the array and object for for easy access
	return { array: contactarray, object: thecontacts }
 }
export const makeArrayMeetingsArray = contacts => {
	if ( !contacts ) return contacts
	contacts.array = contacts.array.map( contact => {
		contact.meetings = MakeObjAndArray( contact.meetings )
		return contact
	} )
	return contacts
}

export const makeObjectMeetingsArray = contacts => {
	for ( let id in contacts.object ) {
		// Copy the meetings to new variable
		const oldmeetings = { ...contacts.object[id].meetings }
		// Empty the meetings key
		contacts.object[id].meetings = {}
		if ( !oldmeetings ) contacts.object[id].meetings = { array: [], object: {} }
		contacts.object[id].meetings = MakeObjAndArray( oldmeetings )
	}
	return contacts
}

export const addLastMeeting = contacts => {
	contacts.array = contacts.array.map( contact => { 

		// If no meetings are registered, assume the last touch point was 1 year ago
		if ( contact.meetings.array.length == 0 ) { return { ...contact, lastmeeting: 365, priority: 365 } }

		// Add the lastmeetingm. The ... is because .min only takes parameters but not arrays
		contact.lastmeeting = Math.min( ...contact.meetings.array.map( meeting => now.diff( moment( meeting.date, 'DD-MM-YYYY' ), 'days' ) ) )
		// How many days have passed since you should have contacted them?
		contact.priority = contact.lastmeeting - contact.frequency
		return contact
	} )
	return contacts
}