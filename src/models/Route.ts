export enum AuthenticatedRoutePath {
	home = '/',
	board = '/board/:teamId/:teamName',
	report = '/report/:teamId/:teamName',
	logout = '/logout',
}

export enum UnAuthenticatedRoutePath {
	signin = '/signin',
	signup = '/signup',
}
