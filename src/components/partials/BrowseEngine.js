import React, { Component } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default class BrowseEngine extends Component {

    state = {
        searchName: "",
        orderBy: "AtoZ",
        sortGenres: [],
        isGenreExpanded: false
    }

    componentDidMount() {
        const {setSearchObject, searchQuery} = this.props;
        const {orderBy} = this.state;
        const {t, g} = searchQuery;

        if (t) {
            setSearchObject({orderBy, searchName: t});
            this.setState({
                searchName: t
            })
        }

        if (g) {
            setSearchObject({orderBy, sortGenres: [g]})
            this.setState({
                sortGenres: [g]
            })
        }
        
    }

    onGenreExpand = () => {
        this.setState({
            isGenreExpanded: !this.state.isGenreExpanded
        })
    }

    renderGenreCheckBoxes = () => {
        const {genres} = this.props;
        const {setSearchObject} = this.props;
        const {searchName, orderBy} = this.state;

        /*
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 form-group" key={genre._id}>
                    <Checkbox value={genre.name}>{genre.name}</Checkbox>
                </div>
        */

        const addGenreToSortGenres = (genreName) => {
            if (this.state.sortGenres.includes(genreName)) {
                this.setState({
                    sortGenres: this.state.sortGenres.filter(sortGenreItem => {
                        return sortGenreItem != genreName
                    })
                })
                setSearchObject({
                    searchName, orderBy, sortGenres: this.state.sortGenres.filter(sortGenreItem => {
                        return sortGenreItem != genreName
                    })
                })
            } else {
                this.setState({
                    sortGenres: [...this.state.sortGenres, genreName]
                })
                setSearchObject({
                    searchName, orderBy, sortGenres: [...this.state.sortGenres, genreName]
                })
            }
        }

        return genres.map(genre => {
            if (this.state.sortGenres.includes(genre.name)) {
                return (
                    <div className="genre-pill active" onClick={() => addGenreToSortGenres(genre.name)} key={genre._id}>
                    {genre.name}
                </div>
                )
            }
            return (
                <div className="genre-pill" onClick={() => addGenreToSortGenres(genre.name)} key={genre._id}>
                    {genre.name}
                </div>
            )
        })
    }

    onChangeInput = (e) => {
        const {setSearchObject} = this.props;
        const {searchName, orderBy, sortGenres} = this.state;
        const ev = e;

        this.setState({
            [e.target.name]: e.target.value
        })
        setSearchObject({
            searchName, orderBy, sortGenres,
            [ev.target.name]: ev.target.value
        })
    }

    render() {
        const {renderGenreCheckBoxes, onChangeInput, onGenreExpand} = this;
        const {searchName, orderBy, isGenreExpanded} = this.state;

        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Search" key="1">
                    <form autoComplete="off" onSubmit={e => e.preventDefault()} className="search-form">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                <label htmlFor="searchName">Name:</label>
                                <input type="text" className="sign__input" placeholder="Title, Actor, Director, Genre"
                                name="searchName"
                                onChange={onChangeInput}
                                value={searchName}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                <label htmlFor="sorter">Sorter:</label>
                                <div className="select">
                                    <select name="orderBy" onChange={onChangeInput} defaultValue={orderBy}>
                                        <option value="AtoZ">A to Z</option>
                                        <option value="ZtoA">Z to A</option>
                                        <option value="ratingUp">Rating (Ascending)</option>
                                        <option value="ratingDown">Rating (Descending)</option>
                                    </select>
                                    <div className="select_arrow">
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="genres">Genres:</label>
                                <div className={`genre-clip-row row ${isGenreExpanded ? "active": ""}`}>
                                    {renderGenreCheckBoxes()}
                                </div>
                                <div className="genre-expand-button" onClick={onGenreExpand}>
                                   {isGenreExpanded ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>} 
                                </div>
                            </div>
                        </div>
                    </form>
                </Panel>
            </Collapse>
        )
    }
}
