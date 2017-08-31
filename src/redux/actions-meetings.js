import app from '../modules/firebase'

export const add = ( contactid, date, location, meetingnotes ) => ( { 
	type: 'ADD',
	payload: app.addMeeting( contactid, date, location, meetingnotes ).catch( e => alert( `Meeting not added. ${ e }` ) )
 } )

export const get = ( contactid ) => ( { 
	type: 'LOGIN',
	// COntact firebase and try to log in. If ann goes well, return the current user.
	payload: app
 } )