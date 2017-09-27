// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'
import * as contacts from '../redux/actions-contacts'

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
		this.showPerson = this.showPerson.bind( this )
		this.resetPerson = this.resetPerson.bind( this )
		this.showAllToggle = this.showAllToggle.bind( this )
		this.savePerson = this.savePerson.bind( this )
		this.toggleEditPerson = this.toggleEditPerson.bind( this )
	}

	showPerson( e ) {
		e.preventDefault( )
		const showingperson = this.props.contacts.object[e.target.id]
		this.setState( { ...this.state, showingperson: showingperson } )
	}

	resetPerson( e ) {
		e.preventDefault( )
		this.setState( { ...this.state, showingperson: false } )
	}

	toggleEditPerson( e ) { 
		this.state.editingperson ? this.setState( { ...this.state, editingperson: false } ) : this.setState( { ...this.state, editingperson: true } )
	 }

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

	showAllToggle( ) {
		this.state.showall ? this.setState( { ...this.state, showall: false } ) : this.setState( { ...this.state, showall: true } )
	}

	render( ) { 
	 	const { user, contacts } = this.props

	 	// The sort is reversed because we want high priority to come first
	 	return <div>
	 				<List showall = { this.state.showall } user = { user } show = { this.showPerson } contacts = { contacts.array.sort( ( one, two ) => two.priority > one.priority ? 1 : -1 ) } />
	 				<p className="mouse link center" onClick = { this.showAllToggle }>Show { this.state.showall ? 'overdue only' : 'all contacts' }</p>
	 				<Person toggle = { this.toggleEditPerson } editing = { this.state.editingperson } save = { this.savePerson } reset = { this.resetPerson } person = { this.state.showingperson } />
	 			</div>
	  }
}

export default connect( store => ( { 
	user: store.user ? true : false,
	contacts: store.contacts
} ) )( ContactList )