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
const updatedmeeting = {
	location: 'Starbucks Paris Central Station'
}

// Contact id of the newly created contact
let friendid = ''
let meetingid = ''

describe( 'Meeting management', f => {

	it( 'Can write a new meeting', function() {
		return app.register( email, password ).then( f => {
			return app.login( email, password )
		} )
		.then( f => {
			return app.currentUser()
		} )
		.then( user => {
			// User is now logged in
			expect( user.email ).to.equal( email )
			return app.addContact( friend.name, friend.bio, friend.channels )
		} )
		.then( contactref => contactref.key )
		.then( contactid => {
			// Set the friend id globally
			friendid = contactid
			return app.addMeeting( contactid, meeting.date, meeting.location, meeting.notes )
		} )
	} )

	it( 'Can read currently existing meetings', function() {
		return app.currentUser()
		.then( user => {
			// User is still logged in
			expect( user.email ).to.equal( email )
			return app.getMeetingsWith( friendid )
		} )
		.then( meetings => {
			expect( meetings.val() ).to.be.an( 'object' )
			let keys = Object.keys( meetings.val() )
			// Set the meeting id for later tests
			meetingid = keys[0]
			expect( meetings.child( keys[0] ).val().date ).to.equal( meeting.date )
			expect( meetings.child( keys[0] ).val().location ).to.equal( meeting.location )
			expect( meetings.child( keys[0] ).val().notes ).to.equal( meeting.notes )
		} )
	} )

	it( 'Can update currently existing meetings', function() {
		return app.currentUser()
		.then( user => {
			return app.updateMeeting( friendid, meetingid, updatedmeeting )
		} ).then( f => {
			return app.getMeetingsWith( friendid )
		} ).then( meetings => {
			let keys = Object.keys( meetings.val() )
			expect( meetings.child( keys[0] ).val().location ).to.equal( updatedmeeting.location )
		} )
	} )

	it( 'Can delete a meeting', function() {
		return app.destroyMeeting( friendid, meetingid )
		.then( f => {
			return app.currentUser()
		} )
		.then( user => {
			return app.getMeetingsWith( friendid )
		} )
		.then( meetings => {
			expect( meetings.val() ).to.equal( null )
			// We are done, delete user
			return app.deleteUser( )
		} )

	} )

} )