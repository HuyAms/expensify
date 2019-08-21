export const setToken = (token: string) => {
	localStorage.setItem('token', token)
}

export const getToken = () => {
	return localStorage.getItem('token')
}

export const setUserId = (userId: string) => {
	localStorage.setItem('userId', userId)
}

export const getUserId = () => {
	return localStorage.getItem('userId')
}

export const clearLocalStorage = () => {
	localStorage.clear()
}
