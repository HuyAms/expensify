import ModelState from '../../models/bases/ModelState'

export interface ServerResponse<T> {
	data: T
	status: number
}

export interface ErrorResponse {
	errorCode?: number
	message: string
	status: number
}

export const startFetching = <T>(state: ModelState<T>) => {
	state.status = 'fetching'
	state.error = null
	state.data = null
}

export const startSaving = <T>(state: ModelState<T>) => {
	state.status = 'saving'
	state.error = null
}

export const endWithError = <T>(
	state: ModelState<T>,
	errorResponse: ErrorResponse,
) => {
	state.status = 'error'
	state.error = parseError(errorResponse)
}

export const endCanceling = <T>(state: ModelState<T>) => {
	state.status = 'idle'
}

export const updateData = <T>(
	state: ModelState<T>,
	serverResponse: ServerResponse<T>,
) => {
	const {data} = serverResponse

	state.status = 'success'
	state.error = null
	state.data = data
}

export const resetData = <T>(state: ModelState<T>) => {
	state.status = 'idle'
	state.error = null
	state.data = null
}

export enum ErrorCode {
	// Auth: 1xx
	passwordNotCorrect = 101,
	emailNotCorrect = 102,
	emailNotUnique = 104,
	notActiveUser = 106,
	notHasPermission = 107,
}

const parseError = (error: ErrorResponse): string => {
	const {errorCode, status} = error

	if (errorCode) {
		switch (errorCode) {
			case ErrorCode.passwordNotCorrect:
				return 'error.passwordNotCorrect'
			case ErrorCode.emailNotCorrect:
				return 'error.emailNotCorrect'
			case ErrorCode.emailNotUnique:
				return 'error.emailNotUnique'
			case ErrorCode.notActiveUser:
				return 'error.notActiveUser'
			case ErrorCode.notHasPermission:
				return 'error.notHasPermission'
			default:
				return 'error.unexpectedError'
		}
	} else {
		switch (status) {
			case 401:
				return 'error.unauthorized'
			case 403:
				return 'error.forbidden'
			case 404:
				return 'error.notFound'
			default:
				return 'error.unexpectedError'
		}
	}
}
