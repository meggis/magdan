/* eslint-disable guard-for-in */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { createSlice } from '@reduxjs/toolkit';
import { setPostsData } from './actions';

import { IPostModel } from '../../models/posts/post';

export const initialPost: IPostModel = {
	postId: '',
	displayName: '',
	content: '',
	author: '',
	header: '',
};

export const postSlice = createSlice({
	name: 'postModels',
	initialState: initialPost,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(setPostsData.match, (state, { payload }) => {
			state.postId = payload.postId;
			// state.displayName = payload.displayName;
			// state.content = payload.content;
			// state.author = payload.author;
			// state.header = payload.header;
		});
	},
});

export const userReducer = postSlice.reducer;
