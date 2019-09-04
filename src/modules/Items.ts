import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	startFetching,
	fetchingSuccess,
	endWithError,
	endCanceling,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'
import Item from '../models/Item'

const moduleName = 'items'
export const {moduleActions, moduleEpics: itemsEpics} = useModuleEpic(
	moduleName,
)
const {getAsync} = moduleActions

// ------------------------------------
// Actions
// ------------------------------------
export const getItems = (teamId: string) =>
	getAsync.request({path: `api/teams/${teamId}/expenseItems`})
export const cancelGetItems = () => getAsync.cancel()

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ModelState<Item[]> = {
	data: null,
	status: 'idle',
	error: null,
}

export const itemsReducer = (state = initialState, action: AnyAction) =>
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
