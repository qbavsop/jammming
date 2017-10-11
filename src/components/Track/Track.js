import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAudio = this.renderAudio.bind(this);
    this.passTrack = this.passTrack.bind(this);
  }

  // --------------------------
  // render Add/Remove action buttons

  renderAction() {
    return (this.props.isRemoval) ? <a className="Track-action" onClick={this.removeTrack}>-</a> : <a className="Track-action" onClick={this.addTrack}>+</a>
  }

  // --------------------------
  // render 'play' if sample mp3 avaliable

  renderAudio() {
    if (this.props.isPlayable && this.props.track.play !== null) {
      return (
        <div className="Play-sample">
          <a onClick={this.passTrack}>play</a>
        </div>
      )
    }
  }

  // --------------------------
  // passing current track as argument

  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  passTrack() {
    this.props.onSongPass(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <figure className="Track-cover">
          <img src={this.props.track.cover} alt={this.props.track.album} />
        </figure>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
        {this.renderAudio()}
      </div>
    )
  }
}
export default Track;
