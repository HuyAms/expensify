import React from 'react'
import {Table as AntdTable} from 'antd'
import {PaginationConfig} from 'antd/lib/pagination'
import {ColumnProps} from 'antd/es/table'

// Components
import Row from './components/Row'
import Cell from './components/Cell'

type ColumnAlign = 'left' | 'right' | 'center'
interface Column {
	title: string
	dataIndex: string
	editable?: boolean
}

interface Props<T> {
	columns: Column[]
	data: T[]
	pagination?: PaginationConfig | false
	loading?: boolean
	bordered?: boolean
}

const Table: React.FunctionComponent<Props<any>> = ({
	columns,
	data,
	pagination,
	loading,
	bordered,
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
				return {...col, align: 'center' as ColumnAlign}
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
				align: 'center' as ColumnAlign,
			}
		})
	return (
		<div>
			<AntdTable
				components={components}
				rowClassName={getRowClassName}
				bordered={bordered}
				dataSource={data}
				columns={normalizeColumns()}
				pagination={pagination}
				loading={loading}
			/>
		</div>
	)
}

export default Table

Table.defaultProps = {
	pagination: false,
	bordered: false,
}
