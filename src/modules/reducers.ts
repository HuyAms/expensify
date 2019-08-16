/**
 * Root reducer
 *
 * @author Vinh Le <lethanhvinh95@gmail.com>
 *
 */

import {combineReducers} from 'redux'
import {History} from 'history'
import {connectRouter, RouterState} from 'connected-react-router'
import {AuthenticatedUserState, authenticatedReducer} from './AuthenticatedUser'
import {AppState, appReducer} from './App'
import {AuthState, authReducer} from './Auth'

export interface RootState {
	authenticatedUser: AuthenticatedUserState
	app: AppState
	auth: AuthState
	router: RouterState
}

const rootReducer = (history: History) =>
	combineReducers<RootState>({
		authenticatedUser: authenticatedReducer,
		app: appReducer,
		auth: authReducer,
		router: connectRouter(history),
	})

export default rootReducer
