import React from 'react';
import './Track.css';

class Track extends React.Component {
  // --------------------------
  // render Add/Remove action buttons

  renderAction = () => {
    return (this.props.isRemoval) ? <a className="Track-action" title="Remove from playlist" onClick={this.removeTrack}>-</a> : <a className="Track-action" title="Add to playlist" onClick={this.addTrack}>+</a>
  }

  // --------------------------
  // render 'play' if sample mp3 avaliable

  renderAudio = () => {
    if (this.props.isPlayable && this.props.track.play !== null) {
      return (
        <div className="Play-sample">
          <a onClick={this.passTrack} title="Play sample">play</a>
        </div>
      )
    }
  }

  // --------------------------
  // passing current track as argument


  addTrack = () => {
    this.props.onAdd(this.props.track);
  }
  removeTrack = () => {
    this.props.onRemove(this.props.track);
  }
  passTrack = () => {
    this.props.onSongPass(this.props.track);
  }

  render() {

    const { cover, album, name, artist } = this.props.track;

    return (
      <div className="Track">
        <figure className="Track-cover">
          <img src={cover} alt={album} />
        </figure>
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>
        </div>
        {this.renderAction()}
        {this.renderAudio()}
      </div>
    )
  }
}
export default Track;
