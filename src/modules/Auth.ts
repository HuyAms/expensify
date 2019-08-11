import produce from 'immer'
import {createAsyncAction, getType, isActionOf} from 'typesafe-actions'
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
} from 'rxjs/operators'
import {from, of} from 'rxjs'
import ModelState from '../models/bases/ModelState'
import Auth from '../models/Auth'
import {
	endCanceling,
	endWithError,
	startLoading,
	updateData,
} from './commons/common'
import {postRequest} from '../services/api'
import {getToken, setToken} from '../services/localStorage'

// ------------------------------------
// Const
// ------------------------------------
const moduleName = 'auth'

// ------------------------------------
// Actions
// ------------------------------------

const authAsync = createAsyncAction(
	`@@${moduleName}/POST_REQUEST`,
	`@@${moduleName}/POST_SUCCESS`,
	`@@${moduleName}/POST_FAILURE`,
	`@@${moduleName}/POST_CANCEL`,
)<{body: object; isSignIn: boolean}, Auth, Error, void>()

export const authenticateUser = (user: object, isSignIn: boolean) =>
	authAsync.request({body: user, isSignIn})
export const cancelAuthenticateUser = () => authAsync.cancel()

// ------------------------------------
// Reducer
// ------------------------------------

export type AuthState = ModelState<Auth>

const initialAuth: Auth = {
	token: getToken(),
	userId: null, // TODO: update userId when backend ready
}

const initialState: AuthState = {
	data: initialAuth,
	status: 'idle',
	error: null,
}

const auth = (state = initialState, action: any) =>
	produce(state, draft => {
		switch (action.type) {
			case getType(authAsync.request):
				startLoading(draft)
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
		}
	})

export const reducer = auth

// ------------------------------------
// Epics
// ------------------------------------

const authenticateUserEpic: Epic<Action, Action, RootState> = action$ => {
	return action$.pipe(
		filter(isActionOf(authAsync.request)),
		switchMap(action => {
			const {body, isSignIn} = action.payload
			const path = isSignIn ? '/auth/signin' : '/auth/signup'
			return from(postRequest(path, body)).pipe(
				tap(res => setToken(res.data.token)),
				map(res => authAsync.success(res)),
				catchError(error => {
					return of(authAsync.failure(error.response.data))
				}),
				takeUntil(action$.pipe(filter(isActionOf(authAsync.cancel)))),
			)
		}),
	)
}

export const authEpics = [authenticateUserEpic]
