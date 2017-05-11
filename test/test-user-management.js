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

describe( 'User management', f => {
	// CR_D User
	it( 'Can register a user', function() { return app.register( email, password ) } )
	it( 'Can log in a user', function() { return app.login( email, password ) } )
	it( 'Can grab the current user', function() {
		return app.currentUser().then( user => {
			expect( user.email ).to.equal( email )
		} )
	} )
	it ( 'Can log out a user', function() {
		return app.login( email, password ).then( f => {
			return app.currentUser()
		} ).then( user => {
			// User is now logged in
			expect( user.email ).to.equal( email )
			return app.logout( )
		} ).then( f => {
			return app.currentUser()
		} ).catch( f => {
			// Get current user should be rejected
			return Promise.resolve( 'good' )
		} )
	} )
	it( 'Can delete the currently logged in user', function() {
		return app.login( email, password ).then( f => {
			return app.currentUser()
		} ).then( user => {
			// User is now logged in
			expect( user.email ).to.equal( email )
			return app.deleteUser( )
		} ).then( f => {
			return app.login( email, password )
		} ).then( f => {
			// The login should not work
			return Promise.reject( 'bad' )
		} ).catch( f => {
			// The login should be rejected
			Promise.resolve( 'good' )
		} )
	} )

} )