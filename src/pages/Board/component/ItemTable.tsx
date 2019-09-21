import React from 'react'
import {connect} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {Popconfirm, Icon} from 'antd'
import Item, {ItemInput} from '../../../models/Item'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Table from '../../../components/Table'
import moment from 'moment'
import {DATE_FORMAT} from '../../../constant'
import {TextValue} from './style'
import {CategoryType} from '../../../models/Category'
import {deleteItem, updateItem} from '../../../modules/Item'
import {TeamContext} from '../../../contexts'

interface Props {
	items: ModelState<Item[]>
	deleteItem: (teamId: string, itemId: string) => any
	updateItem: (teamId: string, itemId: string, item: ItemInput) => any
}

const ItemTable: React.FunctionComponent<Props> = ({
	items,
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

	const getTableColumns = () => [
		{
			title: t('date'),
			dataIndex: 'date',
			editable: true,
			render: date => moment(date).format(DATE_FORMAT),
			width: '10%',
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
		},
		{
			title: t('note'),
			dataIndex: 'note',
			editable: true,
			width: '24%',
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

	const renderValueText = (text, record) => {
		const isIncomeCategory = record.category.type === CategoryType.Income
		return <TextValue incomeColor={isIncomeCategory}>{text}</TextValue>
	}

	const renderContent = () => {
		if (status === 'error') {
			return <ErrorText>{error}</ErrorText>
		}

		return (
			<Table
				alternativeColor={true}
				columns={getTableColumns()}
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
