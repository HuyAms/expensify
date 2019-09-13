/**
 * Create category form component
 *  - allow users to create a new category
 *  - reusable for both expense and income category
 *
 */
import React from 'react'
import {useTranslation} from 'react-i18next'

// Components
import {Form, Input, Modal} from 'antd'
import {FormComponentProps} from 'antd/es/form'

interface Props extends FormComponentProps {
	form: any
	visible: boolean
	loading: boolean
	title: string
	type: string
	handleSubmit: (type: string) => void
	handleCancel: () => void
}

const CreateCategoryForm: React.FunctionComponent<Props> = React.forwardRef(
	(props, ref) => {
		const [t] = useTranslation(['common'])
		const {
			visible,
			loading,
			title,
			type,
			handleSubmit,
			handleCancel,
			form,
		} = props
		const {getFieldDecorator} = form
		React.useImperativeHandle(ref, () => ({
			form,
		}))

		const renderNameInput = () => {
			return getFieldDecorator('name', {
				rules: [{required: true, message: t('error.missingCategoryName')}],
			})(<Input />)
		}

		const renderDescriptionInput = () => {
			return getFieldDecorator('description')(<Input />)
		}

		return (
			<Modal
				visible={visible}
				title={title}
				okText={t('button.create')}
				cancelText={t('button.cancel')}
				onOk={() => handleSubmit(type)}
				onCancel={handleCancel}
				confirmLoading={loading}
			>
				<Form layout="vertical">
					<Form.Item label={t('label.name')}>{renderNameInput()}</Form.Item>
					<Form.Item label={t('label.description')}>
						{renderDescriptionInput()}
					</Form.Item>
				</Form>
			</Modal>
		)
	},
)

export default Form.create<Props>()(CreateCategoryForm)
