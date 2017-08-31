// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'
import * as contacts from '../redux/actions-contacts'

// Dumb components
import List from './contact-list-dumb'


class ContactList extends React.Component { 

	constructor( props ) { 
		super( props )
	 }

	 render( ) { 
	 	const { user, contacts } = this.props
	 	console.log( 'render', contacts )

	 	return <div>
	 		{ user ? 'These are your contacts' : 'Once you log in your contacts will show here' }
	 		{ user ? <List contacts = { contacts.sort( ( one, two ) => one.lastmeeting > two.lastmeeting ? 1 : -1 ) } /> : '' }
	 	</div>
	  }
 }

export default connect( store => ( { 
	user: store.user ? true : false,
	contacts: store.contacts

 } ) )( ContactList )