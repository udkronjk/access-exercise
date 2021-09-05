import * as React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configureStore';
import { I_UserListItem } from '../../redux/types';

interface I_UserList {}

export const UserList: React.FC<I_UserList> = (props) => {
    const userList = useAppSelector((state) => state.userReducer.userList);
    const userItemRenderer = (item: I_UserListItem) => {
        return (
            <StyledUserListItem key={item.id}>
                <div>{item.id}</div>
                <div className="avator">
                    <img src={item.avatar_url} alt={item.login} />
                </div>
                <div>
                    {item.login}
                    {item.site_admin ? <span className="admin">admin</span> : null}
                </div>
            </StyledUserListItem>
        );
    };
    return <StyledUserList>{userList ? userList.map(userItemRenderer) : 'no Data'}</StyledUserList>;
};
const StyledUserList = styled.div`
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem;
`;

const StyledUserListItem = styled.div`
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    line-height: 1.5;

    > * {
        padding: 0.5rem;
    }
    .avator {
        width: 30px;
        img {
            border-radius: 50%;
            display: block;
            max-width: 100%;
        }
    }

    .admin {
        background-color: orange;
        border-radius: 3px;
        color: #fff;
        font-size: 1rem;
        line-height: 1;
    }
`;
