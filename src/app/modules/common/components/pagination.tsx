import React from 'react';

interface IPaginationProps {
    pagesQty: number;
    handlePageBtnClick: (activePage: number) => void;
    activePage: number;
}

interface IPaginationState {
}

export class Pagination extends React.Component<IPaginationProps, IPaginationState | any> {
    state: IPaginationState = {activePage: 1,};

    onPageNumberClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.textContent) {
            const btnValue: number = +event.currentTarget.textContent;

            this.props.handlePageBtnClick(btnValue)
        }

    };

    getPaginationBtns = (): any => {
        const pageBtnsArr: Array<any> = [];

        for (let i: number = 0; i < this.props.pagesQty; i++) {
            pageBtnsArr.push(
                <button key={i + 1}
                        className={`pagination__button ${this.props.activePage === (i + 1)
                            ? 'pagination-active'
                            : ''
                            }`
                        }
                        onClick={(e) => this.onPageNumberClick(e)}>
                    {i + 1}
                </button>
            );
        }
        return pageBtnsArr;
    };

    render() {
        return (
            <div className="pagination">
                {this.props.children}
                <div className="pagination-buttons">{this.getPaginationBtns()}</div>
            </div>
        );
    }
}
