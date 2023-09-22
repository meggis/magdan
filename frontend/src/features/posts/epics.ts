import { combineEpics } from 'redux-observable';
import { AppEpic } from '../../utils/reduxUtils';
import { setPostsData } from './actions';
import { concat, of } from 'rxjs';
import { catchError, filter, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';
import { getPostsData } from '../posts/actions';
import { Item } from 'framer-motion/types/components/Reorder/Item';

export const GetPostsEpic: AppEpic<ReturnType<typeof getPostsData>> = (action$, state$, { posts }) =>
	action$.pipe(
		filter(getPostsData.match),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			return concat(
				posts.getPostsData({ token: action.payload.token }).pipe(
					switchMap((PostsAjaxResponse: any) => {
						const { response } = PostsAjaxResponse;
						return concat(of(setPostsData(response)));
					}),
					catchError((err: any) => {
						return concat(of(setPostsData(err)));
					}),
				),
			);
		}),
	);

export const postsEpics = combineEpics(GetPostsEpic);
