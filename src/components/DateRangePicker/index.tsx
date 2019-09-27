import React from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'

import {DATE_FORMAT} from '../../constant'
import {Wrapper} from './style'

const {RangePicker} = DatePicker
const firstDayOfMonth = moment()
	.startOf('month')
	.toDate()
const currentDate = moment().toDate()

interface Props {
	from?: Date
	to?: Date
	onChange: (from: Date, to: Date) => any
}

const DateRangePicker: React.FunctionComponent<Props> = ({
	from,
	to,
	onChange,
}) => {
	const onRangeChange = dates => {
		const [from, to] = dates
		if (!from && !to) {
			return
		}

		onChange(from, to)
	}

	return (
		<Wrapper>
			<RangePicker
				defaultValue={[moment(from, DATE_FORMAT), moment(to, DATE_FORMAT)]}
				value={[moment(from).utc(), moment(to).utc()]}
				format={DATE_FORMAT}
				onChange={onRangeChange}
			/>
		</Wrapper>
	)
}

DateRangePicker.defaultProps = {
	from: firstDayOfMonth,
	to: currentDate,
}

export default DateRangePicker
