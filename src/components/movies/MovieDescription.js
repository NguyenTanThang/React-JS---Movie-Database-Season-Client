import React, { Component } from 'react';
import parse from 'html-react-parser';

export default class MovieDescription extends Component {
    render() {
        const {description} = this.props;

        return (
            <div>
                {
                    parse(description || "123")
                }
            </div>
        )
    }
}
