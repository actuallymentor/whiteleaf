// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// needed to fix "Error: The XMLHttpRequest compatibility library was not found."
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Get the expect functionality
import { expect } from 'chai'

// Import app and config
import App from '../src/modules/firebase'
import config from '../src/modules/helpers/firebase-config'

const email = `${ Math.random().toString(36).substr(2, 25) }@test.co`
const password = 'password'

// Generate app
const app = new App( config )

describe( 'User management', f => {

	it( 'Generated receives the config', function() { return expect( config.apiKey ).to.exist } )

	// CR_D User
	it( 'Can register a user', function() { return app.register( email, password ) } )
	it( 'Can log in a user', function() { return app.login( email, password ) } )
	it( 'Can grab the current user', function() {
		return app.currentUser().then( user => {
			expect( user.email ).to.equal( email )
		} )
	} )
	it( 'Can delete the currently logged in user', function() { return app.deleteUser() } )

} )