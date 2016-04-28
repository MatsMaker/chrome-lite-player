import React, { Component, PropTypes } from 'react';

class Popup extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onToggle: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onSetVolume: PropTypes.func,
  }

  render() {
    const { onPlay, onPause, onToggle, onNext, onPrev, onSetVolume } = this.props;
    return (
      <div className="control-group">
        <input type="range" min="0" max="100" step="1" defaultValue="50" />
        <div>
          <span onClick={onPlay}>[>]</span>
          <span onClick={onToggle}>_[>/||]_</span>
          <span onClick={onPause}>[||]</span>
        </div>
        <div>
          <span onClick={onPrev}>[{"<<"}]</span>
          <span onClick={onNext}>_[{">>"}]</span>
        </div>
        <div onClick={onSetVolume}>volume down</div>
      </div>
    );
  };
}

export default Popup;
