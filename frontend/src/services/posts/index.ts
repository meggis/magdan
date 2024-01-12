import { ajax } from 'rxjs/ajax';
import { getToken } from '../token';
import { SetPosts } from '../../typings/posts';

export const getPostsData = () => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts/`,
		method: 'GET',
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});
};

export const getPostData = (id: any) => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts/post/${id}/`,
		method: 'GET',
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});
};

export const updatePostData = (body: { post_id: string }) => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts/post/${body.post_id}/`,
		method: 'PUT',
		body,
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});
};

export const deletePostData = (id: any) => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts/post/${id}/`,
		method: 'DELETE',
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});
};

export const createPostData = (body: Partial<SetPosts>) => {
	return ajax({
		url: `${process.env.REACT_APP_API_URL}/posts/post/`,
		method: 'POST',
		body,
		headers: {
			Authorization: `Token ${getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};
