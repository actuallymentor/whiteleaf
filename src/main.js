const dev = process.env.NODE_ENV == 'development' ? true : false
if ( dev ) console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel } from './components/smart-header-panel'
import Footer from './components/dumb-footer'
import HeaderHero from './components/smart-header-hero'
import ContactList from './components/smart-contact-list'

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
					<Footer owner = "Mentor Palokaj" />
				</div>
			</Provider>
		)
	}
}

ReactDOM.render( <App />, document.getElementById('container') )