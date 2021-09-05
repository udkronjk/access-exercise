import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
// import { catchError } from 'rxjs/operators';
import { fetchUserList, fetchToken, fetchUserDetail } from '../epics';
import { userReducer } from '../reducers';

export const rootEpic = combineEpics(fetchUserList, fetchUserDetail, fetchToken);

// TODO: add global error handler
// const epics = [getUserList, tokenLogin];
// export const rootEpic = (
//     action$: ActionsObservable<Action>,
//     store$: StateObservable<State>,
//     dependencies
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
