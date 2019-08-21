import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {configureStore} from '../configStore'
import {theme} from '../styles/theme'
import {ThemeProvider} from 'styled-components'

export const render = (
	ui,
	{route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
	{initialState = {}, store = configureStore(initialState)} = {},
	options = {},
) => {
	return {
		...rtlRender(
			<Provider store={store}>
				<Router history={history}>
					<React.Suspense fallback={<div data-testid="suspense">Loading</div>}>
						<ThemeProvider theme={theme}>{ui}</ThemeProvider>
					</React.Suspense>
				</Router>
			</Provider>,
			options,
		),
		history,
	}
}
