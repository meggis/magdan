import { combineEpics } from 'redux-observable';
import { AppEpic } from '../../utils/reduxUtils';
import { getPostsData, setPostsData } from './actions';
import { concat, of } from 'rxjs';
import { catchError, filter, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';

export const getPostsEpic: AppEpic<ReturnType<typeof getPostsData>> = (action$, state$, { posts }) =>
	action$.pipe(
		filter(getPostsData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				posts.getPostsData({ token: action.payload.token }).pipe(
					switchMap(() => {
						return concat(of(setPostsData({ postId: '1a' })));
					}),
					catchError((err: any) => {
						return concat(of(setPostsData({ postId: 'there is no such post' })));
					}),
				),
			);
		}),
	);

export const authEpics = combineEpics(getPostsEpic);
