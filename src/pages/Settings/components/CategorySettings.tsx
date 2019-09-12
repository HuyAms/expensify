/**
 * Categories settings component
 *  - Show categories tables for each type
 *  - Allow users to edit name and description of each category
 *
 */

import React from 'react'
import {useTranslation} from 'react-i18next'

// Components
import Table from '../../../components/Table'

// Styled components
import {Item, CategoryLabel} from '../style'

// Interfaces
import {Category, CategoryType} from '../../../models/Category'
import {RequestStatus} from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Spinner from '../../../components/Spinner'

interface Props {
	data: Category[]
	status: RequestStatus
	error: string
}

interface ExpenseRow extends Category {
	key: string
}

const CategorySettings: React.FunctionComponent<Props> = ({
	data,
	status,
	error,
}) => {
	const [t] = useTranslation('settings')

	const getTableColumns = () => [
		{
			title: t('categories.table.heading.name'),
			dataIndex: 'name',
			width: '30%',
			editable: true,
		},
		{
			title: t('categories.table.heading.description'),
			dataIndex: 'description',
			editable: true,
		},
	]

	const sortCategoriesByType = () => {
		const expenseCategories: ExpenseRow[] = []
		const incomeCategories: ExpenseRow[] = []

		data.forEach(category => {
			switch (category.type) {
				case CategoryType.Expense:
					expenseCategories.push({
						...category,
						key: category._id,
					})
					break
				case CategoryType.Income:
					incomeCategories.push({
						...category,
						key: category._id,
					})
					break
				default:
					return
			}
		})

		return [expenseCategories, incomeCategories]
	}

	const renderCategoryItem = (data, label) => (
		<Item>
			<CategoryLabel>{label}</CategoryLabel>
			<Table columns={getTableColumns()} data={data} />
		</Item>
	)

	const renderCategoryTables = () => {
		const [expenseCategories, incomeCategories] = sortCategoriesByType()
		return (
			<>
				{renderCategoryItem(expenseCategories, t('categories.expenseLabel'))}
				{renderCategoryItem(incomeCategories, t('categories.incomeLabel'))}
			</>
		)
	}

	const renderContent = () => {
		switch (status) {
			case 'error':
				return <ErrorText>{error}</ErrorText>
			case 'fetching':
				return <Spinner />
			case 'success':
				return renderCategoryTables()
			default:
				return null
		}
	}

	return (
		<>
			<h2>{t('categories.title')}</h2>
			{renderContent()}
		</>
	)
}

export default CategorySettings
