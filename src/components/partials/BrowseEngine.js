import React, { Component } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

export default class BrowseEngine extends Component {

    state = {
        searchName: "",
        orderBy: "AtoZ",
        sortGenres: []
    }

    componentDidMount() {
        const {setSearchObject} = this.props;
        const {orderBy} = this.state;
        
        setSearchObject({orderBy})
    }

    renderGenreCheckBoxes = () => {
        const {genres} = this.props;

        return genres.map(genre => {
            return (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 form-group" key={genre._id}>
                    <Checkbox value={genre.name}>{genre.name}</Checkbox>
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

    onChangeCheckBox = (sortGenresValues) => {
        const {setSearchObject} = this.props;
        const {searchName, orderBy} = this.state;

        this.setState({
            sortGenres: sortGenresValues
        })
        setSearchObject({
            searchName, orderBy, sortGenres: sortGenresValues
        })
    }

    render() {
        const {renderGenreCheckBoxes, onChangeInput, onChangeCheckBox} = this;
        const {searchName, orderBy} = this.state;

        return (
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Search" key="1">
                    <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                <label htmlFor="searchName">Name:</label>
                                <input type="text" className="sign__input" placeholder="Name, Director, Genres"
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
                                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheckBox}>
                                    <div className="row">
                                        {renderGenreCheckBoxes()}
                                    </div>
                                </Checkbox.Group>
                            </div>
                        </div>
                    </form>
                </Panel>
            </Collapse>
        )
    }
}
