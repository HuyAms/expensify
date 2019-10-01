import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	deleteAsync as deleteItemAsync,
	postAsync as postItemAsync,
	updateAsync as updateItemAsync,
} from './Item'
import {
	endCanceling,
	endWithError,
	fetchingSuccess,
	loadMoreSuccess,
	startFetching,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'
import Item from '../models/Item'
import {Sort} from '../models/Sort'
import {PaginationContext} from './Pagination'

const moduleName = 'items'
export const {moduleActions, moduleEpics: itemsEpics} = useModuleEpic(
	moduleName,
	PaginationContext.items,
)
const {getAsync, loadMoreAsync} = moduleActions

// ------------------------------------
// Actions
// ------------------------------------
export interface GetItemQuery {
	sort?: Sort
	field?: string
	search?: string
}

export const getItems = (teamId: string, options?: GetItemQuery) =>
	getAsync.request({path: `api/teams/${teamId}/items`, query: options})

export const loadMoreItems = (teamId: string, options?: GetItemQuery) =>
	loadMoreAsync.request({path: `api/teams/${teamId}/items`, query: options})

export const cancelGetItems = () => getAsync.cancel()

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ModelState<Item[]> = {
	data: [],
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
			case getType(loadMoreAsync.request):
				draft.status = 'fetching'
				break
			case getType(getAsync.success):
				fetchingSuccess(draft, action.payload.data.records)
				break
			case getType(loadMoreAsync.success):
				loadMoreSuccess(draft, action.payload.data.records)
				break
			case getType(getAsync.failure):
			case getType(loadMoreAsync.failure):
				endWithError(draft, action.payload.errorCode)
				break
			case getType(getAsync.cancel):
			case getType(loadMoreAsync.cancel):
				endCanceling(draft)
				break
		}
	})
