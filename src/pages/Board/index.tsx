import React from 'react'
import {Select} from 'antd'
import {connect} from 'react-redux'
import CreateItemForm from './component/CreateItemForm'
import {
	cancelGetItems,
	getItems,
	GetItemQuery,
	loadMoreItems,
} from '../../modules/Items'
import Item, {ItemInput} from '../../models/Item'
import ModelState from '../../models/bases/ModelState'
import {TeamContext} from '../../contexts'
import {getCategories, cancelGetCategories} from '../../modules/Categories'
import {Category, CategoryType} from '../../models/Category'
import {
	useModuleNotification,
	usePrevious,
	useQueryParams,
} from '../../utils/hooks'
import {enumToValues} from '../../utils/utils'
import {useTranslation} from 'react-i18next'
import {createItem, deleteItem, updateItem} from '../../modules/Item'
import ItemTable from './component/ItemTable'
import {CreateItemCard} from './style'
import {PaginationContext} from '../../modules/Pagination'
import Pagination from '../../models/Pagination'

const {Option} = Select

interface Props {
	getItems: (teamId: string, options?: GetItemQuery) => any
	loadMoreItems: (teamId: string, options?: GetItemQuery) => any
	getCategories: (teamId: string, type?: CategoryType) => any
	cancelGetItems: () => any
	cancelGetCategories: () => any
	itemsPagination: Pagination
	items: ModelState<Item[]>
	item: ModelState<Item>
	categories: ModelState<Category[]>
	createItem: (teamId: string, item: Item) => any
	push: (path: string) => any
	deleteItem: (teamId: string, itemId: string) => any
	updateItem: (teamId: string, itemId: string, item: ItemInput) => any
}

const Board: React.FunctionComponent<Props> = props => {
	const {
		getItems,
		loadMoreItems,
		cancelGetItems,
		getCategories,
		cancelGetCategories,
		item,
		categories,
		createItem,
		items,
		itemsPagination,
		deleteItem,
		updateItem,
	} = props

	const [selectedCategoryType, setSelectedCategoryType] = React.useState(
		CategoryType.Expense,
	)
	const team = React.useContext(TeamContext)
	const [t] = useTranslation(['board', 'common'])
	const [query, updateQuery] = useQueryParams(null)

	React.useEffect(() => {
		getCategories(team._id)
		return () => {
			cancelGetCategories()
		}
	}, [])

	// getItems when query changed
	React.useEffect(() => {
		if (!query) {
			return
		}

		const {sort, field, search} = query
		getItems(team._id, {sort, field, search})

		return () => {
			cancelGetItems()
		}
	}, [query])

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

	const handleDeleteItem = (itemId: string) => {
		deleteItem(team._id, itemId)
	}

	const handleUpdateItem = (itemId: string, itemUpdate: ItemInput) => {
		updateItem(team._id, itemId, itemUpdate)
	}

	const handleLoadMoreItems = () => {
		loadMoreItems(team._id, query)
	}

	return (
		<div>
			<CreateItemCard
				title="Create Item"
				size="small"
				extra={renderSelectCategoryType()}
			>
				<CreateItemForm
					isCategoryLoading={categories.status === 'fetching'}
					isItemSaving={item.status === 'saving'}
					onSubmit={handleCreateItem}
					categories={getAvailableCategories()}
				/>
			</CreateItemCard>
			<ItemTable
				items={items}
				query={query}
				onLoadMore={handleLoadMoreItems}
				itemsPagination={itemsPagination}
				updateQuery={updateQuery}
				categories={categories.data}
				onItemDelete={handleDeleteItem}
				onItemUpdate={handleUpdateItem}
			/>
		</div>
	)
}

const mapStateToProps = ({item, items, categories, pagination}) => {
	const itemsPagination = pagination[PaginationContext.items]

	return {
		items,
		item,
		categories,
		itemsPagination,
	}
}

const mapDispatchToProps = {
	getItems,
	cancelGetItems,
	getCategories,
	cancelGetCategories,
	createItem,
	deleteItem,
	updateItem,
	loadMoreItems,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Board)
