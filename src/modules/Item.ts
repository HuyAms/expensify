import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	startFetching,
	fetchingSuccess,
	endWithError,
	endCanceling,
	startSaving,
	savingSuccess,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'
import Item, {ItemInput} from '../models/Item'

// ------------------------------------
// Actions
// ------------------------------------

const moduleName = 'item'

export const {moduleActions, moduleEpics: itemEpics} = useModuleEpic(moduleName)
export const {getAsync, postAsync, updateAsync, deleteAsync} = moduleActions

export const createItem = (teamId: string, item: Item) => {
	return postAsync.request({
		path: `api/teams/${teamId}/items`,
		body: item,
	})
}

export const updateItem = (teamId: string, itemId: string, item: ItemInput) =>
	updateAsync.request({path: `api/teams/${teamId}/items/${itemId}`, body: item})

export const deleteItem = (teamId: string, itemId: string) =>
	deleteAsync.request({path: `api/teams/${teamId}/items/${itemId}`})

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ModelState<Item> = {
	data: null,
	status: 'idle',
	error: null,
}

export const itemReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(getAsync.request):
				startFetching(draft)
				break
			case getType(getAsync.success):
				fetchingSuccess(draft, action.payload.data)
				break
			case getType(postAsync.request):
			case getType(updateAsync.request):
			case getType(deleteAsync.request):
				startSaving(draft)
				break
			case getType(postAsync.success):
			case getType(updateAsync.success):
			case getType(deleteAsync.success):
				savingSuccess(draft)
				break
			case getType(getAsync.failure):
			case getType(postAsync.failure):
			case getType(updateAsync.failure):
			case getType(deleteAsync.failure):
				endWithError(draft, action.payload.errorCode)
				break
			case getType(getAsync.cancel):
				endCanceling(draft)
				break
		}
	})
