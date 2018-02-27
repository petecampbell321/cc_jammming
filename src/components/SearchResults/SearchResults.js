import React, { Component } from 'react';

import TrackList from '../TrackList/TrackList';

import './SearchResults.css';

class SearchResults extends Component {
    render() {
        let isRemoval = true;
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={isRemoval} />
            </div>
        )
    }
}

export default SearchResults;