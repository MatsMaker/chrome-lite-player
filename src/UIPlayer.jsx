import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import SoundsList from './SoundsList.jsx';

class Popup extends Component {
  static propTypes = {
    toPlay: PropTypes.bool,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onToggle: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSetVolume: PropTypes.func,
    sounds: PropTypes.array,
    currentSound: PropTypes.object,
  }

  render() {
    const { onPlay, onPause, onToggle, onNext, onPrev, onSetVolume,
    sounds, toPlay, currentSound } = this.props;
    const toggleButnClass = ClassNames({
      active: toPlay,
      button: true,
    });
    return (
      <div className="player-wrap">
      <div className="control-group">
        <div className="button-group">
          <span className="button" onClick={onPrev}>{"<<"}</span>
          <span className={toggleButnClass} onClick={onToggle}>>/||</span>
          <span className="button" onClick={onNext}>{">>"}</span>
        </div>
      </div>
        <div className="sounds-list-wrap">
          <SoundsList
            currentSound={currentSound}
            sounds={sounds}
          />
        </div>
      </div>
    );
  };
}

export default Popup;
