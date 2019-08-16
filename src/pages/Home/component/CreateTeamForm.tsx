import React from 'react'
import {Form, Input, Modal} from 'antd'
import {useTranslation} from 'react-i18next'
import {FormComponentProps} from 'antd/es/form'

interface Props extends FormComponentProps {
	form: any
	visible: boolean
	loading: boolean
	handleSubmit: () => void
	handeCancel: () => void
}

const CreateTeamForm: React.FunctionComponent<Props> = React.forwardRef(
	(props, ref) => {
		const [t] = useTranslation(['common', 'home'])

		const {form, visible, handleSubmit, handeCancel, loading} = props
		const {getFieldDecorator} = form

		React.useImperativeHandle(ref, () => ({
			form,
		}))

		const renderTeamNameInput = () => {
			return getFieldDecorator('name', {
				rules: [{required: true, message: t('error.missingTeamName')}],
			})(<Input />)
		}

		const renderTeamDescriptionInput = () => {
			return getFieldDecorator('description')(<Input />)
		}

		return (
			<Modal
				visible={visible}
				title={t('createNewTeam')}
				okText={t('button.create')}
				cancelText={t('button.cancel')}
				onOk={handleSubmit}
				onCancel={handeCancel}
				confirmLoading={loading}
			>
				<Form layout="vertical">
					<Form.Item label={t('teamName')}>{renderTeamNameInput()}</Form.Item>
					<Form.Item label={t('teamDescription')}>
						{renderTeamDescriptionInput()}
					</Form.Item>
				</Form>
			</Modal>
		)
	},
)

export default Form.create<Props>()(CreateTeamForm)
