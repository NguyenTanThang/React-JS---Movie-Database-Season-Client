import React, { Component } from 'react';

export default class Pagination extends Component {

    renderPaginatorItem = () => {
        const {pageObject, onChangePageNumber, isNotToTop} = this.props;
        const {pages, currentPage} = pageObject;
        
        return pages.map(page => {
            if (currentPage === page) {
                return (
                    <li className="paginator__item paginator__item--active" key={page} onClick={()=>onChangePageNumber(page)}>
                        {isNotToTop ? (
                            <span>{page}</span>
                        ) : (
                            <a href="#">
                                <span>{page}</span>
                            </a>
                        )}
                    </li>
                )
            }
            return (
                <li className="paginator__item" key={page} onClick={()=>onChangePageNumber(page)}>
                   {isNotToTop ? (
                        <span>{page}</span>
                    ) : (
                        <a href="#">
                            <span>{page}</span>
                        </a>
                    )}
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
        const {pageObject, isNotToTop} = this.props;
        const {totalPages} = pageObject;

        if (totalPages === 0) {
            return (<></>)
        }

        return (
            <ul className="paginator">
						<li className="paginator__item paginator__item--prev" onClick={moveToPreviousPage}>
                        {isNotToTop ? (
                            
                        <span>
                        <i className="fas fa-arrow-left" aria-hidden="true"></i>
                    </span>
                        ) : (
                            <a href="#">
                            <span>
                                <i className="fas fa-arrow-left" aria-hidden="true"></i>
                            </span>
                        </a>
                        )}
                            
						</li>
                        {renderPaginatorItem()}
                        <li className="paginator__item paginator__item--next" onClick={moveToNextPage}>
                            {isNotToTop ? (
                            <span>
                            <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </span>
                            ) : (
                                
                                <a href="#">
                                <span>
                                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                                </span>
                            </a>
                            )}
						</li>
			</ul>
        )
    }
}
