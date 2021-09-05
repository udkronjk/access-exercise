import { Actions, E_USER_ACTION } from '../actions';
import { I_UserListItem } from '../types';

enum E_LOGIN_STATUS {
    UNLOGIN = 'UNLOGIN',
    DURING_LOGIN = 'DURING_LOGIN',
    LOGINED = 'LOGINED',
}

interface I_UserState {
    isPinging: boolean;
    userList?: Array<I_UserListItem>;
    loginStatus: E_LOGIN_STATUS;
    accessToken?: string;
}

const defaultUserState: I_UserState = {
    isPinging: false,
    userList: [],
    loginStatus: E_LOGIN_STATUS.UNLOGIN,
};

export const userReducer = (state = defaultUserState, action: Actions): I_UserState => {
    switch (action.type) {
        case E_USER_ACTION.FETCH_USER_LIST_DONE:
            return { ...state, userList: action.payload };
        case E_USER_ACTION.FETCH_TOKEN:
            return { ...state, loginStatus: E_LOGIN_STATUS.DURING_LOGIN };
        case E_USER_ACTION.LOGINED:
            return { ...state, loginStatus: E_LOGIN_STATUS.LOGINED, accessToken: action.payload };
        default:
            return state;
    }
};
