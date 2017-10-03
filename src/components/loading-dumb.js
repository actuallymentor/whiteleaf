import React from 'react'

// The loading animation ( set in css )
const screen = ( { message } ) => ( 
	<div className = 'backdrop loading'>
		<div className = "loader"></div>
		<div>{ message }</div>
	</div>
)

export default screen