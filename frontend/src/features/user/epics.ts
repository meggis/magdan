/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import { combineEpics } from 'redux-observable';
import { catchError, filter, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { AppEpic } from '../../utils/reduxUtils';
import { getUserData, setUserData } from './actions';

export const getUserDataEpic: AppEpic<ReturnType<typeof getUserData>> = (action$, state$, { user }) =>
	action$.pipe(
		filter(getUserData.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			return concat(
				user.getUserData().pipe(
					switchMap(() => {
						const { name, lastName } = action.payload;
						return concat(of(setUserData({ name, lastName })));
					}),
					catchError((err: any) => {
						return concat(of(setUserData({ name: 'error', lastName: 'error' })));
					}),
				),
			);
		}),
	);

export const userEpics = combineEpics(getUserDataEpic);
