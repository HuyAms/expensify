import produce from 'immer'
import {getType} from 'typesafe-actions'
import {
	startFetching,
	updateData,
	endWithError,
	endCanceling,
} from './commons/common'
import useModuleEpic from './commons/moduleEpics'

import User from '../models/User'
import ModelState from '../models/bases/ModelState'
import {AnyAction} from 'redux'

// ------------------------------------
// Reducer
// ------------------------------------

export type AuthenticatedUserState = ModelState<User>

const initialState: ModelState<User> = {
	data: null,
	status: 'idle',
	error: null,
}

export const authenticatedReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(getAsync.request):
				startFetching(draft)
				break
			case getType(getAsync.success):
				updateData(draft, action.payload)
				break
			case getType(getAsync.failure):
				endWithError(draft, action.payload)
				break
			case getType(getAsync.cancel):
				endCanceling(draft)
				break
		}
	})

// ------------------------------------
// Actions
// ------------------------------------

const moduleName = 'authenticatedUser'

export const {
	moduleActions,
	moduleEpics: authenticatedUserEpics,
} = useModuleEpic(moduleName)
const {getAsync} = moduleActions

export const getMe = () => getAsync.request({path: '/api/users/me'})
