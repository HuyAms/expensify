import React from 'react'
import {useTranslation} from 'react-i18next'
import Item from '../../../models/Item'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Table from '../../../components/Table'
import moment from 'moment'
import {DATE_FORMAT} from '../../../constant'

interface Props {
	items: ModelState<Item[]>
}

const ItemTable: React.FunctionComponent<Props> = ({items}) => {
	const [t] = useTranslation(['board', 'common'])
	const {data, status, error} = items

	const getTableColumns = () => [
		{
			title: t('date'),
			dataIndex: 'date',
			editable: true,
			render: date => moment(date).format(DATE_FORMAT),
		},
		{
			title: t('item'),
			dataIndex: 'name',
			editable: true,
		},
		{
			title: t('price'),
			dataIndex: 'price',
			editable: true,
		},
		{
			title: t('quantity'),
			dataIndex: 'quantity',
			editable: true,
		},
		{
			title: t('category'),
			dataIndex: 'category.name',
			editable: true,
		},
	]

	const renderContent = () => {
		if (status === 'error') {
			return <ErrorText>{error}</ErrorText>
		}

		return (
			<Table
				columns={getTableColumns()}
				data={data}
				loading={status === 'fetching'}
			/>
		)
	}

	return <>{renderContent()}</>
}

export default ItemTable
