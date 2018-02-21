import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { id: '1', name: 'Name1', artist: 'Artist1', album: 'Album1' },
        { id: '2', name: 'Name2', artist: 'Artist2', album: 'Album2' },
        { id: '3', name: 'Name3', artist: 'Artist3', album: 'Album3' }
      ],

      playlistName: 'Playlist1',

      playlistTracks: [
        { id: '1', name: 'Name1', artist: 'Artist1', album: 'Album1' },
        { id: '2', name: 'Name2', artist: 'Artist2', album: 'Album2' },
        { id: '3', name: 'Name3', artist: 'Artist3', album: 'Album3' }
      ]
    }


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let noOfTracks = parseInt(this.state.playlistTracks[this.state.playlistTracks.length - 1].id, 10);

    let newTrack = false;

    for (let i = 0; i < noOfTracks; i++) {
      if (track.id !== this.state.playlistTracks.id) {
        newTrack = true;
      }
    };

    if (newTrack) {
      let playlistArray = this.state.playlistTracks;

      playlistArray.push(track);

      this.setState({
        playlistTracks: playlistArray
      });
    }
  }

  removeTrack(track) {
    let playlistArray = this.state.playlistTracks;

    function findId(element) {
      return element.id === track.id;
    }

    const idToRemove = playlistArray.find(findId);

    let indexOfRemoval = playlistArray.indexOf(idToRemove);
    if (indexOfRemoval !== -1) {
      playlistArray.splice(indexOfRemoval, 1)
    }

    this.setState({
      playlistTracks: playlistArray
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    let trackURIs;
    this.state.playlistTracks.map(element => {
      return trackURIs.push(element.uri);
    })
  }

  search(searchTerm) {
     console.log(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.state.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.state.removeTrack}
              onNameChange={this.state.updatePlaylistName}
              onSave={this.state.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
