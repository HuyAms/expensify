import React from 'react'
import {render} from '../../../../utils/testUtils'
import SignUp from '../index'

describe('<SignIn/>', () => {
	it('should render SignIn form', () => {
		// Act
		const {getByPlaceholderText, getByText} = render(<SignUp />)

		// Assert
		expect(getByPlaceholderText('firstName')).toBeInTheDocument()
		expect(getByPlaceholderText('lastName')).toBeInTheDocument()
		expect(getByPlaceholderText('email')).toBeInTheDocument()
		expect(getByPlaceholderText('password')).toBeInTheDocument()
		expect(getByPlaceholderText('confirmPassword')).toBeInTheDocument()
		expect(getByText('signUp')).toBeInTheDocument()
	})
})
