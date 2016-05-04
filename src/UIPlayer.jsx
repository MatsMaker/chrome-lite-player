import React, { Component, PropTypes } from 'react';
import SoundsList from './SoundsList.jsx';

class Popup extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onToggle: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSetVolume: PropTypes.func,
    sounds: PropTypes.array,
  }

  render() {
    const { onPlay, onPause, onToggle, onNext, onPrev, onSetVolume,
    sounds } = this.props;
    return (
      <div className="player-wrap">
      <div className="control-group">
        <div>
          <span onClick={onPlay}>[>]</span>
          <span onClick={onToggle}>_[>/||]_</span>
          <span onClick={onPause}>[||]</span>
        </div>
        <div>
          <span onClick={onPrev}>[{"<<"}]</span>
          <span onClick={onNext}>_[{">>"}]</span>
        </div>
      </div>
        <div className="sounds-list-wrap">
          <SoundsList
            sounds={sounds}
          />
        </div>
      </div>
    );
  };
}

export default Popup;
