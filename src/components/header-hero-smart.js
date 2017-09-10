// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'
import * as user from '../redux/actions-user'
import * as contacts from '../redux/actions-contacts'

// Import dumb stuff
import { LoginForm, RegisterForm } from './logreg-form-dumb'
import Loading from './loading-dumb'

class HeaderHeroLogic extends React.Component {

	constructor( props ) { 
		super( props )
		this.state = { 
			action: 'login',
			loading: false
		 }
		this.loginSubmit = this.loginSubmit.bind( this )
		this.registerSubmit = this.registerSubmit.bind( this )
		this.toggleIntent = this.toggleIntent.bind( this )
		this.logout = this.logout.bind( this )
	 }

	 setLoading( value ) { 
	 	return Promise.resolve( this.setState( { ...this.state, loading: value } ) )
	 }

	 toggleIntent( ) { 
	 	let intent = this.state.action == 'login' ? 'register' : 'login'
	 	this.setState( { ...this.state, action: intent } )
	  }

	loginSubmit ( e ) { 
		e.preventDefault( )

		const email = e.target.lemail.value
		const password = e.target.lpassword.value

		console.log( 'logging in with', email, password )

		if ( !email || !password ) return alert( 'Invalid email or password.' )
		this.setLoading( 'Logging in' )
		.then( f => this.props.dispatch( user.login( email, password ) ) )
		.then( f => this.props.dispatch( contacts.getall() ) )
		.then( f => this.setLoading( false ) )
		.catch( f => this.setLoading( false ) )
	 }

	 registerSubmit ( e ) { 
		e.preventDefault( )
		
		const email = e.target.remail.value
		const password = e.target.rpassword.value
		const name = e.target.rname.value

		if ( !email || !password ) return alert( 'Invalid email or password.' )
		this.props.dispatch( user.register( name, email, password ) )
	 }

	 logout( ) { 
	 	this.props.dispatch( user.logout( ) )
	 	.then( f => this.props.dispatch( contacts.clear(  ) ) )
	  }

	render( ) { 

		if ( this.state.loading ) return <Loading message = { this.state.loading } />

		// Destructure the props
		const { id, name, logo, user } = this.props

		const form = this.state.action == 'login' ?
						<LoginForm 	  login = { this.loginSubmit } toggle = { this.toggleIntent } /> :
						<RegisterForm register = { this.registerSubmit } toggle = { this.toggleIntent } />
		
		// Render header and login form
		return <div id = { id } className = "valign" style = { user ? {  } : { height: '100vh' } }>
			<a href = "/" className = "depth" id = "identity">
				<img
					id = "logo"
					src= { logo }
					className = { logo ? "" : "hide" } />
				 { name }
			</a>
			<h1 id = "title" className="nomar" >
				Hello { user ? `${ user.name || user.email }!` : 'Stranger!' }
			</h1>
			<p id = "subtitle" >
				{ user ? `Welcome back you delightful person you.` : 'You should log in.'  }
			</p>

			{ user ? <span onClick = { this.logout } className="mouse link">Logout</span> : form }
		</div>
	 }
 }

 HeaderHeroLogic.propTypes = { 
	id: PropTypes.string,
	name: PropTypes.string.isRequired,
	logo: PropTypes.string
}

export default connect( store => ( { user: store.user } ) )( HeaderHeroLogic )