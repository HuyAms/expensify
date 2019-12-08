/**
 * Create category form component
 *  - allow users to create a new category
 *  - reusable for both expense and income category
 *
 */
import React from 'react'
import {useTranslation} from 'react-i18next'

// Components
import {Form, Input, Modal, Radio} from 'antd'
import {FormComponentProps} from 'antd/es/form'
import ErrorText from '../../../components/ErrorText'

// Utils
import {enumToValues} from '../../../utils/utils'
import {CategoryType} from '../../../models/Category'

interface Props extends FormComponentProps {
	form: any
	visible: boolean
	loading: boolean
	title: string
	error: string
	handleSubmit: () => void
	handleCancel: () => void
}

const CreateCategoryForm: React.FunctionComponent<Props> = React.forwardRef(
	(props, ref) => {
		const [t] = useTranslation(['settings', 'common'])
		const {
			visible,
			loading,
			title,
			error,
			handleSubmit,
			handleCancel,
			form,
		} = props
		const {getFieldDecorator} = form

		React.useImperativeHandle(ref, () => ({
			form,
		}))

		const renderCategoryTypes = () =>
			getFieldDecorator('type', {
				rules: [{required: true}],
				initialValue: CategoryType.Expense,
			})(
				<Radio.Group>
					{enumToValues(CategoryType).map(type => (
						<Radio key={type} value={type}>
							{type === CategoryType.Expense
								? t('categories.expenseLabel')
								: t('categories.incomeLabel')}
						</Radio>
					))}
				</Radio.Group>,
			)

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
				onOk={handleSubmit}
				onCancel={handleCancel}
				confirmLoading={loading}
			>
				<Form layout="vertical" onSubmit={handleSubmit}>
					<Form.Item>{renderCategoryTypes()}</Form.Item>
					<Form.Item label={t('categories.name')}>
						{renderNameInput()}
					</Form.Item>
					<Form.Item label={t('categories.description')}>
						{renderDescriptionInput()}
					</Form.Item>
				</Form>
				<ErrorText>{t(error)}</ErrorText>
			</Modal>
		)
	},
)

export default Form.create<Props>()(CreateCategoryForm)
