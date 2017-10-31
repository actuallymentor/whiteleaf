const dev = process.env.NODE_ENV == 'development' ? true : false
if ( dev ) console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel } from './components/header-panel-smart'
import Footer from './components/footer-dumb'
import HeaderHero from './components/header-hero-smart'
import ContactList from './components/contact-list-smart'
import ActionButton from './components/action-button-smart'
import Loading from './components/loading-dumb'

// Firebase
import app from './modules/firebase'

// Set listeners
import * as listeners from './redux/listeners'
listeners.contacts( app )

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import * as user from './redux/actions-user'
import * as contacts from './redux/actions-contacts'

// Css
import './styles/styles.scss'


class App extends React.Component {

	constructor( props ) { 
		super( props )
		this.state = { 
			init: false
		}
	 }

	componentWillMount( ) {
		// CHeck if the user is logged in yet
		return store.dispatch( user.restore( ) )
				.then( f => store.dispatch( contacts.getall(  ) ) )
				.then( f => this.setState( { init: true } ) )
				.catch( f => this.setState( { init: true } ) )
	}

	// Render the main application element
	render( ) {
		if ( !this.state.init ) return <Loading />
		return (
			<Provider store = { store } >
				<div className = "flexify">
					<header>
						<Panel id= "menu" />
						<HeaderHero
							id 		 = "header"
							name	 = "Whiteleaf"
							logo	 = ""
						/>
					</header>
					<ContactList />
					<ActionButton />
					<Footer owner = "Mentor Palokaj" />
				</div>
			</Provider>
		)
	}
}



// if ( dev ) setTimeout( f => { 
// 	document.getElementById( 'lemail' ).value = `demo@sir.co.uk`
// 	document.getElementById( 'lpassword' ).value = `password1`
// 	document.getElementById( 'lbutton' ).click(  )
//  }, 1000 )

ReactDOM.render( <App />, document.getElementById('container') )