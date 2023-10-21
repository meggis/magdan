import { ajax } from 'rxjs/ajax';
import { getToken } from '../token';

export const getPostsData = () => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts/`,
		method: 'GET',
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});
};
