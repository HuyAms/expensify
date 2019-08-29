import React from 'react'
import {Table} from 'antd'

// Components
import Row from './components/Row'
import Cell from './components/Cell'

interface Column {
	title: string
	dataIndex: string
	editable?: boolean
}

interface Props {
	columns: Column[]
	data: []
}

const CustomTable: React.FunctionComponent<Props> = ({columns, data}) => {
	const components = {
		body: {
			row: Row,
			cell: Cell,
		},
	}

	return (
		<div>
			<Table
				components={components}
				bordered
				dataSource={dataSource}
				columns={columns}
			/>
		</div>
	)
}

export default CustomTable
