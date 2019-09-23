import React from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {Popconfirm, Icon, Input, Select, DatePicker} from 'antd'
import Item, {ItemInput} from '../../../models/Item'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Table from '../../../components/Table'
import moment from 'moment'
import {DATE_FORMAT} from '../../../constant'
import {TextValue} from './style'
import {CategoryType, Category} from '../../../models/Category'
import {Sort} from '../../../models/Sort'
import {GetItemQuery} from '../../../modules/Items'
import {deleteItem, updateItem} from '../../../modules/Item'
import {TeamContext} from '../../../contexts'

interface Props {
	items: ModelState<Item[]>
	categories: Category[]
	deleteItem: (teamId: string, itemId: string) => any
	updateItem: (teamId: string, itemId: string, item: ItemInput) => any
	updateQuery: (query: GetItemQuery) => void
	query: GetItemQuery
}

const ItemTable: React.FunctionComponent<Props> = ({
	items,
	updateQuery,
	query,
	categories,
	deleteItem,
	updateItem,
}) => {
	const [t] = useTranslation(['board', 'common'])
	const team = React.useContext(TeamContext)
	const {data, status, error} = items

	const getSortOrder = (sortedField: string) => {
		if (!query) {
			return
		}

		const {sort, field} = query

		const sortState = sort === Sort.asc ? 'ascend' : 'descend'
		return field === sortedField ? sortState : null
	}

	const onSearchChange = e => {
		updateQuery({...query, search: e.target.value})
	}

	const getColumnSearchProps = dataIndex => ({
		filterDropdown: () => (
			<div style={{padding: 8}}>
				<Input
					allowClear={true}
					placeholder={`Search ${dataIndex}`}
					value={query && query.search}
					onChange={onSearchChange}
				/>
			</div>
		),
		filterIcon: () => <Icon type="search" />,
	})

	const normalizedData = data && data.map(item => ({...item, key: item._id}))

	const handleUpdateItem = item => {
		updateItem(team._id, item._id, item)
	}

	const handleUpdateCategory = (categoryId, record) => {
		handleUpdateItem({
			...record,
			category: categoryId,
		})
	}

	const handleUpdateDate = (date, record) => {
		handleUpdateItem({
			...record,
			date: date.toDate(),
		})
	}

	const renderDatePicker = record => {
		const onChange = date => handleUpdateDate(date, record)
		return <DatePicker value={moment(record.date)} onChange={onChange} />
	}

	const renderCategoryOptions = () => {
		return categories.map(category => (
			<Select.Option key={category._id} value={category._id}>
				{category.name}
			</Select.Option>
		))
	}

	const renderCategorySelect = record => {
		const defaultValue = record.category._id
		const onChange = categoryId => handleUpdateCategory(categoryId, record)
		return (
			<Select
				style={{minWidth: '20rem'}}
				value={defaultValue}
				onChange={onChange}
			>
				{renderCategoryOptions()}
			</Select>
		)
	}

	const renderValueText = (text, record) => {
		const isIncomeCategory =
			record.category && record.category.type === CategoryType.Income
		return <TextValue incomeColor={isIncomeCategory}>{text}</TextValue>
	}

	const columns = [
		{
			title: t('date'),
			dataIndex: 'date',
			editable: true,
			render: date => moment(date).format(DATE_FORMAT),
			sorter: true,
			sortOrder: getSortOrder('date'),
			renderEditingCell: renderDatePicker,
			width: '15%',
		},
		{
			title: t('item'),
			dataIndex: 'name',
			editable: true,
			width: '27%',
			...getColumnSearchProps('name'),
		},
		{
			title: t('price'),
			dataIndex: 'price',
			editable: true,
			width: '8%',
			render: renderValueText,
			sorter: true,
			sortOrder: getSortOrder('price'),
		},
		{
			title: t('quantity'),
			dataIndex: 'quantity',
			editable: true,
			width: '8%',
			render: renderValueText,
			sorter: true,
			sortOrder: getSortOrder('quantity'),
		},
		{
			title: t('total'),
			dataIndex: 'total',
			width: '8%',
			render: renderValueText,
			sorter: true,
			sortOrder: getSortOrder('total'),
		},
		{
			title: t('category'),
			dataIndex: 'category.name',
			editable: true,
			width: '19%',
			renderEditingCell: renderCategorySelect,
		},
		{
			title: t('note'),
			dataIndex: 'note',
			editable: true,
			required: false,
			width: '15%',
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (text, record: Item) => {
				const onItemDelete = () => deleteItem(team._id, record._id)
				return (
					<Popconfirm title={t('deleteConfirmation')} onConfirm={onItemDelete}>
						<Icon type="delete" theme="twoTone" twoToneColor="red" />
					</Popconfirm>
				)
			},
		},
	]

	const onChange = (_, __, sorter) => {
		const {field, order} = sorter
		const sort = order === 'ascend' ? Sort.asc : Sort.desc
		updateQuery({...query, sort, field})
	}

	const renderContent = () => {
		if (status === 'error') {
			return <ErrorText>{error}</ErrorText>
		}

		return (
			<Table
				alternativeColor={true}
				loading={status === 'fetching'}
				onChange={onChange}
				columns={columns}
				data={normalizedData}
				handleUpdateData={handleUpdateItem}
			/>
		)
	}

	return <>{renderContent()}</>
}

const mapDispatchToProps = {
	deleteItem,
	updateItem,
}

export default connect(
	null,
	mapDispatchToProps,
)(ItemTable)
