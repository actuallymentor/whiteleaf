// Import react
import React from 'react'
import moment from 'moment'

const now = moment()

export const List = ( { user, contacts, show } ) => {
	if ( !user ) return false
	if ( contacts.length == 0 ) return <p className = "center">You have no contacts yet!</p>
	
	return <table className="table">
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
	const table = <table className="table">
						<thead>
							<tr>
								<th>When</th>
								<th>Where</th>
								<th>Notes</th>
							</tr>
						</thead>

						<tbody>
							{ person.meetings.array.map( ( meeting, i ) => (
								<tr key={i} >
									<td>{meeting.date}</td>
									<td>{meeting.location}</td>
									<td>{meeting.notes}</td>
								</tr>	
							) ) }
						</tbody>

					</table>
	return <div id="persontable" className="backdrop">
				<div className = 'modal col l6 m12 s12 center'>
					<h2>Your history with { person.name }</h2>
					{ person.meetings.array.length == 0 ? <p>You have no history, ha!</p> : table }
					<a className="closebtn mouse link" href="#" onClick = { reset } > Close </a>
				</div>
			</div>
}