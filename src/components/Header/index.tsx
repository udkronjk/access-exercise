import * as React from 'react';
import styled from 'styled-components';

interface I_Header {
    onLogin: () => void;
}

export const Header: React.FC<I_Header> = (props) => {
    return (
        <StyledHeader>
            <h1>Github user List</h1>
            <div>
                <button onClick={props.onLogin}>Login</button>
            </div>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    align-items: center;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    h1 {
        display: block;
        font-size: 2rem;
    }
    button {
        background-color: #aaa;
        border: 1px solid #444;
        border-radius: 3px;
        font-size: 1.5rem;
        padding: 10px;
    }
`;
