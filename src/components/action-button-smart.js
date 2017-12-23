// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'

// Grab revevant actions
import * as contacts from '../redux/actions-contacts'
import * as meetings from '../redux/actions-meetings'
import moment from 'moment'

// Grab views
import { Button, AddContact, AddMeeting } from './action-button-dumb.js'

class ActionButton extends React.Component { 

	constructor( props ) { 
		super( props )
		this.state = { 
			addingContact: false,
			addingMeeting: false,
			// The friend you are meeting, undefined means none is selected
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

	// Toggle functions that switch the interface between 
	toggleAddContact(  ) { 
		this.setState( { ...this.state, addingContact: this.state.addingContact ? false : true } )
	}

	toggleAddMeeting(  ) { 
		this.setState( { ...this.state, addingMeeting: this.state.addingMeeting ? false : true } )
	}

	clearModals(  ) { 
		this.setState( { ...this.state, addingContact: false, addingMeeting: false } )
	 }

	// Functions used for submitting data to the firebase db
	submitContact( e ) { 
		e.preventDefault( )
		const { name, bio, email, frequency } = e.target
		this.props.dispatch( contacts.addcontact( name.value, bio.value, email.value, frequency.value ) )
		this.clearModals()
	}

	submitMeeting( e ) { 
		e.preventDefault( )
		const { date, location, notes, contactid } = e.target
		date.value = date.value.replace( /\//g, '-' )
		if ( !( /^([0-9]{1,2})\-([0-3][0-9])\-([0-2][0-9]{3})/.test( date.value ) ) ) return alert( 'Your date is not valid. Please use dd-mm-yyy.' )
		console.log( contactid, date, location, notes )
		this.props.dispatch( meetings.add( contactid.value, date.value, location.value, notes.value ) )
		this.clearModals( )
	}

	// Search function for looping through friends to find one that matches the query
	findUser( e ) { 
		const query = e.target.value.toLowerCase()
		const people = this.props.contacts.array.filter( person => person.name.toLowerCase().indexOf( query ) == -1 ? false : true )
		this.setState( { ...this.state, searchResults: people } )
	 }

	// Set the friend the meeting is with ( onclicker )
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