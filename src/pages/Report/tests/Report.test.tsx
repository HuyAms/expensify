import React from 'react'
import {render} from '@testing-library/react'
import Report from '../index'

describe('<Report/>', () => {
	it('should render Report text', () => {
		// Act
		const {getByText} = render(<Report />)

		// Assert
		expect(getByText('Report page')).toBeInTheDocument()
	})
})
