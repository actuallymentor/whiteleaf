// Import react
import React from 'react'
import moment from 'moment'

const now = moment()

export const List = ( { user, contacts, show } ) => {
	if ( !user ) return false
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

export const Person = ( { person, reset } ) => {
	if ( !person ) return false
		console.log( person )
	return <div className="backdrop">
				<div className = 'modal col l6 m12 s12 center'>
					<h2>Your history with { person.name }</h2>
					<a href="#" onClick = { reset } > Close </a>
				</div>
			</div>
}