import React, {useState, useContext} from 'react'
import {Form, Input} from 'antd'

// Context
import {EditableContext} from '../../../contexts'

interface Props {
	editable: boolean
	restProps?: object
	children?: any
	dataIndex: number
	record: []
	title: string
	handleSave: (object) => any
}

const Cell: React.FunctionComponent<Props> = ({
	editable,
	restProps,
	children,
	dataIndex,
	record,
	title,
	handleSave,
}) => {
	const [editing, setEditing] = useState(false)
	const form = useContext(EditableContext)

	const toggleEdit = () => setEditing(!editing)

	const handleInputSave = e => {
		form.validateFields((error, values) => {
			if (error && error[e.currentTarget.id]) {
				return
			}
			toggleEdit()
			handleSave({...record, ...values})
		})
	}

	const renderEditingCell = () => {
		return (
			<Form.Item>
				{form.getFieldDecorator(dataIndex, {
					rules: [
						{
							required: true,
							message: `${title} is required.`,
						},
					],
					initialValue: record[dataIndex],
				})(<Input onPressEnter={handleInputSave} onBlur={handleInputSave} />)}
			</Form.Item>
		)
	}

	const renderChilren = () => {
		return (
			<div
				className="editable-cell-value-wrap"
				style={{paddingRight: 24}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		)
	}

	const renderCell = () => (editing ? renderEditingCell() : renderChilren())

	return <td {...restProps}>{editable ? renderCell() : children}</td>
}

export default Cell
