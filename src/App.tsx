import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { UserList } from './components/UserList';
import { useAppDispatch, useAppSelector } from './redux/configureStore';
import { E_USER_ACTION } from './redux/actions';

function App() {
    const dispatch = useAppDispatch();
    const loginUser = useAppSelector((state) => state.userReducer.loginUser);
    // TODO: login 失敗處理:
    // http://localhost:3000/?error=access_denied&error_description=The+user+has+denied+your+application+access.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-authorization-request-errors%2F%23access-denied

    React.useEffect(() => {
        dispatch({ type: E_USER_ACTION.FETCH_USER_LIST });

        // oauth
        const url = new URL(document.location.href);
        if (url.searchParams.get('code')) {
            dispatch({ type: E_USER_ACTION.FETCH_TOKEN, payload: url.searchParams.get('code') });
            // clear url code parameter
            window.history.pushState({}, '', document.location.href.split('?')[0]);
        }
    }, []);

    return (
        <div className="App">
            <Header
                onLogin={() => {
                    document.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
                }}
                userName={loginUser?.login}
            />
            <UserList />
        </div>
    );
}

export default App;
