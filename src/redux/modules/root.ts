import { combineEpics, StateObservable } from 'redux-observable';
import { combineReducers, Action } from 'redux';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { fetchUserList, fetchToken, fetchUserDetail } from '../epics';
import { userReducer } from '../reducers';
import { Actions } from '../actions';

export const rootEpic = combineEpics(fetchUserList, fetchUserDetail, fetchToken);

// TODO: add global error handler
// const epics = [fetchUserList, fetchUserDetail, fetchToken];
// export const rootEpic = (
//     action$: Observable<Action<any>>,
//     store$: StateObservable<any>,
//     dependencies: any
// ) =>
//     combineEpics(...epics)(action$, store$, dependencies).pipe(
//         catchError((error, source) => {
//             console.error(error);
//             return source;
//         })
//     );

export const rootReducer = combineReducers({
    userReducer,
});
