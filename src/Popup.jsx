import React, { Component, PropTypes } from 'react';
const sc = require('./soundcloud-player-api.js');
import Reductor from './Reductor.js';
import UIPlayer from './UIPlayer.jsx';
require("./popup.css");

class Popup extends Component {

  componentWillMount() {
    const reductor = new Reductor();
    this.setState({
      reductor: reductor,
    });
  };

  onEvent = (eventName) => {
    const { reductor } = this.state;
    return () => { reductor.methods[eventName](); };
  };


  render() {
    const { onEvent } = this;
    return (
      <div>
        <UIPlayer
          onPlay={onEvent('play')}
          onPause={onEvent('pause')}
          onToggle={onEvent('toggle')}
          onNext={onEvent('next')}
          onPrev={onEvent('prev')}
        />
      </div>
    );
  };
}

export default Popup;
