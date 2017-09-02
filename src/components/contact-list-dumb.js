// Import react
import React from 'react'
import moment from 'moment'

const now = moment()

const List = ( { contacts, show } ) => {
	if ( !contacts ) return <p>You have no contacts yet!</p>
	
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
							<td><a onClick={ show } className="mouse link" href='#' id={ contact.id }>View History</a></td>
						</tr>
					 ) ) }
				</tbody>
		   </table>
}

 export default List