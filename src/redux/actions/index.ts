import { I_UserListItem, I_UserDetail } from '../types';

export enum E_USER_ACTION {
    FETCH_USER_LIST = 'FETCH_USER_LIST',
    FETCH_USER_LIST_DONE = 'FETCH_USER_LIST_DONE',
    FETCH_USER_DETAIL = 'FETCH_USER_DETAIL',
    FETCH_USER_DETAIL_DONE = 'FETCH_USER_DETAIL_DONE',
    FETCH_TOKEN = 'FETCH_TOKEN',
    LOGINED = 'LOGINED',
}

export interface I_FecthUserListAction {
    type: E_USER_ACTION.FETCH_USER_LIST;
    payload?: {
        since?: number;
        per_page?: number;
    };
}

export interface I_FecthUserListDoneAction {
    type: E_USER_ACTION.FETCH_USER_LIST_DONE;
    payload: Array<I_UserListItem>;
}

export interface I_FecthUserDetailAction {
    type: E_USER_ACTION.FETCH_USER_DETAIL;
    payload: string; // username
}

export interface I_FecthUserDetailDoneAction {
    type: E_USER_ACTION.FETCH_USER_DETAIL_DONE;
    payload: I_UserDetail;
}
export interface I_FetchTokenAction {
    type: E_USER_ACTION.FETCH_TOKEN;
    payload: string | null; // temp code
}
export interface I_FetchTokenDoneAction {
    type: E_USER_ACTION.LOGINED;
    payload: { token: string; authUserDetail: I_UserDetail }; // access token
}

export type Actions =
    | I_FecthUserListAction
    | I_FecthUserListDoneAction
    | I_FecthUserDetailAction
    | I_FecthUserDetailDoneAction
    | I_FetchTokenAction
    | I_FetchTokenDoneAction;
