import React from 'react'
import 'jest-dom/extend-expect'
import {render} from '../../../utils/testUtils'
import Index from '../index'

describe('<Index/>', () => {
	it('should render Nav in Index', () => {
		// Act
		const {getByTestId} = render(<Index />)

		// Assert
		expect(getByTestId('nav-component')).toBeInTheDocument()
	})
})
