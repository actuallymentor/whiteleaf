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

// Firebase
import app from './modules/firebase'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

// Css
import './styles/styles.scss'


class App extends React.Component {

	// Render the main application element
	render( ) {
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
					<main>
						<div className="container">
							<section>
								<ContactList />
							</section>
						</div>
					</main>
					<ActionButton />
					<Footer owner = "Mentor Palokaj" />
				</div>
			</Provider>
		)
	}
}

if ( dev ) setTimeout( f => { 
	document.getElementById( 'lemail' ).value = `mentor@palokaj.co`
	document.getElementById( 'lpassword' ).value = `password`
	document.getElementById( 'lbutton' ).click(  )
 }, 1000 )

ReactDOM.render( <App />, document.getElementById('container') )