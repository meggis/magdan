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
} from './actions';
import { concat, of } from 'rxjs';
import { catchError, filter, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';

export const GetPostsEpic: AppEpic<ReturnType<typeof getPostsData>> = (action$, state$, { posts }) =>
	action$.pipe(
		filter(getPostsData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				of(isLoadingPosts(true)),
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
						return concat(of(isLoadingPost(false)));
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
			const body = {
				header: action.payload.post_header,
				content: action.payload.post_content,
				display_name: action.payload.post_name,
				post_id: action.payload.post_id,
			};
			return concat(
				of(isLoadingPost(true)),
				post.updatePostData(body).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const { response } = PostsAjaxResponse;
						action.payload.reset();
						action.payload.toast({
							title: "You've successfully updated your item!",
							status: 'success',
							isClosable: true,
						});
						if (action.payload.navigate) {
							action.payload.navigate('/');
						}
						return concat(of(isLoadingPost(false)), of(setPostData(response)));
					}),
					catchError((err: any) => {
						action.payload.toast({
							title: 'Sth went wrong. Please try again',
							status: 'error',
							isClosable: true,
						});
						return concat(of(isLoadingPost(false)));
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
				of(isLoadingPosts(true)),
				posts.deletePostData(action.payload.post_id).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const response = PostsAjaxResponse;
						const remainItems = state.posts.posts.filter((post: any) => post.post_id !== action.payload.post_id);
						action.payload.toast({
							title: "You've successfully deleted your item!",
							status: 'success',
							isClosable: true,
						});
						return concat(of(isLoadingPosts(false)), of(setPostData(response)), of(setPostsData(remainItems)));
					}),
					catchError((err: any) => {
						action.payload.toast({
							title: 'Sth went wrong. Please try again',
							status: 'error',
							isClosable: true,
						});
						return concat(of(isLoadingPosts(false)));
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
			const body = { header: action.payload.post_header, content: action.payload.post_content, display_name: action.payload.post_name };
			return concat(
				of(isLoadingPost(true)),
				post.createPostData(body).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const response = PostsAjaxResponse;
						action.payload.toast({
							title: "You've successfully created your item!",
							status: 'success',
							isClosable: true,
						});
						if (action.payload.navigate) {
							action.payload.navigate('/');
						}
						return concat(of(isLoadingPost(false)), of(setPostData(response)));
					}),
					catchError((err: any) => {
						action.payload.toast({
							title: 'Sth went wrong. Please try again',
							status: 'success',
							isClosable: true,
						});
						return concat(of(isLoadingPost(false)));
					}),
				),
			);
		}),
	);

export const postsEpics = combineEpics(GetPostsEpic, GetPostEpic, DeletePostEpic, UpdatePostEpic, CreatePostEpic);
