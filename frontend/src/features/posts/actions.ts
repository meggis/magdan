import { createAction } from '@reduxjs/toolkit';

export const getPostsData = createAction<{ token: string }>('posts_data/SET_POSTS_DATA');
export const setPostsData = createAction<{ postId: string }>('posts_data/GET_POSTS_DATA');
