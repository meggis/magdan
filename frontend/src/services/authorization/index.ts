import { ajax } from 'rxjs/ajax';

export const login = ({ token }: { token: string }) => {
	return ajax({
		url: `http://localhost:3000/user/details/`,
		method: 'GET',
		headers: {
			Authorization: `Token ${token}`,
		},
		withCredentials: true,
	});
};
