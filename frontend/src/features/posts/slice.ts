/* eslint-disable guard-for-in */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';
import { isLoadingPosts, setPostsData } from './actions';
import { current } from 'immer';

import { IPostsModel } from '../../models/posts/post';

export const initialPost: IPostsModel = {
	posts: [],
	loadingPosts: true,
};

export const postSlice = createSlice({
	name: 'posts',
	initialState: initialPost,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(setPostsData.match, (state, { payload }) => ({
			...state,
			posts: payload,
		}));
		builder.addMatcher(isLoadingPosts.match, (state, { payload }) => {
			state.loadingPosts = payload;
		});
	},
});

export const postReducer = postSlice.reducer;
