/**
 * Categories settings component
 *  - Show categories tables for each type
 *  - Allow users to add a new category
 *  - Allow users to edit name and description of each category
 *
 */

import React, {useState, useRef} from 'react'
import {useTranslation} from 'react-i18next'

// Components
import Table from '../../../components/Table'
import {Card, Button} from 'antd'

// Styled components
import {CategoryTableWrapper, CategoryLabel, CategoryTitle} from '../style'

// Interfaces
import {Category, CategoryType} from '../../../models/Category'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import CreateCategoryForm from './CreateCategoryForm'

interface Props {
	categories: ModelState<Category[]>
}

interface ExpenseRow extends Category {
	key: string
}

const CategorySettings: React.FunctionComponent<Props> = ({categories}) => {
	const [t] = useTranslation(['settings', 'common'])
	const [shownModalName, setShownModalName] = useState(null)
	const createFormRef = useRef(null)
	const {data, status, error} = categories

	const getTableColumns = (type: CategoryType) => [
		{
			title:
				type === CategoryType.Expense
					? t('categories.expenseLabel')
					: t('categories.incomeLabel'),
			dataIndex: 'name',
			width: '30%',
			editable: true,
		},
		{
			title: t('categories.description'),
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

	const renderCategoryTable = (data: Category[], type: CategoryType) => (
		<CategoryTableWrapper>
			<Table columns={getTableColumns(type)} data={data} />
		</CategoryTableWrapper>
	)

	const renderCategoryTables = () => {
		const [expenseCategories, incomeCategories] = sortCategoriesByType()
		return (
			<>
				{renderCategoryTable(expenseCategories, CategoryType.Expense)}
				{renderCategoryTable(incomeCategories, CategoryType.Income)}
			</>
		)
	}

	const renderContent = () => {
		switch (status) {
			case 'error':
				return <ErrorText>{error}</ErrorText>
			case 'success':
				return renderCategoryTables()
			default:
				return null
		}
	}

	const handleCreateCategory = type => {
		const form = createFormRef.current.form
		form.validateFields((err, values) => {
			if (err) {
				return
			}

			// TODO: handle values submission here
		})
	}

	const getCreateFormTitle = () => {
		switch (shownModalName) {
			case CategoryType.Expense:
				return t('categories.createNew.expense.title')
			case CategoryType.Income:
				return t('categories.createNew.income.title')
			default:
				return ''
		}
	}
	const renderCreateForm = () => {
		const title = getCreateFormTitle()
		return (
			<CreateCategoryForm
				visible={shownModalName ? true : false}
				title={title}
				wrappedComponentRef={createFormRef}
				type={shownModalName}
				loading={false}
				handleSubmit={handleCreateCategory}
				handleCancel={() => setShownModalName(null)}
			/>
		)
	}

	const renderTitle = () => (
		<div className="category-title">
			<h2>{t('categories.title')}</h2>
			<Button type="primary">{t('button.addNew')}</Button>
		</div>
	)

	return (
		<Card title={renderTitle()}>
			{renderContent()}
			{renderCreateForm()}
		</Card>
	)
}

export default CategorySettings
