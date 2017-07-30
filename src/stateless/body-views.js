import React from 'react'

export const SectionView = props =>  (
		<section>
			{ props.content }
		</section>
	)

export const MainView = props =>  (
		<main>
			<div className="container">
				{ props.children }
			</div>
		</main>
	)