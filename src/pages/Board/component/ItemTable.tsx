import React from 'react'
import {useTranslation} from 'react-i18next'
import Item from '../../../models/Item'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Table from '../../../components/Table'
import moment from 'moment'
import {DATE_FORMAT} from '../../../constant'
import {TextValue} from './style'
import {CategoryType} from '../../../models/Category'
import {Sort} from '../../../models/Sort'
import {GetItemQuery} from '../../../modules/Items'

interface Props {
	items: ModelState<Item[]>
	onTableChange: (sorter) => void
	query: GetItemQuery
}

const ItemTable: React.FunctionComponent<Props> = ({
	items,
	onTableChange,
	query,
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

	const getTableColumns = () => [
		{
			title: t('date'),
			dataIndex: 'date',
			editable: true,
			render: date => moment(date).format(DATE_FORMAT),
			width: '10%',
			sorter: true,
			sortOrder: getSortOrder('date'),
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
		},
		{
			title: t('note'),
			dataIndex: 'note',
			editable: true,
			width: '24%',
		},
	]

	const renderValueText = (text, record) => {
		const isIncomeCategory =
			record.category && record.category.type === CategoryType.Income
		return <TextValue incomeColor={isIncomeCategory}>{text}</TextValue>
	}

	const onChange = (_, __, sorter) => {
		onTableChange(sorter)
	}

	const parseItemData = () => {
		return status === 'success'
			? data.map(item => ({
					key: item._id,
					...item,
			  }))
			: []
	}

	const renderContent = () => {
		if (status === 'error') {
			return <ErrorText>{error}</ErrorText>
		}

		return (
			<Table
				alternativeColor={true}
				columns={getTableColumns()}
				data={parseItemData()}
				loading={status === 'fetching'}
				onChange={onChange}
			/>
		)
	}

	return <>{renderContent()}</>
}

export default ItemTable
