import { ajax } from 'rxjs/ajax';

export const getPostsData = ({ token }: { token: string }) => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts`,
		method: 'GET',
		headers: {
			Authorization: `Token ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
