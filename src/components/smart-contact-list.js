// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'
import * as contacts from '../redux/actions-contacts'

// Dumb components
import List from './dumb-contact-list'

class ContactList extends React.Component { 

	constructor( props ) { 
		super( props )
	 }

	 render( ) { 

	 	const { user, contacts } = this.props

	 	return <div>
	 		{ user ? 'These are your contacts' : 'Once you log in your contacts will show here' }
	 		{ user ? <List contacts = { contacts } /> : '' }
	 	</div>
	  }
 }

export default connect( store => ( { 
	user: store.user ? true : false,
	contacts: store.contacts

 } ) )( ContactList )