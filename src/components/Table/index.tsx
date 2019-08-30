import React from 'react'
import {Table as AntdTable} from 'antd'

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
}

const Table: React.FunctionComponent<Props<any>> = ({columns, data}) => {
	const components = {
		body: {
			row: Row,
			cell: Cell,
		},
	}

	const handleSave = row => {
		let newData = [...data]
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
				rowClassName={() => 'editable-row'}
				bordered
				dataSource={data}
				columns={normalizeColumns()}
			/>
		</div>
	)
}

export default Table
