import React from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

const Home = () => {
	const [t] = useTranslation()

	return (
		<div data-testid="home-page">
			<h2>{t('appName')}</h2>
			<Link to="/logout">Logout</Link>
		</div>
	)
}

export default Home
