import React from 'react'
import {useTranslation} from 'react-i18next'

const Settings = () => {
	const [t] = useTranslation('settings')

	return (
		<div>
			<h2>{t('title')}</h2>
			<h3>{t('categories.title')}</h3>
		</div>
	)
}

export default Settings
