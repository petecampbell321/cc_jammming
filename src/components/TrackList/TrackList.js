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
							onAdd={this.props.onAdd}	//This could be wrong
							onRemove={this.props.onRemove}
							key={track.id} />
					})
				}
			</div>
		)
	}
}

export default TrackList;