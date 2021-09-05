import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { E_USER_ACTION } from '../actions';

// TODO: response code 判斷，例如 304 not Modified，就不需要重新 dispatch

export const fetchUserList = (action$) => {
    return action$.pipe(
        ofType(E_USER_ACTION.FETCH_USER_LIST),
        mergeMap((action) => {
            return ajax
                .getJSON(
                    `/api/users?per_page=${
                        (action.payload && action.payload.per_page) || 20
                    }&since=${(action.payload && action.payload.since) || 0}`,
                    {
                        accept: 'application/vnd.github.v3+json',
                    }
                )
                .pipe(
                    map((response) => {
                        return { type: E_USER_ACTION.FETCH_USER_LIST_DONE, payload: response };
                    })
                );
        })
    );
};

export const fetchUserDetail = (action$) => {
    return action$.pipe(
        ofType(E_USER_ACTION.FETCH_USER_DETAIL),
        mergeMap((action) => {
            return ajax
                .getJSON(`/api/users/${action.payload}`, {
                    accept: 'application/vnd.github.v3+json',
                })
                .pipe(
                    map((response) => {
                        return { type: E_USER_ACTION.FETCH_USER_DETAIL_DONE, payload: response };
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
                        // TODO: save access_token in cookie. When page refresh, user can keep it.
                        return { type: E_USER_ACTION.LOGINED, payload: data.response.access_token };
                    })
                );
        })
    );
};
