import React from 'react'
import {useTranslation} from 'react-i18next'
import {
	Form,
	Popconfirm,
	Icon,
	Input,
	Select,
	DatePicker,
	InputNumber,
} from 'antd'
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

interface Props {
	items: ModelState<Item[]>
	categories: Category[]
	updateQuery: (query: GetItemQuery) => void
	onItemDelete: (id: string) => void
	onItemUpdate: (id: string, itemUpdate: ItemInput) => void
	query: GetItemQuery
}

const ItemTable: React.FunctionComponent<Props> = ({
	items,
	updateQuery,
	query,
	categories,
	onItemDelete,
	onItemUpdate,
}) => {
	const [t] = useTranslation(['board', 'common'])
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
		onItemUpdate(item._id, item)
	}

	const renderDatePicker = ({
		handleInputSave,
		dataIndex,
		record,
		title,
		toggleEdit,
	}) => {
		const onChange = value => {
			toggleEdit()
			handleUpdateItem({...record, date: value})
		}

		return <DatePicker value={moment(record[dataIndex])} onChange={onChange} />
	}

	const renderQuantityInput = ({
		handleInputSave,
		dataIndex,
		record,
		required,
		title,
		form,
	}) => {
		return (
			<Form.Item>
				{form.getFieldDecorator(dataIndex, {
					rules: [
						{
							required,
							message: `${title} is required.`,
						},
					],
					initialValue: record[dataIndex],
				})(
					<InputNumber
						precision={0}
						min={1}
						onPressEnter={handleInputSave}
						onBlur={handleInputSave}
						autoFocus={true}
					/>,
				)}
			</Form.Item>
		)
	}

	const renderPriceInput = ({
		handleInputSave,
		dataIndex,
		record,
		required,
		title,
		form,
	}) => {
		return (
			<Form.Item>
				{form.getFieldDecorator(dataIndex, {
					rules: [
						{
							required,
							message: `${title} is required.`,
						},
					],
					initialValue: record[dataIndex],
				})(
					<InputNumber
						precision={0}
						step={0.1}
						min={0}
						onPressEnter={handleInputSave}
						onBlur={handleInputSave}
						autoFocus={true}
					/>,
				)}
			</Form.Item>
		)
	}

	const renderCategoryOptions = () => {
		return categories.map(category => (
			<Select.Option key={category._id} value={category._id}>
				{category.name}
			</Select.Option>
		))
	}

	const renderCategorySelect = ({dataIndex, record, toggleEdit}) => {
		const onChange = (value: string) => {
			toggleEdit()
			handleUpdateItem({...record, category: value})
		}

		return (
			<Select
				value={record[dataIndex]._id}
				style={{minWidth: '20rem'}}
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
			renderEditingCell: renderPriceInput,
		},
		{
			title: t('quantity'),
			dataIndex: 'quantity',
			editable: true,
			width: '8%',
			render: renderValueText,
			sorter: true,
			sortOrder: getSortOrder('quantity'),
			renderEditingCell: renderQuantityInput,
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
			dataIndex: 'category',
			editable: true,
			width: '19%',
			renderEditingCell: renderCategorySelect,
			render: record => record.name,
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
				const onConfirm = () => onItemDelete(record._id)
				return (
					<Popconfirm title={t('deleteConfirmation')} onConfirm={onConfirm}>
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

export default ItemTable
