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
	renderEditingCell?: (arg: object) => any
}

const Cell: React.FunctionComponent<Props> = ({
	editable,
	restProps,
	children,
	dataIndex,
	record,
	title,
	handleSave,
	renderEditingCell,
}) => {
	const [editing, setEditing] = useState(false)
	const form = useContext(EditableContext)

	const toggleEdit = () => setEditing(editing => !editing)

	const handleInputSave = e => {
		form.validateFields((error, values) => {
			if (error && error[e.currentTarget.id]) {
				return
			}
			toggleEdit()

			if (record[dataIndex] === values[dataIndex]) {
				return
			}

			handleSave({...record, ...values})
		})
	}

	const renderEditing = () => {
		return (
			(renderEditingCell && renderEditingCell(record)) || (
				<Form.Item>
					{form.getFieldDecorator(dataIndex, {
						rules: [
							{
								required: true,
								message: `${title} is required.`,
							},
						],
						initialValue: record[dataIndex],
					})(
						<Input
							onPressEnter={handleInputSave}
							onBlur={handleInputSave}
							autoFocus={true}
						/>,
					)}
				</Form.Item>
			)
		)
	}

	const renderChilren = () => {
		return <div onClick={toggleEdit}>{children}</div>
	}

	const renderCell = () => (editing ? renderEditing() : renderChilren())

	return (
		<td style={{textAlign: 'center'}} {...restProps}>
			{editable ? renderCell() : children}
		</td>
	)
}

export default Cell
