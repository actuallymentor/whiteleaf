import React from 'react'
import PropTypes from 'prop-types'

const FooterView = ( { owner } ) =>  (
		<footer>
			<div id = "copyright">
				© Copyright { new Date().getFullYear() + " " + owner }
			</div>
		</footer>
	)

FooterView.propTypes = { 
	owner: PropTypes.string.isRequired
 }

export default FooterView