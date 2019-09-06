import React from 'react'
import {Button, Form, DatePicker, Input, InputNumber, Select} from 'antd'
import {useTranslation} from 'react-i18next'
import Item from '../../../models/Item'
import moment from 'moment'
import {FormComponentProps} from 'antd/es/form'
import {Category} from '../../../models/Category'

const {TextArea} = Input
const {Option} = Select

interface Props extends FormComponentProps {
	isCateogryLoading: boolean
	isItemSaving: boolean
	categories: Category[]
	onSubmit: (item: Item) => any
}

const CreateItemForm: React.FunctionComponent<Props> = props => {
	const {form, isItemSaving, onSubmit, categories, isCateogryLoading} = props
	const {getFieldDecorator, getFieldsError} = form
	const [t] = useTranslation(['board', 'common'])

	const renderNameInput = () => {
		return getFieldDecorator('name', {
			rules: [{required: true, message: t('error.missingItemName')}],
		})(<Input placeholder={t('item')} />)
	}

	const renderQuantityInput = () => {
		return getFieldDecorator('quantity', {
			rules: [{required: true, message: t('error.missingQuantity')}],
			initialValue: 1,
		})(<InputNumber precision={0} min={1} placeholder={t('quantity')} />)
	}

	const renderPriceInput = () => {
		return getFieldDecorator('price', {
			rules: [{required: true, message: t('error.missingPrice')}],
		})(
			<InputNumber precision={2} step={0.1} min={0} placeholder={t('price')} />,
		)
	}

	const renderDateInput = () => {
		return getFieldDecorator('date', {
			rules: [{required: true, message: t('error.missingDate')}],
			initialValue: moment(),
		})(<DatePicker placeholder={t('date')} />)
	}

	const renderCategoryOptions = () => {
		return categories.map(category => (
			<Option key={category._id} value={category._id}>
				{category.name}
			</Option>
		))
	}

	const renderCategoryInput = () => {
		return getFieldDecorator('category', {
			rules: [{required: true, message: 'Please select your category'}],
			initialValue: categories.length > 0 && categories[0]._id,
		})(
			<Select
				style={{minWidth: '20rem'}}
				loading={isCateogryLoading}
				placeholder="Select category"
			>
				{renderCategoryOptions()}
			</Select>,
		)
	}

	const renderNoteInput = () => {
		return getFieldDecorator('note')(
			<TextArea autosize={{minRows: 1}} placeholder={t('note')} />,
		)
	}

	const handleSubmit = e => {
		e.preventDefault()
		form.validateFields((err, item) => {
			if (!err) {
				onSubmit(item)
			}
		})
	}

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field])
	}

	return (
		<Form layout="inline" onSubmit={handleSubmit}>
			<Form.Item>{renderDateInput()}</Form.Item>
			<Form.Item>{renderNameInput()}</Form.Item>
			<Form.Item>{renderPriceInput()}</Form.Item>
			<Form.Item>{renderQuantityInput()}</Form.Item>
			<Form.Item>{renderCategoryInput()}</Form.Item>
			<Form.Item>{renderNoteInput()}</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					disabled={isItemSaving || hasErrors(getFieldsError())}
					loading={isItemSaving}
				>
					{t('button.create')}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Form.create<Props>()(CreateItemForm)
