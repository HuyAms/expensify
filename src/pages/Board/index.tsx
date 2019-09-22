import React, {useEffect} from 'react'
import {Select} from 'antd'
import CreateItemForm from './component/CreateItemForm'
import {cancelGetItems, getItems, GetItemQuery} from '../../modules/Items'
import {connect} from 'react-redux'
import Item from '../../models/Item'
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
import {createItem} from '../../modules/Item'
import ItemTable from './component/ItemTable'
import {CreateItemCard} from './style'
import {Sort} from '../../models/Sort'

const {Option} = Select

interface Props {
	getItems: (teamId: string, options?: GetItemQuery) => any
	getCategories: (teamId: string, type?: CategoryType) => any
	cancelGetItems: () => any
	cancelGetCategories: () => any
	items: ModelState<Item[]>
	item: ModelState<Item>
	categories: ModelState<Category[]>
	createItem: (teamId: string, item: Item) => any
	push: (path: string) => any
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
		items,
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
			<ItemTable query={query} updateQuery={updateQuery} items={items} />
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
