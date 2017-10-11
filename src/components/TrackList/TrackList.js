import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
              return (
              <Track
                isPlayable={this.props.isPlayable}
                isRemoval={this.props.isRemoval}
                track={track}
                key={track.id}
                onSongPass={this.props.onSongPass}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
              />
              )
            })
        }
      </div>
    )
  }
}
export default TrackList;
