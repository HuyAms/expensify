import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'

// Context
import {TeamContext} from '../../contexts'

// Interface
import {CategoryType} from '../../models/Category'

// Actions
import {getCategories, cancelGetCategories} from '../../modules/Categories'

interface Props {
	getCategories: (teamId: string, type: CategoryType) => any
	cancelGetCategories: () => any
}

const Settings: React.FunctionComponent<Props> = ({
	getCategories,
	cancelGetCategories,
}) => {
	const [t] = useTranslation('settings')
	const team = React.useContext(TeamContext)

	useEffect(() => {
		getCategories(team._id, CategoryType.Expense)
		return () => cancelGetCategories()
	}, [])

	return (
		<div>
			<h2>{t('title')}</h2>
			<h3>{t('categories.title')}</h3>
			<label>{t('categories.expenseLabel')}</label>
		</div>
	)
}

const mapDispatchToProps = {
	getCategories,
	cancelGetCategories,
}

const mapStateToProps = ({categories}) => categories

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Settings)
