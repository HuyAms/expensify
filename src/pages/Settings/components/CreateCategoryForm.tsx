/**
 * Create category form component
 *  - allow users to create a new category
 *  - reusable for both expense and income category
 *
 */
import React, {useState} from 'react'
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
		const [t] = useTranslation(['common', 'settings'])
		const [isExpense, setExpense] = useState(true)
		const [isIncome, setIncome] = useState(false)

		const {visible, loading, title, handleSubmit, handleCancel, form} = props
		const {getFieldDecorator} = form

		React.useImperativeHandle(ref, () => ({
			form,
		}))

		const toggleCheckbox = e => {
			const {name, checked} = e.target
			if (name === CategoryType.Expense) {
				setExpense(checked)
				if (isIncome) {
					setIncome(false)
				}
				return
			}

			setIncome(checked)
			if (isExpense) {
				setExpense(false)
			}
		}

		const renderCategoryTypes = () =>
			enumToValues(CategoryType).map(type =>
				getFieldDecorator(type, {
					rules: [{type: 'boolean', required: true}],
				})(
					<Checkbox
						key={type}
						name={type}
						checked={type === CategoryType.Expense ? isExpense : isIncome}
						onChange={toggleCheckbox}
					>
						{type === CategoryType.Expense
							? t('categories.expenseLabel')
							: t('categories.incomeLabel')}
					</Checkbox>,
				),
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
				<Form layout="vertical">
					<Form.Item>{renderCategoryTypes()}</Form.Item>
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
