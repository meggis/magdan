import { ajax } from 'rxjs/ajax';

export const login = ({ token }: { token: string }) => {
	return ajax({
		url: `http://localhost:8000/user/details/`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		},
		// body: {
		// 	token
		// },
	});
};
