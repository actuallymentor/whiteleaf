import React from 'react'

const small = { 
	fontSize: '15px',
	opacity: '0.7'
 }

// A stateless login form that gets submit finctions from stateful smart-header-hero
export const LoginForm = ( { login, toggle } ) => { 

	return <form className="center" id="loginform" onSubmit = { login } >
				<input id="lemail" type="email" placeholder="email" />
				<input id="lpassword" type="password" placeholder="password" />
				<input id="lbutton" type="submit" value="Login" />
				<p style={ small } className="mouse link" onClick = { toggle } >Or click here to register...</p>
			</form>
 }

export const RegisterForm = ( { register, toggle } ) => { 
 	return <form className="center" id="registerform" onSubmit = { register } >
				<input id="remail" type="email" placeholder="email" />
				<input id="rpassword" type="password" placeholder="password" />
				<input id="rbutton" type="submit" value="Register" />
				<p style={ small } className="mouse link" onClick = { toggle } >Or click here to login...</p>
			</form>
  }