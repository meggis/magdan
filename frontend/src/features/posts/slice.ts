/* eslint-disable guard-for-in */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';
import { isLoadingPosts, setPostsData, setPostData, deletePostData, isLoadingPost, createPostData, updatePostData } from './actions';

import { IPostsModel } from '../../models/posts/post';

export const initialPost: IPostsModel = {
	posts: [],
	post: {},
	loadingPosts: true,
	loadingPost: false,
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState: initialPost,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(setPostsData.match, (state, { payload }) => ({
			...state,
			posts: payload,
		}));
		builder.addMatcher(setPostData.match, (state, { payload }) => ({
			...state,
			post: payload,
		}));
		builder.addMatcher(deletePostData.match, (state, { payload }) => ({
			...state,
			post: payload,
		}));
		builder.addMatcher(isLoadingPosts.match, (state, { payload }) => {
			state.loadingPosts = payload;
		});
		builder.addMatcher(isLoadingPost.match, (state, { payload }) => {
			state.loadingPost = payload;
		});
		builder.addMatcher(createPostData.match, (state, { payload }) => ({
			...state,
			post: payload,
		}));
		builder.addMatcher(updatePostData.match, (state, { payload }) => ({
			...state,
			post: payload,
		}));
	},
});

export const postReducer = postsSlice.reducer;
