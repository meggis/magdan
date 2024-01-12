import { createAction } from '@reduxjs/toolkit';
import { SetPosts } from '../../typings/posts';
import { NavigateFunction } from 'react-router-dom';
import { CreateToastFnReturn } from '@chakra-ui/react';

export const getPostsData = createAction('getPostsData/GET_POSTS_DATA');
export const getPostData = createAction<{ post_id: string | undefined }>('getPostData/GET_POST_DATA');
export const updatePostData = createAction<{
	post_content: string;
	post_name: string;
	post_header: string;
	post_id: string;
	reset: any;
	navigate?: NavigateFunction;
	toast: CreateToastFnReturn;
}>('updatePostData/UPDATE_POST_DATA');
export const deletePostData = createAction<{ post_id: string | undefined; toast: CreateToastFnReturn }>('deletePostData/DELETE_POST_DATA');
export const setPostData = createAction<any>('setPostData/SET_POST_DATA');
export const setPostsData = createAction<SetPosts[]>('setPostsData/SET_POSTS_DATA');
export const isLoadingPosts = createAction<boolean>('login/IS_LOADING_POSTS');
export const isLoadingPost = createAction<boolean>('getPostData/IS_LOADING_POST');
export const createPostData = createAction<
	{ post_content: string; post_name: string; post_header: string; reset: any; navigate?: NavigateFunction; toast: CreateToastFnReturn },
	any
>('createPostData/CREATE_POST_DATA');
