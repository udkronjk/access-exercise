// TODO: fix TS error

// import { filter, mapTo, map } from 'rxjs/operators';
// import { ajax } from 'rxjs/ajax';
// import { combineEpics, Epic, ofType } from 'redux-observable';
// import { switchMap, catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { Actions, I_FecthUserListAction, E_USER_ACTION } from '../actions';

// const getUserList: Epic<Actions> = (action$) => {
//     return action$.pipe<Actions>(
//         ofType(E_USER_ACTION.FETCH_USER_LIST),
//         // mapTo(() => {return ()=>{}})
//         mapTo('Hi') // TS 2554 error???
//     );
// };

// export default combineEpics(getUserList);

export {};
