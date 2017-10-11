import React from 'react';

class AudioPlayer extends React.Component {

  render() {
    return (
      <audio id="myAudio" ref="audio" src={this.props.sampleUrl} preload="auto"></audio>
    )
  }
}
export default AudioPlayer;
