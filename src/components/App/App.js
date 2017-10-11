import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Alerts from '../Alerts/Alerts';

// --------------------------

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertmsg: '',
      sampleUrl: '',
      searchResults: [],
      playlistName: 'New playlist',
      playlistTracks:[]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  // --------------------------
  // set sample url and manage play/pause auctions

  togglePlay(track) {
    this.setState(
      {
        sampleUrl: track.play
      }, function() {
        let myAudio = document.getElementById('myAudio');
        return myAudio.paused ? myAudio.play() : myAudio.pause();
      }
    )
  }

  // --------------------------
  // add track from search results to playlist

  addTrack(track) {
    // create array of actual playlist id's
    let playlistTracksIndexes = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      playlistTracksIndexes.push(this.state.playlistTracks[i].id);
    };

    // check if current track.id is already on playlist
    if (!playlistTracksIndexes.includes(track.id)) {
      // if not then add it and update playlist state
      this.state.playlistTracks.push(track);
      this.setState(
        {
          playlistTracks: this.state.playlistTracks,
          alertmsg: ''
        }
      );
    } else {
      this.setState(
        {
          alertmsg: 'Track already exists on playlist!'
        }
      );
    }
  }

  // --------------------------
  // remove track from playlist

  removeTrack(track) {
    this.state.playlistTracks.forEach((result,index) => {
        if (result.id === track.id) {
          this.state.playlistTracks.splice(index,1);
          //console.log("Track id:" + track.id + " removed!");
        }
      }
    );
    this.setState(
      {
        playlistTracks: this.state.playlistTracks
      }
    );
  }

  // --------------------------
  // update playlist name

  updatePlaylistName(eventName) {
    this.setState(
      {
        playlistName: eventName.target.value
      }
    )
  }

  // --------------------------
  // on save done: revert default Playlist name, reset lists, set message

  resetState() {
    this.setState({
      searchResults: [],
      playlistName: 'New playlist',
      playlistTracks:[],
      alertmsg: 'Your playlist has been saved to your Spotify Account!'
    })
  }

  // --------------------------
  // save playlist to user spotify account

  savePlaylist() {
    // create array of tracks uri to be passed to Spotify API endpoint
    let trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      trackURIs.push(this.state.playlistTracks[i].uri);
    };

    // checking if playlist name is not empty otherwise revert default name
    // to prevent fetch error to Spotify API endpoint
    if (this.state.playlistName === '') {
      this.setState({
        playlistName: 'New Playlist'
      }, function () {
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
      })
    } else {
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
    }

    // reset states on save done
    this.resetState();
  }

  // --------------------------
  // search spotify

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState(
        {
          searchResults: searchResults
        }
      )
    })
  // clear any message on search
    .then (()=> {
      this.setState({
        alertmsg: ''
      })
    })
  }

  // --------------------------

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <Alerts
            alertmsg={this.state.alertmsg}
          />
          <AudioPlayer
            sampleUrl={this.state.sampleUrl}
          />
        <div className="App-playlist">
            <SearchResults
              onSongPass={this.togglePlay}
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default App;
