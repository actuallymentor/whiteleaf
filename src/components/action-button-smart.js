// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'

const View = ( { user } ) => {
	if ( !user ) return false
	return  <div className = 'actioncontainer'>
				<div id = 'mainaction' className = 'actionbtn ripple'>
					<span className = 'icon' > + </span>
				</div>
				<div className = 'intentbtn'>
					<span className = 'icon ripple' > a </span>
					<span className = 'actionlabel'> things </span>
				</div>
				<div className = 'intentbtn'>
					<span className = 'icon ripple' > b </span>
				</div>
			</div> 
 }

class ActionButton extends React.Component { 

	constructor( props ) { 
		super( props )
	 }


	 render( ) { 
	 	const { user } = this.props
	 	return <View user = { user } />
	  }
 }

export default connect( store => ( { 
	user: store.user ? true : false
 } ) )( ActionButton )