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
const meeting = {
	date: '21-09-2017',
	location: 'Starbucks Paris',
	notes: `Good to see ${friend.name} again. We should meet up far more often.`
}

describe( 'Meeting management', f => {

	it( 'Can write a new meeting', function() {
		return app.register( email, password )
		.then( f => {
			return app.login( email, password )
		} )
		.then( f => {
			return app.currentUser()
		} )
		.then( user => {
			// User is now logged in
			console.log( `User ${user.uid}` )
			expect( user.email ).to.equal( email )
			return app.addContact( friend.name, friend.bio, friend.channels )
		} )
		.then( contactref => contactref.key )
		.then( contactid => {
			return app.addMeeting( contactid, meeting.date, meeting.location, meeting.notes )
		} )
	} )

} )