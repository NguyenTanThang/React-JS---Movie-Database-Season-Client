import React, { Component } from 'react'

class Loading extends Component {
    render() {
        return (
            <div className="big-loader-container">
                <div className="loader-logo">
                    <h1><span>{"LET'S"}</span>FLIX</h1>
                </div>
                <div className="loader"></div>
            </div>
        )
    }
}

export default Loading;
