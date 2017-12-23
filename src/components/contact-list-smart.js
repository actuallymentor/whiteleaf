// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'
import * as contacts from '../redux/actions-contacts'
import * as meetings from '../redux/actions-meetings'

// Dumb components
import { List, Person } from './contact-list-dumb'


class ContactList extends React.Component { 

	constructor( props ) { 
		super( props )
		this.state = {
			showingperson: false,
			showall: false,
			editingperson: false
		}
		this.currentperson = this.currentperson.bind( this )
		this.showPerson = this.showPerson.bind( this )
		this.resetPerson = this.resetPerson.bind( this )
		this.showAllToggle = this.showAllToggle.bind( this )
		this.savePerson = this.savePerson.bind( this )
		this.toggleEditPerson = this.toggleEditPerson.bind( this )
		this.deleteMeeting = this.deleteMeeting.bind( this )
	}


	// Setting the id of the person we're interacting with in the state
	showPerson( e ) {
		e.preventDefault( )
		this.setState( { ...this.state, showingperson: e.target.id } )
	}

	// Clear person id in the state
	resetPerson( e ) {
		e.preventDefault( )
		this.setState( { ...this.state, showingperson: false } )
	}

	// Toggle whether or not we are currently editing the person we are viewing
	toggleEditPerson( e ) { 
		this.state.editingperson ? this.setState( { ...this.state, editingperson: false } ) : this.setState( { ...this.state, editingperson: true } )
	 }

	// Save the new person details we put in the editable fields
	savePerson( e ) { 
		e.preventDefault(  )
		const { id, name, bio, frequency } = e.target
		const newdata = {}
		if ( name.value.length > 0 ) newdata.name = name.value
		if ( bio.value.length > 0 ) newdata.bio = bio.value
		if ( frequency.value.length > 0 ) newdata.frequency = frequency.value
		this.props.dispatch( contacts.savechanges( id.value, newdata ) )
		this.toggleEditPerson(  )
	 }

	 currentperson( ) {
	 	if ( this.state.showingperson) return this.props.contacts.object[this.state.showingperson]
	 	return false
	 }

	// Whether only to show overdue of all contacts on the main page
	showAllToggle( ) {
		this.state.showall ? this.setState( { ...this.state, showall: false } ) : this.setState( { ...this.state, showall: true } )
	}

	// Delete meeting
	deleteMeeting( e, meetid, personid ) { 
		e.preventDefault(  )
		console.log( meetid, personid )
		this.props.dispatch( meetings.destroy( personid, meetid ) ).then( console.log.bind( console ) )
	 }

	render( ) { 
	 	const { user, contacts } = this.props

	 	// The sort is reversed because we want high priority to come first
	 	const list =    <main><div className="container"><section><div>
			 				<List showall = { this.state.showall } user = { user } show = { this.showPerson } contacts = { contacts.array.sort( ( one, two ) => two.priority > one.priority ? 1 : -1 ) } />
			 				<p className="mouse link center" onClick = { this.showAllToggle }>Show { this.state.showall ? 'overdue only' : 'all contacts' }</p>
			 				<Person toggle = { this.toggleEditPerson } editing = { this.state.editingperson } save = { this.savePerson } reset = { this.resetPerson } person = { this.props.contacts.object[this.state.showingperson] } deletemeet = { this.deleteMeeting } />
			 			</div></section></div></main>
		return user ? list : false
}

// Connect the relevant redux data to this component. Contacts can be quite big since it includes meeting data
export default connect( store => ( { 
	user: store.user ? true : false,
	contacts: store.contacts
} ) )( ContactList )