import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/reduxUtils';
import { useEffect } from 'react';
import { getPostsData } from '../../features/posts/actions';

const HomePage = () => {
	const { isLogged } = useAppSelector(state => state.authorization);
	const posts = useAppSelector(state => state.posts);
	const dispatch = useAppDispatch();
	const userToken = localStorage.getItem('token');

	useEffect(() => {
		if (isLogged) {
			dispatch(getPostsData({ token: userToken as string }));
		}
	}, []);

	return <>{JSON.stringify(posts, null, 2)}</>;
};

export default HomePage;
