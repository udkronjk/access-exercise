import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { E_USER_ACTION } from '../actions';

export const fetchUserList = (action$) => {
    return action$.pipe(
        ofType(E_USER_ACTION.FETCH_USER_LIST),
        // mapTo({ type: E_USER_ACTION.FETCH_USER_LIST_DONE}), // dispatch to next action
        mergeMap((action) => {
            return ajax.getJSON('/api/users').pipe(
                map((response) => {
                    return { type: E_USER_ACTION.FETCH_USER_LIST_DONE, payload: response };
                })
            );
        })
    );
};

export const fetchToken = (action$) => {
    return action$.pipe(
        ofType(E_USER_ACTION.FETCH_TOKEN),
        switchMap((action) => {
            return ajax
                .post(`/login/oauth/access_token`, {
                    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRECT,
                    code: action.payload,
                })
                .pipe(
                    map((data) => {
                        console.log('login', data);
                        return { type: E_USER_ACTION.LOGINED, payload: data.response.access_token };
                    })
                );
        })
    );
};
