import {Action} from 'redux'
import {Epic} from 'redux-observable'
import {switchMap, map, filter, takeUntil, catchError} from 'rxjs/operators'
import {of, from} from 'rxjs'
import {createAsyncAction, isActionOf} from 'typesafe-actions'
import {getRequest, postRequest} from '../../services/api'
import {RootState} from '../reducers'

const useModuleEpic = <T>(moduleName: string, path: string) => {
	// ------------------------------------
	// Actions
	// ------------------------------------

	const getAsync = createAsyncAction(
		`@@${moduleName}/GET_REQUEST`,
		`@@${moduleName}/GET_SUCCESS`,
		`@@${moduleName}/GET_FAILURE`,
		`@@${moduleName}/GET_CANCEL`,
	)<{params?: string; query?: object}, T, Error, void>()

	const postAsync = createAsyncAction(
		`@@${moduleName}/POST_REQUEST`,
		`@@${moduleName}/POST_SUCCESS`,
		`@@${moduleName}/POST_FAILURE`,
		`@@${moduleName}/POST_CANCEL`,
	)<{body: object; params?: string; query?: object}, T, Error, void>()

	const moduleActions = {
		getAsync,
		postAsync,
	}

	// ------------------------------------
	// Epics
	// ------------------------------------

	const getModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(getAsync.request)),
			switchMap(action => {
				const {params, query} = action.payload
				return from(getRequest(path, params, query)).pipe(
					map(res => getAsync.success(res)),
					catchError(error => of(getAsync.failure(error.response.data))),
					takeUntil(action$.pipe(filter(isActionOf(getAsync.cancel)))),
				)
			}),
		)
	}

	const postModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(postAsync.request)),
			switchMap(action => {
				const {body, params, query} = action.payload
				return from(postRequest(path, body, params, query)).pipe(
					map(res => postAsync.success(res)),
					catchError(error => of(postAsync.failure(error.response.data))),
					takeUntil(action$.pipe(filter(isActionOf(postAsync.cancel)))),
				)
			}),
		)
	}

	const moduleEpics = [getModelEpic, postModelEpic]

	return {moduleActions, moduleEpics}
}

export default useModuleEpic
