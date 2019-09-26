import React, {useState, useContext} from 'react'
import {Form, Input} from 'antd'
import {EditableContext} from '../../../contexts'

interface Props {
	editable: boolean
	required: boolean
	restProps?: object
	children?: any
	dataIndex: number
	record: []
	title: string
	handleSave: (object) => any
	renderEditingCell?: (arg) => any
}

const Cell: React.FunctionComponent<Props> = ({
	editable,
	restProps,
	required,
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
			(renderEditingCell &&
				renderEditingCell({
					record,
					handleInputSave,
					dataIndex,
					required,
					title,
					toggleEdit,
					form,
				})) || (
				<Form.Item>
					{form.getFieldDecorator(dataIndex, {
						rules: [
							{
								required,
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
		return (
			<div onClick={toggleEdit} style={{minHeight: 16}}>
				{children}
			</div>
		)
	}

	const renderCell = () => (editing ? renderEditing() : renderChilren())

	return (
		<td style={{textAlign: 'center'}} {...restProps}>
			{editable ? renderCell() : children}
		</td>
	)
}

Cell.defaultProps = {
	required: true,
}

export default Cell
