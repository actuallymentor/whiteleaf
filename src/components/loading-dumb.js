import React from 'react'

const screen = ( { message } ) => ( 
	<div className = 'backdrop loading'>
		<div className = "loader"></div>
		<div>{ message }</div>
	</div>
)

export default screen