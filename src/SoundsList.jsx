import React, { Component, PropTypes } from 'react';

class SoundsList extends Component {
  static propTypes = {
    sounds: PropTypes.array,
  }

  renderSoundItem(sound, index) {
    const style = {
      backgroundImage: "url(" + sound.artwork_url + ")",
    };

    return (
      <li
          key={index}
          className="sound-item"
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
