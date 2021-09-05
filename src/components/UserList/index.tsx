import * as React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../redux/configureStore';
import { I_UserListItem } from '../../redux/types';
import { E_USER_ACTION } from '../../redux/actions';

interface I_UserList {}

export const UserList: React.FC<I_UserList> = (props) => {
    const dispatch = useAppDispatch();
    const userList = useAppSelector((state) => state.userReducer.userList);
    const userDetailList = useAppSelector((state) => state.userReducer.userDetailList);

    const [openUser, setOpenUser] = React.useState<string>('');

    const onClickUser = (username: string) => {
        setOpenUser(username === openUser ? '' : username);
        if (!userDetailList[username]) {
            dispatch({ type: E_USER_ACTION.FETCH_USER_DETAIL, payload: username });
        }
    };

    const userDetailRenderer = (username: string) => {
        if (!userDetailList[username]) {
            return <StyledUserDetail>loading {username}</StyledUserDetail>;
        }
        const userDetail = userDetailList[username];
        return (
            <StyledUserDetail>
                <div className="avator">
                    <img src={userDetail.avatar_url} alt={userDetail.login} />
                </div>
                <div className="list">
                    <ul>
                        <li>name: {userDetail.name}</li>
                        <li>bio: {userDetail.bio}</li>
                        <li>login: {userDetail.login}</li>
                        <li>siteAdmin: {userDetail.site_admin ? 'Yes' : 'No'}</li>
                        <li>location: {userDetail.location}</li>
                        <li>
                            blog:{' '}
                            {userDetail.blog ? (
                                <a href={userDetail.blog} target="_blank" rel="noreferrer">
                                    {userDetail.blog}
                                </a>
                            ) : (
                                ''
                            )}
                        </li>
                    </ul>
                </div>
            </StyledUserDetail>
        );
    };

    const userItemRenderer = (item: I_UserListItem) => {
        return (
            <StyledUserListItem key={item.id}>
                <StyledUserInfo
                    onClick={() => {
                        onClickUser(item.login);
                    }}
                >
                    <div>{item.id}</div>
                    <div className="avator">
                        <img src={item.avatar_url} alt={item.login} />
                    </div>
                    <div>
                        {item.login}
                        {item.site_admin ? <span className="admin">admin</span> : null}
                    </div>
                </StyledUserInfo>
                {openUser === item.login ? userDetailRenderer(item.login) : null}
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
`;

const StyledUserInfo = styled.div`
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

const StyledUserDetail = styled.div`
    align-items: center;
    background-color: #eee;
    border-radius: 0.5rem;
    display: flex;
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 1rem;
    padding: 1rem;
    > * {
        padding: 1rem;
    }
    .avator {
        width: 100px;
        img {
            display: block;
        }
    }
    .list {
    }
`;
