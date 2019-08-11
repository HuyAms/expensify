/**
 * Root reducer
 *
 * @author Vinh Le <lethanhvinh95@gmail.com>
 *
 */

import {combineReducers} from 'redux'
import {History} from 'history'
import {connectRouter, RouterState} from 'connected-react-router'
import {UserState, userReducer} from './User'
import {AppState, appReducer} from './App'
import {AuthState, authReducer} from './Auth'

export interface RootState {
	user: UserState
	app: AppState
	auth: AuthState
	router: RouterState
}

const rootReducer = (history: History) =>
	combineReducers<RootState>({
		user: userReducer,
		app: appReducer,
		auth: authReducer,
		router: connectRouter(history),
	})

export default rootReducer
