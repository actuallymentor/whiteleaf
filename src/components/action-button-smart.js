// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Redux connector
import { connect } from 'react-redux'

// Grab revevant actions
import contacts from '../redux/actions-contacts'

const Button = ( { addContact, addMeeting, user } ) => {
	if ( !user ) return false
	return  <div className = 'actioncontainer'>
				<div id = 'mainaction' className = 'actionbtn ripple'>
					<span className = 'icon' > + </span>
				</div>
				<div onClick = { addContact } className = 'intentbtn'>
					<span className = 'icon ripple' > f </span>
					<span className = 'actionlabel'> add a friend </span>
				</div>
				<div onClick = { addMeeting } className = 'intentbtn'>
					<span className = 'icon ripple' > m </span>
					<span className = 'actionlabel'> record a meeting </span>
				</div>
			</div> 
 }

const AddContact = ( { adding, clearModals } ) => { 
	if ( !adding ) return false
	return <div className = 'backdrop' onClick = { clearModals } >
				<div onClick = { e => e.stopPropagation() } className = 'modal col l6 m12 s12'>
					<form className = "modalform row nomar">
						<div className="input col l6 m6 s12">
							<div className="label">Who are we adding?</div>
							<input className="col s12 m12 l12" name="name" type="text" placeholder="Tony Stark" required/>
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Why are they awesome?</div>
							<input className="col s12 m12 l12" name="bio" type="text" placeholder="They said we are friends once, I like that." />
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Carrier pidgeon address?</div>
							<input className="col s12 m12 l12" name="email" type="email" placeholder="best@friend.evs" />
						</div>
						<div className="input col l6 m6 s12">
							<div className="label">Stalk them every how many days?</div>
							<input className="col s12 m12 l12" name="frequency" type="number" placeholder="Over 9000" required />
						</div>
						<input type="submit" value="save" className="col l2 offset-l5 m4 offset-m4 s12" />
					</form>
				</div>
		   </div>
 }

const AddMeeting = ( { adding, clearModals } ) => { 
	if ( !adding ) return false
	return <div className = 'backdrop' onClick = { clearModals } >
				<div>Add a new meeting</div>
		   </div>
 }

class ActionButton extends React.Component { 

	constructor( props ) { 
		super( props )
		this.state = { 
			addingContact: false,
			addingMeeting: false
		 }
		 this.toggleAddContact = this.toggleAddContact.bind( this )
		 this.toggleAddMeeting = this.toggleAddMeeting.bind( this )
		 this.clearModals = this.clearModals.bind( this )
	}

	toggleAddContact(  ) { 
		this.setState( { ...this.state, addingContact: this.state.addingContact ? false : true } )
	}

	toggleAddMeeting(  ) { 
		this.setState( { ...this.state, addingMeeting: this.state.addingMeeting ? false : true } )
	}

	clearModals(  ) { 
		this.setState( { ...this.state, addingContact: false, addingMeeting: false } )
	 }


	 render( ) { 
	 	const { user } = this.props
	 	return <div>
	 				<Button addContact = { this.toggleAddContact } addMeeting = { this.toggleAddMeeting } user = { user } />
	 				<AddContact adding = { this.state.addingContact } clearModals = { this.clearModals } />
	 				<AddMeeting adding = { this.state.addingMeeting } clearModals = { this.clearModals } />
	 		   </div>
	 }
}

export default connect( store => ( { 
	user: store.user ? true : false
 } ) )( ActionButton )