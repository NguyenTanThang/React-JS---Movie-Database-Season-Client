import React, { Component } from 'react'

export default class Pagination extends Component {

    renderPaginatorItem = () => {
        const {pageObject, onChangePageNumber} = this.props;
        const {pages, currentPage} = pageObject;
        console.log(pageObject);

        return pages.map(page => {
            if (currentPage === page) {
                return (
                    <li className="paginator__item paginator__item--active" key={page} onClick={()=>onChangePageNumber(page)}>
                        <span>{page}</span>
                    </li>
                )
            }
            return (
                <li className="paginator__item" key={page} onClick={()=>onChangePageNumber(page)}>
                    <span>{page}</span>
                </li>
            )
        })
    }

    moveToPreviousPage = () => {
        const {pageObject, onChangePageNumber} = this.props;
        const {currentPage} = pageObject;

        if (currentPage > 1) {
            onChangePageNumber(currentPage - 1)
        }
    }

    moveToNextPage = () => {
        const {pageObject, onChangePageNumber} = this.props;
        const {currentPage, totalPages} = pageObject;

        if (currentPage < totalPages) {
            onChangePageNumber(currentPage + 1)
        }
    }

    render() {
        const {moveToPreviousPage, moveToNextPage, renderPaginatorItem} = this;
        const {pageObject} = this.props;
        const {totalPages} = pageObject;

        if (totalPages === 0) {
            return (<></>)
        }

        return (
            <ul className="paginator">
						<li className="paginator__item paginator__item--prev" onClick={moveToPreviousPage}>
                            <span>
                                <i className="fas fa-arrow-left" aria-hidden="true"></i>
                            </span>
						</li>
                        {renderPaginatorItem()}
                        <li className="paginator__item paginator__item--next" onClick={moveToNextPage}>
                            <span>
                                <i className="fas fa-arrow-right" aria-hidden="true"></i>
                            </span>
						</li>
			</ul>
        )
    }
}
