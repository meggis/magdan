import { createAction } from '@reduxjs/toolkit';
import { SetPosts } from '../../typings/posts';

export const getPostsData = createAction('getPostsData/SET_POSTS_DATA');
export const setPostsData = createAction<SetPosts[]>('getPostsData/GET_POSTS_DATA');
export const isLoadingPosts = createAction<boolean>('login/IS_LOADING_POSTS');
