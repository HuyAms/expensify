import produce from 'immer'
import {getType} from 'typesafe-actions'
import {Category, CategoryType} from '../models/Category'
import {
	startFetching,
	fetchingSuccess,
	endWithError,
	endCanceling,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'

const moduleName = 'categories'
const {moduleActions, moduleEpics: categoriesEpics} = useModuleEpic(moduleName)
const {getAsync} = moduleActions

// ------------------------------------
// Actions
// ------------------------------------
export const getCategories = (teamId: string, type?: CategoryType) =>
	getAsync.request({path: `api/teams/${teamId}/categories`, query: {type}})
export const cancelGetCategories = () => getAsync.cancel()

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ModelState<Category[]> = {
	data: null,
	status: 'idle',
	error: null,
}

export const categoriesReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(getAsync.request):
				startFetching(draft)
				break
			case getType(getAsync.success):
				fetchingSuccess(draft, action.payload)
				break
			case getType(getAsync.failure):
				endWithError(draft, action.payload)
				break
			case getType(getAsync.cancel):
				endCanceling(draft)
				break
		}
	})

export {categoriesEpics}
