import { Actions, E_USER_ACTION } from '../actions';
import { I_UserListItem, I_UserDetail } from '../types';

export enum E_LOGIN_STATUS {
    UNLOGIN = 'UNLOGIN',
    DURING_LOGIN = 'DURING_LOGIN',
    LOGINED = 'LOGINED',
}

interface I_UserState {
    userList: Array<I_UserListItem>;
    userDetailList: { [key: string]: I_UserDetail };
    loginStatus: E_LOGIN_STATUS;
    accessToken?: string;
}

const defaultUserState: I_UserState = {
    userList: [],
    userDetailList: {},
    loginStatus: E_LOGIN_STATUS.UNLOGIN,
    accessToken: '',
};

export const userReducer = (state = defaultUserState, action: Actions): I_UserState => {
    switch (action.type) {
        case E_USER_ACTION.FETCH_USER_LIST_DONE:
            return { ...state, userList: [...state.userList, ...action.payload] };
        case E_USER_ACTION.FETCH_USER_DETAIL_DONE:
            let newUserDetailList = { ...state.userDetailList };
            newUserDetailList[action.payload.login] = action.payload;
            return { ...state, userDetailList: newUserDetailList };
        case E_USER_ACTION.FETCH_TOKEN:
            return { ...state, loginStatus: E_LOGIN_STATUS.DURING_LOGIN };
        case E_USER_ACTION.LOGINED:
            return { ...state, loginStatus: E_LOGIN_STATUS.LOGINED, accessToken: action.payload };
        default:
            return state;
    }
};
