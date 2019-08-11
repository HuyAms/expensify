import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	startLoading,
	updateData,
	endWithError,
	endCanceling,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import User from '../models/User'
import ModelState from '../models/bases/ModelState'

// ------------------------------------
// Const
// ------------------------------------

const moduleName = 'user'
const path = '/api/users'

export const {moduleActions, moduleEpics: userEpics} = useModuleEpic(
	moduleName,
	path,
)
const {getAsync} = moduleActions

// ------------------------------------
// Reducer
// ------------------------------------

export type UserState = ModelState<User>

const initialState: ModelState<User> = {
	data: null,
	status: 'idle',
	error: null,
}

export const userReducer = (state = initialState, action: any) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(getAsync.request):
				startLoading(draft)
				break
			case getType(getAsync.success):
				updateData(draft, action.payload)
				break
			case getType(getAsync.failure):
				endWithError(draft, action.payload.message)
				break
			case getType(getAsync.cancel):
				endCanceling(draft)
				break
		}
	})

// ------------------------------------
// Actions
// ------------------------------------

export const getMe = () => getAsync.request({params: 'me'})