import React, { Component, PropTypes } from 'react';
const sc = require('./soundcloud-player-api.js');
import Reductor from './Reductor.js';
import UIPlayer from './UIPlayer.jsx';
require("./popup.css");

class Popup extends Component {

  componentWillMount() {
    const reductor = new Reductor(chrome).mountClient({
      gotSounds: (sounds) => { console.log(sounds) },
    });
    reductor.get.sounds();
    this.setState({
      reductor: reductor,
    });
  };

  onEvent = (eventName) => {
    const { reductor } = this.state;
    return () => { reductor.methods[eventName](); };
  };

  onSetVolume = () => {
    const { reductor } = this.state;
    return () => { reductor.methods.setVolume(1); };
  }

  render() {
    const { onEvent, onSetVolume } = this;
    return (
      <div>
        <UIPlayer
          onPlay={onEvent('play')}
          onPause={onEvent('pause')}
          onToggle={onEvent('toggle')}
          onNext={onEvent('next')}
          onPrev={onEvent('prev')}
          onSetVolume={onSetVolume()}
        />
      </div>
    );
  };
}

export default Popup;
