import React from 'react'
import {connect} from 'react-redux'
import {Button, Form, DatePicker, Input, InputNumber} from 'antd'
import {useTranslation} from 'react-i18next'
import {createItem} from '../../../modules/Item'
import ModelState from '../../../models/bases/ModelState'
import ErrorText from '../../../components/ErrorText'
import Item from '../../../models/Item'
import moment from 'moment'

const {TextArea} = Input

interface Props {
	item: ModelState<Item>
	createItem: (item: Item) => any
	form: any
}

const CreateItemForm: React.FunctionComponent<Props> = props => {
	const {form, item, createItem} = props
	const {getFieldDecorator, getFieldsError} = form
	const [t] = useTranslation(['board', 'common'])

	const renderNameInput = () => {
		return getFieldDecorator('name', {
			rules: [{required: true, message: t('error.missingEmail')}],
		})(<Input placeholder={t('item')} />)
	}

	const renderQuantityInput = () => {
		return getFieldDecorator('quantity', {
			rules: [{required: true, message: t('error.missingEmail')}],
			initialValue: 1,
		})(<InputNumber min={1} placeholder={t('quantity')} />)
	}

	const renderPriceInput = () => {
		return getFieldDecorator('price', {
			rules: [{required: true, message: t('error.missingEmail')}],
		})(<InputNumber min={0} placeholder={t('price')} />)
	}

	const renderDateInput = () => {
		return getFieldDecorator('date', {
			rules: [{required: true, message: t('error.missingEmail')}],
			initialValue: moment(),
		})(<DatePicker placeholder={t('date')} />)
	}

	const renderNoteInput = () => {
		return getFieldDecorator('note', {
			rules: [{required: true, message: t('error.missingEmail')}],
		})(<TextArea placeholder={t('note')} />)
	}

	const handleSubmit = e => {
		e.preventDefault()
		form.validateFields((err, item) => {
			if (!err) {
				console.log('CREATE item: ', item)
			}
		})
	}

	const hasErrors = fieldsError => {
		return Object.keys(fieldsError).some(field => fieldsError[field])
	}

	const renderError = () => {
		if (item.status === 'error') {
			return <ErrorText>{t(item.error)}</ErrorText>
		}
	}

	return (
		<Form layout="inline" onSubmit={handleSubmit}>
			<Form.Item>{renderDateInput()}</Form.Item>
			<Form.Item>{renderNameInput()}</Form.Item>
			<Form.Item>{renderPriceInput()}</Form.Item>
			<Form.Item>{renderQuantityInput()}</Form.Item>
			<Form.Item>{renderNoteInput()}</Form.Item>
			{renderError()}
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					disabled={item.status === 'saving' || hasErrors(getFieldsError())}
					loading={item.status === 'saving'}
				>
					{t('button.create')}
				</Button>
			</Form.Item>
		</Form>
	)
}

const mapStateToProps = ({item}) => {
	return {
		item,
	}
}

const mapDispatchToProps = {
	createItem,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Form.create()(CreateItemForm))
