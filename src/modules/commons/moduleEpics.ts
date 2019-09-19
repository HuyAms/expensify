import {Action} from 'redux'
import {Epic} from 'redux-observable'
import {
	switchMap,
	map,
	filter,
	takeUntil,
	catchError,
	tap,
} from 'rxjs/operators'
import {of, from} from 'rxjs'
import {createAsyncAction, isActionOf} from 'typesafe-actions'
import {
	cancel,
	getRequest,
	postRequest,
	deleteRequest,
} from '../../services/api'
import {RootState} from '../reducers'
import {ErrorResponse} from './common'

const useModuleEpic = <T>(moduleName: string) => {
	// ------------------------------------
	// Actions
	// ------------------------------------

	const getAsync = createAsyncAction(
		`@@${moduleName}/GET_REQUEST`,
		`@@${moduleName}/GET_SUCCESS`,
		`@@${moduleName}/GET_FAILURE`,
		`@@${moduleName}/GET_CANCEL`,
	)<{path: string; query?: object}, T, Error, void>()

	const postAsync = createAsyncAction(
		`@@${moduleName}/POST_REQUEST`,
		`@@${moduleName}/POST_SUCCESS`,
		`@@${moduleName}/POST_FAILURE`,
		`@@${moduleName}/POST_CANCEL`,
	)<{path: string; body: object; query?: object}, T, ErrorResponse, void>()

	const deleteAsync = createAsyncAction(
		`@@${moduleName}/DELETE_REQUEST`,
		`@@${moduleName}/DELETE_SUCCESS`,
		`@@${moduleName}/DELETE_FAILURE`,
		`@@${moduleName}/DELETE_CANCEL`,
	)<{path: string}, T, ErrorResponse, void>()

	const moduleActions = {
		getAsync,
		postAsync,
		deleteAsync,
	}

	// ------------------------------------
	// Epics
	// ------------------------------------

	const getModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(getAsync.request)),
			switchMap(action => {
				const {path, query} = action.payload
				return from(getRequest(path, query)).pipe(
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
				const {path, body, query} = action.payload
				return from(postRequest(path, body, query)).pipe(
					map(res => postAsync.success(res)),
					catchError(error => of(postAsync.failure(error.response.data))),
					takeUntil(
						action$.pipe(
							filter(isActionOf(postAsync.cancel)),
							tap(() => cancel()),
						),
					),
				)
			}),
		)
	}

	const deleteModelEpic: Epic<Action, Action, RootState> = action$ => {
		return action$.pipe(
			filter(isActionOf(deleteAsync.request)),
			switchMap(action => {
				const {path} = action.payload
				return from(deleteRequest(path)).pipe(
					map(res => deleteAsync.success(res)),
					catchError(error => of(deleteAsync.failure(error.response.data))),
					takeUntil(
						action$.pipe(
							filter(isActionOf(deleteAsync.cancel)),
							tap(() => cancel()),
						),
					),
				)
			}),
		)
	}

	const moduleEpics = [getModelEpic, postModelEpic, deleteModelEpic]

	return {moduleActions, moduleEpics}
}

export default useModuleEpic
