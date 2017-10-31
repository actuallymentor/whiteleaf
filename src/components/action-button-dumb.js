// Get react
import React from 'react'

// String of today
const date = new Date( Date.now( ) )
const today = `${date.getDate( )}-${date.getMonth( ) +1}-${date.getFullYear( )}`

// The action button used to trigger data entries
export const Button = ( { addContact, addMeeting, user } ) => {
	if ( !user ) return false
	return  <div className = 'actioncontainer'>
				<div id = 'mainaction' className = 'actionbtn ripple'>
					<span className = 'icon' > + </span>
				</div>
				<div onClick = { addContact } className = 'intentbtn'>
					<span className = 'icon ripple' > f </span>
					<span className = 'actionlabel'> add friend </span>
				</div>
				<div onClick = { addMeeting } className = 'intentbtn'>
					<span className = 'icon ripple' > t </span>
					<span className = 'actionlabel'> add touchpoint </span>
				</div>
			</div> 
 }

// The popup managing the adding of a new contact
export const AddContact = ( { handleSubmit, adding, clearModals } ) => { 
	if ( !adding ) return false
	return <div className = 'backdrop' onClick = { clearModals } >
				<div onClick = { e => e.stopPropagation() } className = 'modal col l6 m12 s12'>
					<form onSubmit = { handleSubmit } className = "modalform row nomar">
						<div className="input col l6 m6 s12">
							<div className="label">Who are we adding?</div>
							<input className="col s12 m12 l12" name="name" type="text" placeholder="Tony Stark" required/>
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">How do you know them?</div>
							<input className="col s12 m12 l12" name="bio" type="text" placeholder="They said we are friends once, I like that." />
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">What's their email?</div>
							<input className="col s12 m12 l12" name="email" type="email" placeholder="best@friend.evs" />
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Contact them every how many days?</div>
							<input className="col s12 m12 l12" name="frequency" type="number" placeholder="9001" required />
						</div>
						<input type="submit" value="save" className="col l2 offset-l5 m4 offset-m4 s12" />
					</form>
				</div>
		   </div>
 }


// The popup managing the addition of a meeting to existing contacts
export const AddMeeting = ( { selectUser, meetingFriend, searchResults, findUser, handleSubmit, adding, clearModals } ) => { 
	if ( !adding ) return false

	// If a search was made, show the results
	const visibleResults = searchResults ? <ul className="searchdrop col s12 m12 l12"> { searchResults.map( result => <li onClick={ selectUser } key={ result.id } id={ result.id }> { result.name } </li> ) } </ul> : false
	// If no friend was relected, show a search bar
	const searchBar = meetingFriend.id ? false : <input onChange = { findUser } className="col s12 m12 l12 center" name="search" type="text" placeholder="Rose Tyler" />
	// Show the name of the selected contact
	const selectedFriend = meetingFriend.id ? <div className="mouse">{ meetingFriend.name }</div> : false
	// The table with the relevant input fields
	const meetingData = <div>
							<div className="input col l6 m6 s12">
								<div className="label">When did you talk? (dd-mm-yyyy)</div>
								<input className="col s12 m12 l12" name="date" type="date" defaultValue={ today } title="Date format is day-month-year. Sorry if you are metrically impaired, it's not your fault, it's how you were raised." required/>
							</div>
							<div className="input col l6 m6 s12">
								<div className="label">Where did you meet/chat?</div>
								<input className="col s12 m12 l12" name="location" type="text" placeholder="Whatsapp" required/>
							</div>
							<div className="input col l12 m12 s12">
								<div className="label">What did you chat about?</div>
								<input className="col s12 m12 l12" name="notes" type="text" placeholder="We talked about painging all German trees purple." required/>
							</div>
							{ meetingFriend.id ? <input name="contactid" defaultValue={ meetingFriend.id } hidden /> : false }
							<input type="submit" value="save" className="col l2 offset-l5 m4 offset-m4 s12" />
						</div>

	return <div className = 'backdrop' onClick = { clearModals } >
				<div onClick = { e => e.stopPropagation() } className = 'modal col l6 m12 s12'>
					<form onSubmit = { handleSubmit } className = "modalform row nomar">
						<div className="input col l8 offset-l2 m10 offset-m1 s12 center">
							<div className="label">Who did you touch base with?</div>
							{ selectedFriend }
							{ searchBar }
							{ visibleResults }
						</div>
						{ selectedFriend ? meetingData : false }
					</form>
				</div>
		   </div>
 }