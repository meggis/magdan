/* eslint-disable guard-for-in */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';
import { setPostsData } from './actions';
import { current } from 'immer';

import { IPostModel } from '../../models/posts/post';

export const initialPost: IPostModel = {
	posts: [],
};

export const postSlice = createSlice({
	name: 'posts',
	initialState: initialPost,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(setPostsData.match, (state, { payload }) => ({ ...state, posts: payload }));
	},
});

export const postReducer = postSlice.reducer;
