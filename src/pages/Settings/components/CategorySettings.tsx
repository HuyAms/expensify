/**
 * Categories settings component
 *  - Show categories tables for each type
 *  - Allow users to add a new category
 *  - Allow users to edit name and description of each category
 *
 */

import React, {useState, useRef, useContext, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {connect} from 'react-redux'

// Actions
import {createCategory, cancelCategoryRequest} from '../../../modules/Category'
import {getCategories} from '../../../modules/Categories'

// Components
import Table from '../../../components/Table'
import {Card, Button} from 'antd'

// Styled components
import {CategoryTableWrapper, CategoryCardTitle} from '../style'

// Interfaces
import {Category, CategoryType, CategoryInput} from '../../../models/Category'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import CreateCategoryForm from './CreateCategoryForm'

// Contexts
import {TeamContext} from '../../../contexts'

// Utils
import {usePrevious} from '../../../utils/hooks'

interface Props {
	categories: ModelState<Category[]>
	category: ModelState<Category>
	createCategory: (teamId: string, category: CategoryInput) => any
	getCategories: (teamId: string, type?: CategoryType) => any
	cancelCategoryRequest: () => any
}

interface ExpenseRow extends Category {
	key: string
}

const CategorySettings: React.FunctionComponent<Props> = ({
	categories,
	createCategory,
	category,
	getCategories,
	cancelCategoryRequest,
}) => {
	const [t] = useTranslation(['settings', 'common'])
	const [isCreateFormVisible, setCreateFormVisible] = useState(false)
	const createFormRef = useRef(null)
	const team = useContext(TeamContext)
	const {data, status, error} = categories

	const previousCategoryStatus = usePrevious(category.status)
	useEffect(() => {
		if (previousCategoryStatus === 'saving' && category.status === 'success') {
			getCategories(team._id)
			hideCreateForm()
			createFormRef.current.form.resetFields()
		}
	}, [category.status])

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

	const handleCreateCategory = () => {
		const form = createFormRef.current.form
		form.validateFields((err, values) => {
			if (err) {
				return
			}

			createCategory(team._id, values)
		})
	}

	const renderCreateForm = () => (
		<CreateCategoryForm
			visible={isCreateFormVisible}
			title={t('categories.createNewTitle')}
			wrappedComponentRef={createFormRef}
			loading={category.status === 'saving'}
			handleSubmit={handleCreateCategory}
			handleCancel={hideCreateForm}
			error={category.error}
		/>
	)

	const showCreateForm = () => setCreateFormVisible(true)

	const hideCreateForm = () => {
		if (category.status === 'saving') {
			cancelCategoryRequest()
			return
		}
		setCreateFormVisible(false)
		createFormRef.current.form.resetFields()
	}

	const renderTitle = () => (
		<CategoryCardTitle>
			<h2>{t('categories.title')}</h2>
			<Button type="primary" onClick={showCreateForm}>
				{t('button.addNew')}
			</Button>
		</CategoryCardTitle>
	)

	return (
		<Card title={renderTitle()}>
			{renderContent()}
			{renderCreateForm()}
		</Card>
	)
}

const mapStateToProps = ({category}) => ({
	category,
})

const mapDispatchToProps = {
	createCategory,
	getCategories,
	cancelCategoryRequest,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CategorySettings)
