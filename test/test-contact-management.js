// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// Import app and config
import app from '../src/modules/firebase'

const email = `${ Math.random().toString(36).substr(2, 25) }@test.co`
const password = 'password'
const friend = {
	name: 'Potato',
	bio: 'He is a total potato',
	channels: [ { email: 'mr@potato.com' } ]
}
const updatefriend = {
	name: 'Potatohead'
}

describe( 'Contact management', f => {

	it( 'Can write a new contact', function() {
		return app.register( email, password ).then( f => {
			return app.login( email, password )
		} ).then( f => {
			return app.currentUser()
		} ).then( user => {
			// User is now logged in
			expect( user.email ).to.equal( email )
			return app.addContact( friend.name, friend.bio, friend.channels )
		} )
	} )

	it( 'Can read current contacts', function() {
		return app.currentUser().then( user => {
			// User is still logged in
			expect( user.email ).to.equal( email )
			return app.getContacts()
		} ).then( contacts => {
			expect( contacts.val() ).to.be.an( 'object' )
			let keys = Object.keys( contacts.val() )
			expect( contacts.child( keys[0] ).val().name ).to.equal( friend.name )
			expect( contacts.child( keys[0] ).val().bio ).to.equal( friend.bio )
			expect( contacts.child( keys[0] ).val().channels.email ).to.equal( friend.channels.email )
		} )
	} )

	it( 'Can update an existing contact', function() {
		return app.currentUser().then( user => {
			// User is still logged in
			expect( user.email ).to.equal( email )
			return app.getContacts()
		} ).then( contacts => {
			let keys = Object.keys( contacts.val() )
			return keys[0]
		} ).then( contactid => {
			return app.updateContact( contactid, updatefriend )
		} ).then( f => {
			return app.getContacts()
		} ).then( updatedcontacts => {
			let keys = Object.keys( updatedcontacts.val() )
			expect( updatedcontacts.child( keys[0] ).val().name ).to.equal( updatefriend.name )
		} )
	} )

	it( 'Can delete existing contacts', function() {
		return app.currentUser().then( user => {
			// User is still logged in
			expect( user.email ).to.equal( email )
			return app.getContacts()
		} ).then( contacts => {
			let keys = Object.keys( contacts.val() )
			return keys[0]
		} ).then( contactid => {
			return app.destroyContact( contactid )
		} ).then( f => {
			return app.getContacts()
		} ).then( contacts => {
			expect( contacts.val( ) ).to.equal( null )
			// We are done, delete user
			return app.deleteUser( )
		} )
	} )



} )