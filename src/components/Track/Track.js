import React, { Component } from 'react';

import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        console.log('Add Track ID: ' + this.props.track.id + ', name: ' + this.props.track.name + '\n');
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        console.log('Remove Track ID: ' + this.props.track.id + ', name: ' + this.props.track.name + '\n');
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        if (this.props.isRemoval === true) {
            return <a className="Track-action" onClick={this.addTrack}>+</a>;
        } else {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>;
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;