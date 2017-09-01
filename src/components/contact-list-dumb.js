// Import react
import React from 'react'
import moment from 'moment'

const now = moment()

const List = ( { contacts } ) => {
	if ( !contacts ) return <p>You have no contacts yet!</p>
	
	// return <ul>{ contacts.map( ( contact, i ) => <li key = { `contact${i}` }>{ contact.name }, last meeting { contact.lastmeeting } days ago</li> ) }</ul>
	return <table id="friendtable">
				<thead>
					<tr>
						<th>Person</th>
						<th>Last meeting</th>
					</tr>
				</thead>
				<tbody>
					{ contacts.map( ( contact, i ) => ( 
						<tr key = {i}>
							<td>{ contact.name }</td>
							<td>{ now.subtract( contact.lastmeeting, 'day' ).fromNow() }</td>
						</tr>
					 ) ) }
				</tbody>
		   </table>
}

 export default List