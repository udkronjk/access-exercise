import * as React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../redux/configureStore';
import { I_UserListItem } from '../../redux/types';
import { E_USER_ACTION } from '../../redux/actions';
import { E_LIST_LOADING_STATUS } from '../../redux/reducers';
import { Pagination } from '../Pagination';

interface I_UserList {}

export const UserList: React.FC<I_UserList> = (props) => {
    const dispatch = useAppDispatch();
    const userList = useAppSelector((state) => state.userReducer.userList);
    const userDetailList = useAppSelector((state) => state.userReducer.userDetailList);
    const listLoadingStatus = useAppSelector((state) => state.userReducer.listLoadingStatus);

    const [pageView, setPageView] = React.useState<boolean>(false);
    const [openUser, setOpenUser] = React.useState<string>('');
    const [curPage, setCurPage] = React.useState<number>(1);

    const refPerPageUsers = React.useRef<number>(20);

    const onClickUser = (username: string) => {
        setOpenUser(username === openUser ? '' : username);
        if (!userDetailList[username]) {
            dispatch({ type: E_USER_ACTION.FETCH_USER_DETAIL, payload: username });
        }
    };

    const onClickMore = () => {
        if (listLoadingStatus !== E_LIST_LOADING_STATUS.LOADING) {
            if (100 - userList.length < 20) {
                refPerPageUsers.current = 100 - userList.length;
            }
            dispatch({
                type: E_USER_ACTION.FETCH_USER_LIST,
                payload: {
                    since: userList[userList.length - 1].id,
                    per_page: refPerPageUsers.current,
                },
            });
        }
    };

    const onChangePage = (page: number) => {
        setCurPage(page);
    };

    const onShowPageView = () => {
        if (userList.length < 100) {
            dispatch({
                type: E_USER_ACTION.FETCH_USER_LIST,
                payload: {
                    since: userList[userList.length - 1].id,
                    per_page: 100 - userList.length,
                },
            });
        }
        setPageView(true);
    };

    const controllerRenderer = () => {
        return (
            <div className="ctrl">
                <div>{!pageView ? <button onClick={onShowPageView}>Page View</button> : null}</div>
                <div className="total">Total Count: {userList.length}</div>
            </div>
        );
    };

    const userListRenderer = () => {
        if (pageView) {
            return new Array(refPerPageUsers.current).fill('u').map((u, index) => {
                const curUserIndex = (curPage - 1) * refPerPageUsers.current + index;
                return userItemRenderer(userList[curUserIndex]);
            });
        }
        return <div>{userList.map(userItemRenderer)}</div>;
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
                    <div className="id">{item.id}</div>
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
    const moreButtonRenderer = () => {
        if (!pageView && userList.length > 0 && userList.length < 100) {
            return (
                <div className="more" onClick={onClickMore}>
                    {listLoadingStatus === E_LIST_LOADING_STATUS.LOADING ? 'Loading...' : 'More'}
                </div>
            );
        }
    };

    return (
        <StyledUserList>
            {userList ? (
                <div>
                    {controllerRenderer()}
                    {userListRenderer()}
                    {moreButtonRenderer()}
                    {pageView ? (
                        <Pagination
                            showPages={5}
                            curPage={curPage}
                            totalPages={Math.ceil(userList.length / refPerPageUsers.current)}
                            onPageClick={onChangePage}
                        />
                    ) : null}
                </div>
            ) : (
                'no Data'
            )}
        </StyledUserList>
    );
};

const StyledUserList = styled.div`
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem;
    .ctrl {
        display: flex;
        justify-content: space-between;
    }
    .total {
        color: #666;
        font-size: 1.2rem;
        padding: 0.5rem 0;
        text-align: right;
    }
    .more {
        background-color: orangered;
        border-radius: 0.5rem;
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        line-height: 2;
        text-align: center;
        margin: 1rem auto;
        width: 200px;
        &:hover {
            background-color: #e64438;
        }
    }
`;

const StyledUserListItem = styled.div`
    border-bottom: 1px solid #ccc;
`;

const StyledUserInfo = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: 1.5rem;
    line-height: 1.5;
    &:hover {
        background-color: #eee;
    }
    > * {
        padding: 0.5rem;
    }
    .id {
        width: 40px;
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
        padding: 0 3px;
        margin: 0 0.5rem;
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
`;
