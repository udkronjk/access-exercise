import * as React from 'react';
import styled from 'styled-components';

interface I_Pagination {
    totalPages: number;
    showPages: number;
    curPage: number;
    onPageClick: (page: number) => void;
}

export const Pagination: React.FC<I_Pagination> = (props) => {
    const pagesRenderer = () => {
        let startPage: number;
        if (props.curPage <= props.showPages / 2) {
            startPage = 1;
        } else if (props.curPage > props.totalPages - props.showPages / 2) {
            startPage = props.totalPages - props.showPages + 1;
        } else if (props.showPages % 2 > 0) {
            startPage = props.curPage - Math.floor(props.showPages / 2);
        } else {
            startPage = props.curPage - Math.floor(props.showPages / 2) + 1;
        }

        return new Array(props.showPages).fill('p').map((p, index) => {
            return (
                <div
                    className={`page ${startPage + index === props.curPage ? 'active' : ''}`}
                    key={startPage + index}
                    onClick={() => {
                        if (startPage + index !== props.curPage) {
                            props.onPageClick(startPage + index);
                        }
                    }}
                >
                    {startPage + index}
                </div>
            );
        });
    };
    const arrowLeftRenderer = () => {
        if (props.curPage > 1) {
            return (
                <div className="arr_left" onClick={() => props.onPageClick(props.curPage - 1)}>
                    {'<'}
                </div>
            );
        }
        return null;
    };
    const arrowRightRenderer = () => {
        if (props.curPage < props.totalPages) {
            return (
                <div className="arr_right" onClick={() => props.onPageClick(props.curPage + 1)}>
                    {'>'}
                </div>
            );
        }
        return null;
    };
    return (
        <StyledPagination>
            {arrowLeftRenderer()}
            {pagesRenderer()}
            {arrowRightRenderer()}
        </StyledPagination>
    );
};

const StyledPagination = styled.div`
    text-align: center;
    > div {
        background-color: #eee;
        border-radius: 0.25rem;
        cursor: pointer;
        display: inline-block;
        font-size: 1.5rem;
        line-height: 2rem;
        margin: 0.5rem;
        text-align: center;
        width: 2rem;
        &.active,
        &:hover {
            background-color: orangered;
            color: #fff;
        }
    }
`;
