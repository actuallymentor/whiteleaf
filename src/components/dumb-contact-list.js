// Import react
import React from 'react'

const List = ( { contacts } ) => {
	if ( contacts )
		return <ul>{ contacts.map( ( contact, i ) => <li key = { `contact${i}` }>{ contact.name }</li> ) }</ul>
	else
		return <p>No contacts</p>
}

 export default List