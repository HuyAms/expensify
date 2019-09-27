import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	postAsync as postItemAsync,
	deleteAsync as deleteItemAsync,
	updateAsync as updateItemAsync,
} from './Item'
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
import {Sort} from '../models/Sort'

const moduleName = 'items'
export const {moduleActions, moduleEpics: itemsEpics} = useModuleEpic(
	moduleName,
)
const {getAsync} = moduleActions

// ------------------------------------
// Actions
// ------------------------------------
export interface GetItemQuery {
	sort?: Sort
	field?: string
	search?: string
	from?: Date
	to?: Date
}
export const getItems = (teamId: string, options?: GetItemQuery) =>
	getAsync.request({path: `api/teams/${teamId}/items`, query: options})
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
			case getType(postItemAsync.success):
				draft.data.unshift(action.payload.data)
				break
			case getType(deleteItemAsync.success):
				const removedIndex = draft.data.findIndex(
					item => item._id === action.payload.data._id,
				)
				draft.data.splice(removedIndex, 1)
				break
			case getType(updateItemAsync.success):
				const updatedIndex = draft.data.findIndex(
					item => item._id === action.payload.data._id,
				)
				draft.data[updatedIndex] = action.payload.data
				break
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
