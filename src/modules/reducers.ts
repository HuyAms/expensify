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
import {TeamsState, teamsReducer} from './Teams'

export interface RootState {
	authenticatedUser: AuthenticatedUserState
	app: AppState
	auth: AuthState
	teams: TeamsState
	router: RouterState
}

const rootReducer = (history: History) =>
	combineReducers<RootState>({
		authenticatedUser: authenticatedReducer,
		app: appReducer,
		auth: authReducer,
		teams: teamsReducer,
		router: connectRouter(history),
	})

export default rootReducer
