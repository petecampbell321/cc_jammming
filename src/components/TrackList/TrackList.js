import React, { Component } from 'react';

import Track from '../Track/Track';

import './TrackList.css';

class TrackList extends Component {
	render() {
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track => {
						return <Track 
							track={track}
							onAdd={this.props.onAdd(this.props.track)}	//This could be wrong
							onRemove={this.props.onRemove}
							key={track.id} 
							name={this.props.track.name}
							artist={this.props.track.artist}
							album={this.props.track.album} />
					})
				}
			</div>
		)
	}
}

export default TrackList;