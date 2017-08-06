// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'
import * as user from '../redux/actions-user'

// Import dumb stuff
import { LoginForm, RegisterForm } from './dumb-logreg-form'

class HeaderHeroLogic extends React.Component {

	constructor( props ) { 
		super( props )
		this.state = { 
			action: 'login'
		 }
		this.loginSubmit = this.loginSubmit.bind( this )
		this.registerSubmit = this.registerSubmit.bind( this )
		this.toggleIntent = this.toggleIntent.bind( this )
	 }

	 toggleIntent( ) { 
	 	let intent = this.state.action == 'login' ? 'register' : 'login'
	 	this.setState( { ...this.state, action: intent } )
	  }

	loginSubmit ( e ) { 
		e.preventDefault( )

		const email = e.target.lemail.value
		const password = e.target.lemail.value

		if ( !email || !password ) return alert( 'Invalid email or password.' )
		this.props.dispatch( user.login( email, password ) )
	 }

	 registerSubmit ( e ) { 
		e.preventDefault( )
		
		const email = e.target.remail.value
		const password = e.target.remail.value

		if ( !email || !password ) return alert( 'Invalid email or password.' )
		this.props.dispatch( user.register( email, password ) )
	 }

	render( ) { 
		// Destructure the props
		const { id, name, logo, user } = this.props

		const form = this.state.action == 'login' ?
						<LoginForm 	  login = { this.loginSubmit } toggle = { this.toggleIntent } /> :
						<RegisterForm register = { this.registerSubmit } toggle = { this.toggleIntent } />
		
		// Render header and login form
		return <div id = { id } className = "valign" >
			<a href = "/" className = "depth" id = "identity">
				<img
					id = "logo"
					src= { logo }
					className = { logo ? "" : "hide" } />
				 { name }
			</a>
			<h1 id = "title" className="depth nomar" >
				Hello { user ? `${ user.email }!` : 'Stranger!' }
			</h1>
			<p id = "subtitle" className="depth" >
				{ user ? `Welcome back you delightful person you.` : 'You should log in.'  }
			</p>
			{ user ? false : form }
		</div>
	 }
 }

 HeaderHeroLogic.propTypes = { 
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	logo: PropTypes.string
}

export default connect( store => ( { user: store.user } ) )( HeaderHeroLogic )