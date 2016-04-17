import React, { Component } from 'react';

class Player extends Component {
  render() {
    return (
      <video width="320" height="240" controls>
        <source src="http://www.ex.ua/load/238888736" />
        Your browser does not support the video tag.
      </video>
    )
  }
}

export default Player;
