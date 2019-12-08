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
import {categoryReducer} from './Category'
import {Category} from '../models/Category'
import ModelState from '../models/bases/ModelState'
import Auth from '../models/Auth'
import App from '../models/App'
import Item from '../models/Item'
import {itemsReducer} from './Items'
import {itemReducer} from './Item'
import {paginationReducer, PaginationState} from './Pagination'

export interface RootState {
	authenticatedUser: AuthenticatedUserState
	app: App
	pagination: PaginationState
	auth: ModelState<Auth>
	teams: ModelState<Team[]>
	team: ModelState<Team>
	categories: ModelState<Category[]>
	category: ModelState<Category>
	items: ModelState<Item[]>
	item: ModelState<Item>
	router: RouterState
}

const rootReducer = (history: History) =>
	combineReducers<RootState>({
		authenticatedUser: authenticatedReducer,
		app: appReducer,
		pagination: paginationReducer,
		auth: authReducer,
		teams: teamsReducer,
		team: teamReducer,
		categories: categoriesReducer,
		category: categoryReducer,
		items: itemsReducer,
		item: itemReducer,
		router: connectRouter(history),
	})

export default rootReducer
