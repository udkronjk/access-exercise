import { I_UserListItem } from '../types';

export enum E_USER_ACTION {
    FETCH_USER_LIST = 'FETCH_USER_LIST',
    FETCH_USER_LIST_DONE = 'FETCH_USER_LIST_DONE',
    FETCH_TOKEN = 'FETCH_TOKEN',
    LOGINED = 'LOGINED',
}

export interface I_FecthUserListAction {
    type: E_USER_ACTION.FETCH_USER_LIST;
}
export interface I_FecthUserListDoneAction {
    type: E_USER_ACTION.FETCH_USER_LIST_DONE;
    payload: Array<I_UserListItem>;
}
export interface I_FetchTokenAction {
    type: E_USER_ACTION.FETCH_TOKEN;
    payload: string | null; // temp code
}
export interface I_FetchTokenDoneAction {
    type: E_USER_ACTION.LOGINED;
    payload: string; // access token
}

export type Actions =
    | I_FecthUserListAction
    | I_FetchTokenAction
    | I_FecthUserListDoneAction
    | I_FetchTokenDoneAction;
