import * as React from 'react';
import { useAppSelector } from '../../redux/configureStore';
import { I_UserListItem } from '../../redux/types';

interface I_UserList {}

export const UserList: React.FC<I_UserList> = (props) => {
    const userList = useAppSelector((state) => state.userReducer.userList);
    const userItemRenderer = (item: I_UserListItem) => {
        return <div key={item.id}>{item.id}</div>;
    };
    return <>{userList ? userList.map(userItemRenderer) : '無資料'}</>;
};
