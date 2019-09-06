import React from 'react'
import {Select, Card} from 'antd'
import CreateItemForm from './component/CreateItemForm'
import {cancelGetItems, getItems} from '../../modules/Items'
import {connect} from 'react-redux'
import Item from '../../models/Item'
import ModelState from '../../models/bases/ModelState'
import {TeamContext} from '../../contexts'
import {getCategories, cancelGetCategories} from '../../modules/Categories'
import {Category, CategoryType} from '../../models/Category'
import {useModuleNotification} from '../../utils/hooks'
import {enumToValues} from '../../utils/utils'
import {useTranslation} from 'react-i18next'
import {createItem} from '../../modules/Item'

const {Option} = Select

interface Props {
	getItems: (teamId: string) => any
	getCategories: (teamId: string, type?: CategoryType) => any
	cancelGetItems: () => any
	cancelGetCategories: () => any
	items: ModelState<Item[]>
	item: ModelState<Item>
	categories: ModelState<Category[]>
	createItem: (teamId: string, item: Item) => any
}

const Board: React.FunctionComponent<Props> = props => {
	const {
		getItems,
		cancelGetItems,
		getCategories,
		cancelGetCategories,
		item,
		categories,
		createItem,
	} = props

	const [selectedCategoryType, setSelectedCategoryType] = React.useState(
		CategoryType.Expense,
	)
	const team = React.useContext(TeamContext)
	const [t] = useTranslation(['board', 'common'])

	React.useEffect(() => {
		getItems(team._id)
		getCategories(team._id)

		return () => {
			cancelGetItems()
			cancelGetCategories()
		}
	}, [])

	// Show notification after creating item
	useModuleNotification(item)

	const onSelectCategoryChange = (value: CategoryType) => {
		setSelectedCategoryType(value)
	}

	const renderSelectCategoryType = () => {
		const categoryTypes = enumToValues(CategoryType)
		return (
			<Select
				onChange={onSelectCategoryChange}
				value={selectedCategoryType}
				style={{minWidth: '15rem'}}
			>
				{categoryTypes.map(type => (
					<Option key={type} value={type}>
						{t(`categoryType.${type}`)}
					</Option>
				))}
			</Select>
		)
	}

	const getAvailableCategories = (): Category[] => {
		if (categories.status === 'success') {
			return categories.data.filter(
				category => category.type === selectedCategoryType,
			)
		}

		return []
	}

	const handleCreateItem = (item: Item) => {
		createItem(team._id, item)
	}

	return (
		<div>
			<Card title="Create Item" extra={renderSelectCategoryType()}>
				<CreateItemForm
					isCateogryLoading={categories.status === 'fetching'}
					isItemSaving={item.status === 'saving'}
					onSubmit={handleCreateItem}
					categories={getAvailableCategories()}
				/>
			</Card>
		</div>
	)
}

const mapStateToProps = ({item, items, categories}) => {
	return {
		items,
		item,
		categories,
	}
}

const mapDispatchToProps = {
	getItems,
	cancelGetItems,
	getCategories,
	cancelGetCategories,
	createItem,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Board)
