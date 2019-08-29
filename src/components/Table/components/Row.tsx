import React from 'react'
import {Form} from 'antd'

// Context
import {EditableContext} from '../../../contexts'

const EditableRow = ({form, index, ...props}) => {
	return (
		<EditableContext.Provider value={form}>
			<tr {...props} />
		</EditableContext.Provider>
	)
}

const Row = Form.create()(EditableRow)

export default Row
