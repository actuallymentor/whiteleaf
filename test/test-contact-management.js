// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// needed to fix "Error: The XMLHttpRequest compatibility library was not found."
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Get the expect functionality
import { expect } from 'chai'

// Import app and config
import app from '../src/modules/firebase'

const email = `${ Math.random().toString(36).substr(2, 25) }@test.co`
const password = 'password'

describe( 'Contact management', f => {

	it( 'Can write a new contact', function() {
		return app.register( email, password ).then( f => {
			return app.login( email, password )
		} ).then( f => {
			return app.currentUser()
		} ).then( user => {
			// User is now logged in
			expect( user.email ).to.equal( email )
			return app.makeContact( 'Potato', 'He is a total potato', [ { email: 'mr@potato.com' } ] )
		} )
	} )

} )