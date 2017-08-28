// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'

// Grab revevant actions
import * as contacts from '../redux/actions-contacts'
import * as meetings from '../redux/actions-meetings'

// String of today
const date = new Date( Date.now( ) )
const today = `${date.getDate( )}-${date.getMonth( ) +1}-${date.getFullYear( )}`

const Button = ( { addContact, addMeeting, user } ) => {
	if ( !user ) return false
	return  <div className = 'actioncontainer'>
				<div id = 'mainaction' className = 'actionbtn ripple'>
					<span className = 'icon' > + </span>
				</div>
				<div onClick = { addContact } className = 'intentbtn'>
					<span className = 'icon ripple' > f </span>
					<span className = 'actionlabel'> add a friend </span>
				</div>
				<div onClick = { addMeeting } className = 'intentbtn'>
					<span className = 'icon ripple' > m </span>
					<span className = 'actionlabel'> record a meeting </span>
				</div>
			</div> 
 }

const AddContact = ( { handleSubmit, adding, clearModals } ) => { 
	if ( !adding ) return false
	return <div className = 'backdrop' onClick = { clearModals } >
				<div onClick = { e => e.stopPropagation() } className = 'modal col l6 m12 s12'>
					<form onSubmit = { handleSubmit } className = "modalform row nomar">
						<div className="input col l6 m6 s12">
							<div className="label">Who are we adding?</div>
							<input className="col s12 m12 l12" name="name" type="text" placeholder="Tony Stark" required/>
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Why are they awesome?</div>
							<input className="col s12 m12 l12" name="bio" type="text" placeholder="They said we are friends once, I like that." />
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Carrier pidgeon address?</div>
							<input className="col s12 m12 l12" name="email" type="email" placeholder="best@friend.evs" />
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Stalk them every how many days?</div>
							<input className="col s12 m12 l12" name="frequency" type="number" placeholder="Over 9000" required />
						</div>
						<input type="submit" value="save" className="col l2 offset-l5 m4 offset-m4 s12" />
					</form>
				</div>
		   </div>
 }

const AddMeeting = ( { selectUser, meetingFriend, searchResults, findUser, handleSubmit, adding, clearModals } ) => { 
	if ( !adding ) return false

	const visibleResults = searchResults ? <ul className="searchdrop col s12 m12 l12"> { searchResults.map( result => <li onClick={ selectUser } key={ result.id } id={ result.id }> { result.name } </li> ) } </ul> : false
	const searchBar = meetingFriend.id ? false : <input onChange = { findUser } className="col s12 m12 l12 center" name="search" type="text" placeholder="Rose Tyler" />
	const selectedFriend = meetingFriend.id ? <div className="mouse">{ meetingFriend.name }</div> : false
	const meetingData = <div>
							<div className="input col l6 m6 s12">
								<div className="label">When did you talk? (dd-mm-yyyy)</div>
								<input className="col s12 m12 l12" name="date" type="date" defaultValue={ today } pattern="\d{1,2}-\d{1,2}-\d{4}" required/>
							</div>
							<div className="input col l6 m6 s12">
								<div className="label">Where did you meet/chat?</div>
								<input className="col s12 m12 l12" name="location" type="text" placeholder="Whatsapp" required/>
							</div>
							<div className="input col l12 m12 s12">
								<div className="label">What state secrets did you divulge?</div>
								<input className="col s12 m12 l12" name="notes" type="text" placeholder="We talked about painging all German trees purple." required/>
							</div>
							{ meetingFriend.id ? <input name="contactid" value={ meetingFriend.id } hidden /> : false }
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

class ActionButton extends React.Component { 

	constructor( props ) { 
		super( props )
		this.state = { 
			addingContact: false,
			addingMeeting: false,
			meetingFriend: { 
				id: undefined,
				name: undefined
			 },
			searchResults: undefined
		}
		this.toggleAddContact = this.toggleAddContact.bind( this )
		this.toggleAddMeeting = this.toggleAddMeeting.bind( this )
		this.clearModals = this.clearModals.bind( this )
		this.submitContact = this.submitContact.bind( this )
		this.submitMeeting = this.submitMeeting.bind( this )
		this.findUser = this.findUser.bind( this )
		this.selectUser = this.selectUser.bind( this )
	}

	toggleAddContact(  ) { 
		this.setState( { ...this.state, addingContact: this.state.addingContact ? false : true } )
	}

	toggleAddMeeting(  ) { 
		this.setState( { ...this.state, addingMeeting: this.state.addingMeeting ? false : true } )
	}

	clearModals(  ) { 
		this.setState( { ...this.state, addingContact: false, addingMeeting: false } )
	 }

	submitContact( e ) { 
		e.preventDefault( )
		const { name, bio, email, frequency } = e.target
		this.props.dispatch( contacts.addcontact( name.value, bio.value, email.value, frequency.value ) )
		this.clearModals()
	}

	submitMeeting( e ) { 
		e.preventDefault( )
		const { date, location, notes, contactid } = e.target
		console.log( contactid, date, location, notes )
		this.props.dispatch( meetings.add( contactid.value, date.value, location.value, notes.value ) )
	}

	findUser( e ) { 
		const query = e.target.value.toLowerCase()
		const people = this.props.contacts.filter( person => person.name.toLowerCase().indexOf( query ) == -1 ? false : true )
		this.setState( { ...this.state, searchResults: people } )
	 }

	selectUser( e ) { 
		const id = e.target.id
		const name = e.target.innerText
		this.setState( { ...this.state, meetingFriend: { id: id, name: name }, searchResults: undefined } )
	 }


	 render( ) { 
	 	const { user } = this.props
	 	return <div>
	 				<Button addContact = { this.toggleAddContact } addMeeting = { this.toggleAddMeeting } user = { user } />
	 				<AddContact handleSubmit = { this.submitContact } adding = { this.state.addingContact } clearModals = { this.clearModals } />
	 				<AddMeeting selectUser={ this.selectUser } meetingFriend = { this.state.meetingFriend } searchResults = { this.state.searchResults } findUser = { this.findUser } handleSubmit = { this.submitMeeting } adding = { this.state.addingMeeting } clearModals = { this.clearModals } />
	 		   </div>
	 }
}

export default connect( store => ( { 
	user: store.user ? true : false,
	contacts: store.contacts
 } ) )( ActionButton )