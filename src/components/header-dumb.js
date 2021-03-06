// Import react
import React from 'react'
import PropTypes from 'prop-types'

// Define a menu rendering component that takes props
export const PanelView = ( { children, visible, toggle } ) => {
	// Fill the <nav><ul> element with the above <li>'s
	return (
		<span>
			<button id = "menu-btn"
					onClick = { toggle }
					className = { "hamburger hamburger--squeeze " +  ( visible ? "is-active" : "" )  }
					type = "button">
  				<span className = "hamburger-box">
			    <span className = "hamburger-inner"></span>
			  </span>
			</button>
			<nav className = { visible ? 'full absolute-show' : 'full absolute-out-right' } >
				<h3 className = "depth" id = "menutitle" >Menu</h3>
				{ /* Children is the MenuView */ }
				{ children }
			</nav>
		</span>
	)
}

PanelView.propTypes = {
	children: PropTypes.object,
	visible: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired
}

// Menu items
export const MenuView = ( { links } )  =>  {
	// Generate menu list from items array
	let menuitems = links.map ( ( item, index ) => {
		return (
			<a className = "depth menuitem" key = { index } href = { item.link }  >
				<li> {item.name} </li>
			</a>
		)
	} )
	return (
		<ul>
			{menuitems}
		</ul>
	)
}

MenuView.propTypes = {
	links: PropTypes.array
}