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
			theperson: false
		}
		this.showPerson = this.showPerson.bind( this )
		this.resetPerson = this.resetPerson.bind( this )
	}

	showPerson( e ) {
		e.preventDefault( )
		const theperson = this.props.contacts.object[e.target.id]
		this.setState( { ...this.state, theperson: theperson } )
		console.log( theperson )
	}

	resetPerson( e ) {
		e.preventDefault( )
		this.setState( { ...this.state, theperson: false } )
	}

	render( ) { 
	 	const { user, contacts } = this.props

	 	return <div>
	 				<List user = { user } show = { this.showPerson } contacts = { contacts.array.sort( ( one, two ) => one.lastmeeting > two.lastmeeting ? 1 : -1 ) } />
	 				<Person reset = { this.resetPerson } person = { this.state.theperson } />
	 			</div>
	  }
}

export default connect( store => ( { 
	user: store.user ? true : false,
	contacts: store.contacts
} ) )( ContactList )