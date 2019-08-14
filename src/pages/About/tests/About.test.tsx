import React from 'react'
import {render} from '@testing-library/react'
import About from '../index'

describe('<About/>', () => {
	it('should render About text', () => {
		// Act
		const {getByText} = render(<About />)

		// Assert
		expect(getByText('About page')).toBeInTheDocument()
	})
})
