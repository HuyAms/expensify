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
import {appReducer} from './App'
import {authReducer} from './Auth'
import {teamsReducer} from './Teams'
import {teamReducer} from './Team'
import {categoriesReducer} from './Categories'
import {Category} from '../models/Category'
import ModelState from '../models/bases/ModelState'
import Auth from '../models/Auth'
import App from '../models/App'

export interface RootState {
	authenticatedUser: AuthenticatedUserState
	app: App
	auth: ModelState<Auth>
	teams: ModelState<Team[]>
	team: ModelState<Team>
	categories: ModelState<Category[]>
	router: RouterState
}

const rootReducer = (history: History) =>
	combineReducers<RootState>({
		authenticatedUser: authenticatedReducer,
		app: appReducer,
		auth: authReducer,
		teams: teamsReducer,
		team: teamReducer,
		categories: categoriesReducer,
		router: connectRouter(history),
	})

export default rootReducer
