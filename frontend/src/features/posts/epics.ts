import { combineEpics } from 'redux-observable';
import { AppEpic } from '../../utils/reduxUtils';
import {
	setPostsData,
	isLoadingPosts,
	setPostData,
	getPostsData,
	getPostData,
	updatePostData,
	deletePostData,
	isLoadingPost,
	createPostData,
	isSuccessfullyPosted,
} from './actions';
import { concat, of } from 'rxjs';
import { catchError, filter, switchMap, withLatestFrom } from 'rxjs/operators';

export const GetPostsEpic: AppEpic<ReturnType<typeof getPostsData>> = (action$, state$, { posts }) =>
	action$.pipe(
		filter(getPostsData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				of(isLoadingPosts(true)),
				of(isSuccessfullyPosted(false)),
				posts.getPostsData().pipe(
					switchMap((PostsAjaxResponse: any) => {
						const { response } = PostsAjaxResponse;
						return concat(of(isLoadingPosts(false)), of(setPostsData(response)));
					}),
					catchError((err: any) => {
						return concat(of(isLoadingPosts(false)), of(setPostsData(err)));
					}),
				),
			);
		}),
	);

export const GetPostEpic: AppEpic<ReturnType<typeof getPostData>> = (action$, state$, { post }) =>
	action$.pipe(
		filter(getPostData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				of(isLoadingPost(true)),
				post.getPostData(action.payload.post_id).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const { response } = PostsAjaxResponse;
						return concat(of(isLoadingPost(false)), of(setPostData(response.data)));
					}),
					catchError((err: any) => {
						return concat(of(isLoadingPost(false)), of(setPostData(err)));
					}),
				),
			);
		}),
	);

export const UpdatePostEpic: AppEpic<ReturnType<typeof updatePostData>> = (action$, state$, { post }) =>
	action$.pipe(
		filter(updatePostData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				of(isLoadingPost(true)),
				post.updatePostData(action.payload.value).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const { response } = PostsAjaxResponse;
						action.payload.reset();
						return concat(of(isLoadingPost(false)), of(setPostData(response.data)));
					}),
					catchError((err: any) => {
						return concat(of(isLoadingPost(false)), of(setPostData(err)));
					}),
				),
			);
		}),
	);

export const DeletePostEpic: AppEpic<ReturnType<typeof deletePostData>> = (action$, state$, { posts }) =>
	action$.pipe(
		filter(deletePostData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				of(isLoadingPost(true)),
				posts.deletePostData(action.payload.post_id).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const response = PostsAjaxResponse;
						return concat(of(isLoadingPost(false)), of(setPostData(response)));
					}),
					catchError((err: any) => {
						return concat(of(isLoadingPost(false)), of(setPostData(err)));
					}),
				),
			);
		}),
	);

export const CreatePostEpic: AppEpic<ReturnType<typeof createPostData>> = (action$, state$, { post }) =>
	action$.pipe(
		filter(createPostData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const body = { header: action.payload.value.header, content: action.payload.value.content, display_name: action.payload.value.display_name };
			return concat(
				of(isLoadingPost(true)),
				post.createPostData(body).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const response = PostsAjaxResponse;
						return concat(of(isLoadingPost(false)), of(setPostData(response)), of(isSuccessfullyPosted(true)));
					}),
					catchError((err: any) => {
						return concat(of(isLoadingPost(false)), of(setPostData(err)), of(isSuccessfullyPosted(false)));
					}),
				),
			);
		}),
	);

export const postsEpics = combineEpics(GetPostsEpic, GetPostEpic, DeletePostEpic, UpdatePostEpic, CreatePostEpic);
