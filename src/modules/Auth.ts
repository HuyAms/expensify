import produce from 'immer'
import {push} from 'connected-react-router'
import {
	createAsyncAction,
	getType,
	isActionOf,
	createAction,
} from 'typesafe-actions'
import {Epic} from 'redux-observable'
import {Action, AnyAction} from 'redux'
import {RootState} from './reducers'
import {
	filter,
	switchMap,
	tap,
	catchError,
	ignoreElements,
	mapTo,
} from 'rxjs/operators'
import {from, of} from 'rxjs'
import ModelState from '../models/bases/ModelState'
import Auth from '../models/Auth'
import {
	endCanceling,
	endWithError,
	ErrorResponse,
	resetData,
	startSaving,
	fetchingSuccess,
} from './commons/common'
import {postRequest} from '../services/api'
import {
	clearLocalStorage,
	getToken,
	getUserId,
	setToken,
	setUserId,
} from '../services/localStorage'
import {AuthenticatedRoutePath, UnAuthenticatedRoutePath} from '../models/Route'

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
)<{body: object; isSignIn: boolean}, Auth, ErrorResponse, void>()

export const logOut = createAction(`@@${moduleName}/LOG_OUT`)

export const authenticateUser = (user: object, isSignIn: boolean) =>
	authAsync.request({body: user, isSignIn})

// ------------------------------------
// Reducer
// ------------------------------------

const initialAuth: Auth = {
	token: getToken(),
	userId: getUserId(),
}

const initialState: ModelState<Auth> = {
	data: initialAuth,
	status: 'idle',
	error: null,
}

export const authReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(authAsync.request):
				startSaving(draft)
				break
			case getType(authAsync.success):
				fetchingSuccess(draft, action.payload.data)
				break
			case getType(authAsync.failure):
				endWithError(draft, action.payload.errorCode)
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
				switchMap(res =>
					of(authAsync.success(res), push(AuthenticatedRoutePath.home)),
				),
				catchError(error => {
					return of(authAsync.failure(error.response.data))
				}),
			)
		}),
	)
}

const logOutEpic: Epic<Action, Action, RootState> = action$ => {
	return action$.pipe(
		filter(isActionOf(logOut)),
		tap(() => clearLocalStorage()),
		mapTo(push(UnAuthenticatedRoutePath.signin)),
	)
}

export const authEpics = [authenticateUserEpic, logOutEpic]
