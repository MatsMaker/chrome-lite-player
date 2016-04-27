import React, { Component, PropTypes } from 'react';

class Popup extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onToggle: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
  }

  render() {
    const { onPlay, onPause, onToggle, onNext, onPrev } = this.props;
    return (
      <div className="control-group">
        <div onClick={onPlay}>[>]</div>
        <div onClick={onPause}>[||]</div>
        <div onClick={onToggle}>[>/||]</div>
        <div onClick={onNext}>[{">>"}]</div>
        <div onClick={onPrev}>[{"<<"}]</div>
      </div>
    );
  };
}

export default Popup;
