import React from 'react'
import 'jest-dom/extend-expect'
import {render} from '../../../../utils/testUtils'
import SignIn from '../index'

describe('<SignIn/>', () => {
	it('should render SignIn form', () => {
		// Act
		const {getByPlaceholderText, getByText} = render(<SignIn />)

		// Assert
		expect(getByPlaceholderText('email')).toBeInTheDocument()
		expect(getByPlaceholderText('password')).toBeInTheDocument()
		expect(getByText('signIn')).toBeInTheDocument()
	})
})
