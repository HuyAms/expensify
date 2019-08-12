import produce from 'immer'
import {
	createAsyncAction,
	getType,
	isActionOf,
	createAction,
} from 'typesafe-actions'
import {Epic} from 'redux-observable'
import {Action} from 'redux'
import {RootState} from './reducers'
import {
	filter,
	switchMap,
	tap,
	map,
	catchError,
	takeUntil,
	ignoreElements,
} from 'rxjs/operators'
import {from, of} from 'rxjs'
import ModelState from '../models/bases/ModelState'
import Auth from '../models/Auth'
import {
	endCanceling,
	endWithError,
	resetData,
	startSaving,
	updateData,
} from './commons/common'
import {postRequest} from '../services/api'
import {
	clearLocalStorage,
	getToken,
	getUserId,
	setToken,
	setUserId,
} from '../services/localStorage'

// ------------------------------------
// Const
// ------------------------------------
const moduleName = 'auth'
const path = '/auth'

// ------------------------------------
// Actions
// ------------------------------------

const authAsync = createAsyncAction(
	`@@${moduleName}/POST_REQUEST`,
	`@@${moduleName}/POST_SUCCESS`,
	`@@${moduleName}/POST_FAILURE`,
	`@@${moduleName}/POST_CANCEL`,
)<{body: object; isSignIn: boolean}, Auth, Error, void>()

export const logOut = createAction(`@@${moduleName}/LOG_OUT`)

export const authenticateUser = (user: object, isSignIn: boolean) =>
	authAsync.request({body: user, isSignIn})
export const cancelAuthenticateUser = () => authAsync.cancel()

// ------------------------------------
// Reducer
// ------------------------------------

export type AuthState = ModelState<Auth>

const initialAuth: Auth = {
	token: getToken(),
	userId: getUserId(),
}

const initialState: AuthState = {
	data: initialAuth,
	status: 'idle',
	error: null,
}

export const authReducer = (state = initialState, action: any) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(authAsync.request):
				startSaving(draft)
				break
			case getType(authAsync.success):
				updateData(draft, action.payload)
				break
			case getType(authAsync.failure):
				endWithError(draft, action.payload)
				break
			case getType(authAsync.cancel):
				endCanceling(draft)
				break
			case getType(logOut):
				resetData(draft)
				break
		}
	})

// ------------------------------------
// Epics
// ------------------------------------

const authenticateUserEpic: Epic<Action, Action, RootState> = action$ => {
	return action$.pipe(
		filter(isActionOf(authAsync.request)),
		switchMap(action => {
			const {body, isSignIn} = action.payload
			const endpoint = isSignIn ? `${path}/signin` : `${path}/signup`
			return from(postRequest(endpoint, body)).pipe(
				tap(res => {
					setToken(res.data.token)
					setUserId(res.data.userId)
				}),
				map(res => authAsync.success(res)),
				catchError(error => {
					return of(authAsync.failure(error.response.data))
				}),
				takeUntil(action$.pipe(filter(isActionOf(authAsync.cancel)))),
			)
		}),
	)
}

const logOutEpic: Epic<Action, Action, RootState> = action$ => {
	return action$.pipe(
		filter(isActionOf(logOut)),
		tap(() => clearLocalStorage()),
		ignoreElements(),
	)
}

export const authEpics = [authenticateUserEpic, logOutEpic]
