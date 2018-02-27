import React, { Component } from 'react';

import TrackList from '../TrackList/TrackList';

import './Playlist.css';

class Playlist extends Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        let isRemoval = false;
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={isRemoval} /> 
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;