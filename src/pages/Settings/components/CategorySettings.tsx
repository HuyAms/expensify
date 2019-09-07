/**
 * Categories settings component
 *  - Show categories tables for each type
 *  - Allow users to edit name and description of each category
 *
 */

import React from 'react'
import {useTranslation} from 'react-i18next'

// Components
import NotFound from '../../../pages/NotFound'
import LoadingPage from '../../../components/LoadingPage'
import Table from '../../../components/Table'

// Interfaces
import {Category, CategoryType} from '../../../models/Category'
import {RequestStatus} from '../../../models/bases/ModelState'

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

	const renderCategoryTables = () => {
		const [expenseCategories, incomeCategories] = sortCategoriesByType()
		return (
			<>
				<h4>{t('categories.expenseLabel')}</h4>
				<Table columns={getTableColumns()} data={expenseCategories} />
				<h4>{t('categories.incomeLabel')}</h4>
				<Table columns={getTableColumns()} data={incomeCategories} />
			</>
		)
	}

	const renderContent = () => {
		switch (status) {
			case 'error':
				return <NotFound error={error} />
			case 'fetching':
				return <LoadingPage />
			case 'success':
				return renderCategoryTables()
			default:
				return null
		}
	}

	return (
		<>
			<h3>{t('categories.title')}</h3>
			{renderContent()}
		</>
	)
}

export default CategorySettings
