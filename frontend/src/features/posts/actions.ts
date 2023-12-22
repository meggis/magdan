import { createAction } from '@reduxjs/toolkit';
import { SetPosts } from '../../typings/posts';

export const getPostsData = createAction('getPostsData/GET_POSTS_DATA');
export const getPostData = createAction<{ post_id: string | undefined }>('getPostData/GET_POST_DATA');
export const updatePostData = createAction<{ value: SetPosts; reset: any }>('updatePostData/UPDATE_POST_DATA');
export const deletePostData = createAction<{ post_id: string | undefined }>('deletePostData/DELETE_POST_DATA');
export const setPostData = createAction<SetPosts>('setPostData/SET_POST_DATA');
export const setPostsData = createAction<SetPosts[]>('setPostsData/SET_POSTS_DATA');
export const isLoadingPosts = createAction<boolean>('login/IS_LOADING_POSTS');
export const isLoadingPost = createAction<boolean>('getPostData/IS_LOADING_POST');
export const createPostData = createAction<{ value: SetPosts; reset: any }>('createPostData/CREATE_POST_DATA');
export const isSuccessfullyPosted = createAction<boolean>('createPostData/SUCCESS');
