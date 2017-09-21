// Import react
import React from 'react'
import moment from 'moment'

export const List = ( { user, contacts, show, showall } ) => {
	if ( !user ) return false
	if ( contacts.length == 0 ) return <p className = "center">You have no contacts yet!</p>
	
	return <table className="table">
				<thead>
					<tr>
						<th>Person</th>
						<th className = "nomobile" >Last meeting</th>
						<th>Overdue</th>
					</tr>
				</thead>
				<tbody>
					{ contacts.map( ( contact, i ) => { 
						// Don't show contacts if they are not overdue
						if ( contact.priority < 0 && !showall ) return
						return <tr key = {i}>
							<td>{ contact.name }</td>
							<td className = "nomobile">{ moment().subtract( contact.lastmeeting, 'day' ).fromNow() }</td>
							<td>{ contact.priority }</td>
							<td><a onClick={ show } className="mouse link" href='#' id={ contact.id }>View History</a></td>
						</tr>
					 } ) }
				</tbody>
		   </table>
}

export const Person = ( { person, reset } ) => {
	if ( !person ) return false
	const history = <div className = "timeline">
						{ person.meetings.array.map( ( meeting, i ) => (
								<div key={i} className="row">
									<div className = { `col s12 m6 l6 ${ i % 2 == 0 ? 0 : 'offset-m6 offset-l6' }` } >
										<div className = { `bubble ${ i % 2 == 0 ? 'right' : 'left' }` }>
										 <p>{meeting.notes}</p>
										 <span className = "subtitle">{ `${meeting.date}, ${meeting.location}` }</span>
										 </div>
									</div>
								</div>	
							) ) }
					</div>
	return <div id="persontable" className="backdrop">
				<div className = 'modal col l6 m12 s12 center'>
					<h2>Your history with { person.name }</h2>
					{ person.meetings.array.length == 0 ? <p>You have no history, ha!</p> : history }
					<a className="closebtn mouse link" href="#" onClick = { reset } > Close </a>
				</div>
			</div>
}