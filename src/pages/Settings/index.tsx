import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'

// Components
import CategorySettings from './components/CategorySettings'

// Context
import {TeamContext} from '../../contexts'

// Interface
import {CategoryType, Category} from '../../models/Category'
import ModelState from '../../models/bases/ModelState'

// Actions
import {getCategories, cancelGetCategories} from '../../modules/Categories'

interface Props {
	getCategories: (teamId: string, type?: CategoryType) => any
	cancelGetCategories: () => any
	categories: ModelState<Category[]>
}

const Settings: React.FunctionComponent<Props> = ({
	getCategories,
	cancelGetCategories,
	categories,
}) => {
	const [t] = useTranslation('settings')
	const team = React.useContext(TeamContext)

	useEffect(() => {
		getCategories(team._id)
		return () => cancelGetCategories()
	}, [])

	return (
		<div>
			<h1>{t('title')}</h1>
			<CategorySettings
				data={categories.data}
				status={categories.status}
				error={categories.error}
			/>
		</div>
	)
}

const mapDispatchToProps = {
	getCategories,
	cancelGetCategories,
}

const mapStateToProps = ({categories}) => ({
	categories,
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Settings)
