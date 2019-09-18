import React from 'react'
import {Table as AntdTable} from 'antd'
import {PaginationConfig} from 'antd/lib/pagination'

// Components
import Row from './components/Row'
import Cell from './components/Cell'

interface Column {
	title: string
	dataIndex: string
	editable?: boolean
}

interface Props<T> {
	columns: Column[]
	data: T[]
	size?: 'small' | 'default' | 'middle'
	pagination?: PaginationConfig | false
	loading?: boolean
}

const Table: React.FunctionComponent<Props<any>> = ({
	columns,
	data,
	pagination,
	loading,
	size,
}) => {
	const components = {
		body: {
			row: Row,
			cell: Cell,
		},
	}

	const getRowClassName = () => 'editable-row'

	const handleSave = row => {
		const newData = [...data]
		const index = newData.findIndex(item => row.key === item.key)
		const item = newData[index]

		newData.splice(index, 1, {
			...item,
			...row,
		})

		// TODO: add functionality of editing a category
		return
	}

	const normalizeColumns = () =>
		columns.map(col => {
			if (!col.editable) {
				return col
			}

			return {
				...col,
				onCell: record => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave,
				}),
			}
		})
	return (
		<div>
			<AntdTable
				components={components}
				rowClassName={getRowClassName}
				bordered
				dataSource={data}
				columns={normalizeColumns()}
				pagination={pagination}
				size={size}
				loading={loading}
			/>
		</div>
	)
}

export default Table

Table.defaultProps = {
	pagination: false,
	size: 'small',
}
