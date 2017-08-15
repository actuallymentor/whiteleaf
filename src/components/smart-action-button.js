// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'

class ActionButton extends React.Component { 

	constructor( props ) { 
		super( props )
	 }


	 render( ) { 
	 	const { user } = this.props
	 	return user ? <div>Button</div> : false
	  }
 }

export default connect( store => ( { 
	user: store.user ? true : false
 } ) )( ActionButton )