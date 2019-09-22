import React from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {Popconfirm, Icon, Select, DatePicker} from 'antd'
import Item, {ItemInput} from '../../../models/Item'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Table from '../../../components/Table'
import moment from 'moment'
import {DATE_FORMAT} from '../../../constant'
import {TextValue} from './style'
import {CategoryType, Category} from '../../../models/Category'
import {deleteItem, updateItem} from '../../../modules/Item'
import {TeamContext} from '../../../contexts'

interface Props {
	items: ModelState<Item[]>
	categories: Category[]
	deleteItem: (teamId: string, itemId: string) => any
	updateItem: (teamId: string, itemId: string, item: ItemInput) => any
}

const ItemTable: React.FunctionComponent<Props> = ({
	items,
	categories,
	deleteItem,
	updateItem,
}) => {
	const [t] = useTranslation(['board', 'common'])
	const team = React.useContext(TeamContext)
	const {data, status, error} = items

	const handleUpdateItem = ({
		_id,
		date,
		name,
		note,
		quantity,
		price,
		category,
	}) => {
		const updatedItem = {date, name, note, quantity, price, category}
		updateItem(team._id, _id, updatedItem)
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

	const renderValueText = (text, record) => {
		const isIncomeCategory = record.category.type === CategoryType.Income
		return <TextValue incomeColor={isIncomeCategory}>{text}</TextValue>
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

	const columns = [
		{
			title: t('date'),
			dataIndex: 'date',
			editable: true,
			render: date => moment(date).format(DATE_FORMAT),
			renderEditingCell: renderDatePicker,
			width: '15%',
		},
		{
			title: t('item'),
			dataIndex: 'name',
			editable: true,
			width: '23%',
		},
		{
			title: t('price'),
			dataIndex: 'price',
			editable: true,
			width: '8%',
			render: renderValueText,
		},
		{
			title: t('quantity'),
			dataIndex: 'quantity',
			editable: true,
			width: '8%',
			render: renderValueText,
		},
		{
			title: t('total'),
			dataIndex: 'total',
			width: '8%',
			render: renderValueText,
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

	const renderContent = () => {
		if (status === 'error') {
			return <ErrorText>{error}</ErrorText>
		}

		return (
			<Table
				alternativeColor={true}
				columns={columns}
				data={data}
				loading={status === 'fetching'}
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
