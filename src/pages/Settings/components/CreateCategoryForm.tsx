/**
 * Create category form component
 *  - allow users to create a new category
 *  - reusable for both expense and income category
 *
 */
import React from 'react'
import {useTranslation} from 'react-i18next'

// Components
import {Form, Input, Modal, Checkbox} from 'antd'
import {FormComponentProps} from 'antd/es/form'

// Utils
import {enumToValues} from '../../../utils/utils'
import {CategoryType} from '../../../models/Category'

interface Props extends FormComponentProps {
	form: any
	visible: boolean
	loading: boolean
	title: string
	handleSubmit: () => void
	handleCancel: () => void
}

const CreateCategoryForm: React.FunctionComponent<Props> = React.forwardRef(
	(props, ref) => {
		const [t] = useTranslation(['settings', 'common'])
		const {visible, loading, title, handleSubmit, handleCancel, form} = props
		const {getFieldDecorator, setFieldsValue} = form

		React.useImperativeHandle(ref, () => ({
			form,
		}))

		const toggleCheckbox = e => {
			if (e.target.name === CategoryType.Expense) {
				return setFieldsValue({
					[CategoryType.Expense]: true,
					[CategoryType.Income]: false,
				})
			}

			setFieldsValue({
				[CategoryType.Expense]: false,
				[CategoryType.Income]: true,
			})
		}

		const renderCategoryTypes = () =>
			enumToValues(CategoryType).map(type => (
				<Form.Item key={type}>
					{getFieldDecorator(type, {
						rules: [{type: 'boolean'}],
						initialValue: type === CategoryType.Expense ? true : false,
						valuePropName: 'checked',
					})(
						<Checkbox name={type} onChange={toggleCheckbox}>
							{type === CategoryType.Expense
								? t('categories.expenseLabel')
								: t('categories.incomeLabel')}
						</Checkbox>,
					)}
				</Form.Item>
			))

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
					{renderCategoryTypes()}
					<Form.Item label={t('categories.name')}>
						{renderNameInput()}
					</Form.Item>
					<Form.Item label={t('categories.description')}>
						{renderDescriptionInput()}
					</Form.Item>
				</Form>
			</Modal>
		)
	},
)

export default Form.create<Props>()(CreateCategoryForm)
