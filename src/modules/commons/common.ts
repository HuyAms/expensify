import ModelState from '../../models/bases/ModelState'

interface ServerResponse<T> {
	data: T
	status: number
}

interface ErrorResponse {
	errorCode: number
	message: string
	status: number
}

export const startLoading = <T>(state: ModelState<T>) => {
	state.status = 'loading'
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
	state.error = parseErrorCode(errorResponse.errorCode)
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

const parseErrorCode = (errorCode: ErrorCode): string => {
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
			return 'error.unknown'
	}
}
