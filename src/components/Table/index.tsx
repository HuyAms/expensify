import React from 'react'
import classnames from 'classnames'
import {Table as AntdTable} from 'antd'
import {PaginationConfig} from 'antd/lib/pagination'

// Components
import Row from './components/Row'
import Cell from './components/Cell'
import {SorterResult, TableCurrentDataSource} from 'antd/lib/table'
import {useWindowDimensions} from '../../utils/hooks'

// Interfaces
type ColumnAlign = 'left' | 'right' | 'center'
interface Column {
	title: string
	dataIndex: string
	editable?: boolean
	required?: boolean
	renderEditingCell?: (arg) => any
}

interface Props<T> {
	columns: Column[]
	data: T[]
	size?: 'small' | 'default' | 'middle'
	pagination?: PaginationConfig | false
	loading?: boolean
	bordered?: boolean
	handleUpdateData?: (T) => any
	scroll?: {
		x?: boolean | number | string
		y?: boolean | number | string
	}
	rowClassName?: string
	alternativeColor?: boolean
	onChange?: (
		pagination: PaginationConfig,
		filters: Record<keyof T, string[]>,
		sorter: SorterResult<T>,
		extra: TableCurrentDataSource<T>,
	) => void
}

const Table: React.FunctionComponent<Props<any>> = ({
	columns,
	data,
	pagination,
	loading,
	size,
	bordered,
	handleUpdateData,
	scroll,
	alternativeColor,
	onChange,
}) => {
	const components = {
		body: {
			row: Row,
			cell: Cell,
		},
	}

	const getScroll = () => {
		const {width} = useWindowDimensions()
		const tabPortWidth = 900

		const x = width < tabPortWidth ? 900 : null

		return {x, ...scroll}
	}

	const getRowClassName = () =>
		classnames('editable-row', {'alternative-color-row': alternativeColor})

	const handleSave = row => {
		handleUpdateData(row)
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
					required: col.required,
					handleSave,
					renderEditingCell: col.renderEditingCell,
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
				size={size}
				loading={loading}
				scroll={getScroll()}
				onChange={onChange}
			/>
		</div>
	)
}

export default Table

Table.defaultProps = {
	pagination: false,
	size: 'middle',
	bordered: false,
	scroll: {y: 600},
	alternativeColor: false,
}
