import * as React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configureStore';
import { E_LOGIN_STATUS } from '../../redux/reducers';

interface I_Header {
    onLogin: () => void;
    userName?: string;
}

// TODO: logout -> page refresh, and clear access_token cookie.
export const Header: React.FC<I_Header> = (props) => {
    const loginStatus = useAppSelector((state) => state.userReducer.loginStatus);

    return (
        <StyledHeader>
            <h1>Github user List</h1>
            <div>
                {loginStatus !== E_LOGIN_STATUS.LOGINED ? (
                    <button
                        onClick={props.onLogin}
                        disabled={loginStatus !== E_LOGIN_STATUS.UNLOGIN}
                    >
                        {loginStatus === E_LOGIN_STATUS.UNLOGIN ? 'Login' : 'Logining'}
                    </button>
                ) : null}
                {props.userName ? <div className="greeting">Hi {props.userName}!</div> : null}
            </div>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    h1 {
        display: block;
        font-size: 2rem;
    }
    button {
        background-color: #eee;
        border: 1px solid #999;
        border-radius: 3px;
        font-size: 1.5rem;
        padding: 10px;
    }
    .greeting {
        font-size: 1.5rem;
    }
`;
