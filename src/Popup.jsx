import React, { Component, PropTypes } from 'react';
const sc = require('./soundcloud-player-api.js');
import Reductor from './Reductor.js';
import UIPlayer from './UIPlayer.jsx';
require("./popup.css");

class Popup extends Component {

  componentWillMount() {
    const self = this;
    const reductor = new Reductor(chrome, 'popup.html').mountClient({
      gotSounds: (sounds) => {
        self.setState({
          sounds: sounds,
        });
      },
      gotCurrentSound: (currentSound) => {
        if (currentSound.id !== self.state.currentSound.id) {
          self.setState({
            currentSound: currentSound,
          });
        }
      },
    });
    reductor.get.sounds();
    this.setState({
      toPlay: false,
      reductor: reductor,
      currentSound: {},
    });
  };

  onEvent = (eventName) => {
    const { reductor } = this.state;
    return () => { reductor.methods[eventName](); };
  };

  onEventToggle = () => {
    const { reductor, toPlay } = this.state;
    return () => {
      reductor.methods.toggle();
      this.setState({
        toPlay: !toPlay,
      });
    };
  };

  onCurrentSound = () => {
    const { reductor } = this.state;
    reductor.get.currentSound();
  }

  onSetVolume = () => {
    const { reductor } = this.state;
    return () => { reductor.methods.setVolume(1); };
  }

  render() {
    const { onEvent, onSetVolume, onEventToggle } = this;
    const { toPlay, currentSound } = this.state;
    const sounds = this.state.sounds || [];
    this.onCurrentSound();
    return (
      <div>
        <UIPlayer
          toPlay={toPlay}
          currentSound={currentSound}
          sounds={sounds}
          onPlay={onEvent('play')}
          onPause={onEvent('pause')}
          onToggle={onEventToggle()}
          onNext={onEvent('next')}
          onPrev={onEvent('prev')}
          onSetVolume={onSetVolume()}
        />
      </div>
    );
  };
}

export default Popup;
