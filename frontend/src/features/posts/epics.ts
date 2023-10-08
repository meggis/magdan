import { combineEpics } from 'redux-observable';
import { AppEpic } from '../../utils/reduxUtils';
import { setPostsData, isLoadingPosts } from './actions';
import { concat, of } from 'rxjs';
import { catchError, filter, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { getPostsData } from '../posts/actions';

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

export const postsEpics = combineEpics(GetPostsEpic);
