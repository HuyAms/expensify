import React from 'react'
import {useTranslation} from 'react-i18next'

const Home = () => {
	const [t] = useTranslation()

	return (
		<div data-testid="home-page">
			<h2>{t('appName')}</h2>
		</div>
	)
}

export default Home
