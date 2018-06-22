import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <CSSTransitionGroup
          transitionName="TrackItemAnimation"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={150}>
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
      </CSSTransitionGroup>
      </div>
    )
  }
}
export default TrackList;
