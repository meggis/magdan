import { createAction } from '@reduxjs/toolkit';

export const getPostsData = createAction<{ token: string }>('getPostsData/SET_POSTS_DATA');
export const setPostsData = createAction<
	[] | [{ author: string; content: string; display_name: string; header: string; post_id: string; created_at: Date }]
>('getPostsData/GET_POSTS_DATA');
