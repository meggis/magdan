/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import { combineEpics } from 'redux-observable';
import { catchError, delay, filter, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { concat, EMPTY, of } from 'rxjs';
import { AppEpic } from '../../utils/reduxUtils';
import { checkIfLogged, isLoading, login, logout, setIsLogged } from './actions';
import { setUserData } from '../user/actions';

export const Login: AppEpic<ReturnType<typeof login>> = (action$, state$, { authorization }) =>
	action$.pipe(
		filter(login.match),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			return concat(
				of(isLoading(true)),
				authorization.login({ token: action.payload.token }).pipe(
					switchMap((AjaxResponse: any) => {
						const { response } = AjaxResponse;
						localStorage.setItem('token', action.payload.token);
						return concat(
							of(isLoading(false)),
							of(setIsLogged({ isLogged: true })),
							of(setUserData({ name: response.first_name, lastName: response.last_name })),
						);
					}),
					catchError((err: any) => {
						localStorage.removeItem('token');
						return concat(of(isLoading(false)), of(setIsLogged({ isLogged: false })));
					}),
				),
			);
		}),
	);
// magda@545ee029-4527-43f3-bce8-053c55de2a43

export const Logout: AppEpic<ReturnType<typeof logout>> = (action$, state$, { authorization }) =>
	action$.pipe(
		filter(logout.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			localStorage.removeItem('token');
			window.location.replace('/');
			return concat(of(setIsLogged({ isLogged: false })));
		}),
	);

export const CheckIfLoggedEpic: AppEpic<ReturnType<typeof checkIfLogged>> = (action$, state$, { authorization }) =>
	action$.pipe(
		filter(checkIfLogged.match),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const token: any = localStorage.getItem('token');
			if (window && window.location.pathname !== '/login' && !token) {
				window.location.replace('/login');
				return concat(of(setIsLogged({ isLogged: !!token })));
			}
			return concat(of(login({ token })));
		}),
	);

export const authEpics = combineEpics(Login, CheckIfLoggedEpic, Logout);
