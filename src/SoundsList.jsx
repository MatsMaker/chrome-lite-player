import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

class SoundsList extends Component {
  static propTypes = {
    sounds: PropTypes.array,
    currentSound: PropTypes.object,
  }

  renderSoundItem = (sound, index) => {
    const { currentSound } = this.props;
    const style = {
      backgroundImage: "url(" + sound.artwork_url + ")",
    };
    const className = ClassNames({
      'sound-item': true,
      active: sound.id === currentSound.id,
    });
    return (
      <li
          key={index}
          className={className}
        >
        <div className="preview-img"
          style={style} />
        <span className="sound-title" >
          {sound.title}
        </span>
      </li>
    );
  }

  render() {
    const { renderSoundItem } = this;
    const { sounds } = this.props;
    return (
      <ul className="sound-list">
        {sounds.map(renderSoundItem)}
      </ul>
    );
  };
}

export default SoundsList;
