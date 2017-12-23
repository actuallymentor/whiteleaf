// Import react
import React from 'react'
import moment from 'moment'

// List the friends overdue for a meeting on the front page ( and allow toggles )
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
							<td><a onClick={ show } className="mouse link" href='#' id={ contact.id }>View</a></td>
						</tr>
					 } ) }
				</tbody>
		   </table>
}

// Modal for displaying the timeline of a friend ( and editing their info )
const deletebutton = { 
	"marginTop": 10
 }

export const Person = ( { editing, toggle, save, person, reset, deletemeet } ) => {
	if ( !person ) return false
	console.log( 'Rendered person view' )
	const history = <div className = "timeline">
						{ person.meetings.array.map( ( meeting, i ) => (
								<div key={i} className="row">
									<div className = { `col s12 m6 l6 ${ i % 2 == 0 ? 0 : 'offset-m6 offset-l6' }` } >
										<div className = { `bubble ${ i % 2 == 0 ? 'right' : 'left' }` }>
										 <p>{meeting.notes}</p>
										 <span className = "subtitle">{ `${meeting.date}, ${meeting.location}` }</span>
										 <br />
										 <input style = { deletebutton } type = "submit" value = "Delete" onClick =  { e => deletemeet( e, meeting.id, person.id ) } className = "mouse link" />
										 </div>
									</div>
								</div>	
							) ) }
					</div>
	return <div id="persontable" className="backdrop">
				<div className = 'modal col l6 m12 s12 center'>
					<h2>Your history with { person.name }</h2>
					<p>Bio: { person.bio }{ person.bio[ person.bio.length -1 ] == '.' ? '' : '.' } You contact them every { person.frequency } days</p>
					<form onSubmit = { save } className = { editing ? 'col s12 m12 l12' : 'hide' }>
						<div className = "row">
							<input type='text' name='id' defaultValue= { person.id } hidden />
							<div className = "col m4 s12">
								<input className = 'col s12' type='text' name='name' placeholder = { `Name: ${ person.name }` } />
							</div>
							<div className = "col m4 s12">
								<input className = 'col s12' type='text' name='bio' placeholder = { `Bio: ${ person.bio }` } />
							</div>
							<div className = "col m4 s12">
								<input className = 'col s12' type='number' name='frequency' placeholder = { `Contact frequency: ${ person.frequency }` } />
							</div>
							<div className = "col m6 offset-m3 s10 offset-s1">
								<input id="closeedit" className = 'col s12 link mouse' type='submit' value='Save Canges' />
							</div>
						</div>

					</form>
					<p className= { editing ? 'hide' : 'mouse link' }  onClick = { toggle } >Edit this person</p>
					{ person.meetings.array.length == 0 ? <p>You have no recorded history.</p> : history }
					<a className="closebtn mouse link" href="#" onClick = { reset } > Close </a>
				</div>
			</div>
}