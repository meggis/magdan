import { ajax } from 'rxjs/ajax';

export const login = ({ token }: { token: string }) => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/user/details/`,
		method: 'GET',
		headers: {
			Authorization: `Token ${token}`,
		},
	});
};
