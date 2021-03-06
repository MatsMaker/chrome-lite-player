import React, { Component } from 'react';
const sc = require('./soundcloud-player-api.js');
import Reductor from './Reductor.js';

class SCIframePlayer extends Component {

  static propTypes = {
    urlAPI: React.PropTypes.string,
    src: React.PropTypes.string,
  };

  static defaultProps = {
    urlAPI: 'https:\/\/w.soundcloud.com\/player\/?url=https:\/\/soundcloud.com\/',
    src: 'groups\/top-40-hits',
  };

  componentDidMount() {
    const self = this;
    const node = this.refs.iframe;
    const iframe = document.querySelector('iframe');
    const SCplayer = SC.Widget(node.id);
    // TODO make corectly init time
    const reductor = new Reductor(chrome, 'background.html').mountService(SCplayer);
    self.setState({
      reductor: reductor,
    });

    // TODO fix change sound value
    // setTimeout(() => {
    //   SCplayer.getSounds((data) => {console.log('saund: ', data);})
    //   SCplayer.getVolume((data) => { console.log('start: ', data) });
    //   SCplayer.setVolume(100);
    //   SCplayer.getVolume((data) => { console.log('finish: ', data) });
    // }, 5000)

  };

  afterInit = () => {
    const { reductor } = this.state;
  };

  getQueryAPIURL = (queryURL) => {
    const { urlAPI } = this.props;
    const options = "&amp;auto_play=false&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=false&amp;show_comments=false&amp;show_playcount=false&amp;show_user=false&amp;hide_related=false&amp;visual=false&amp;start_track=0&amp;callback=true;"
    return encodeURI(urlAPI + queryURL + options);
  }

  render() {
    const queryURL = this.getQueryAPIURL(this.props.src);
    return (
      <iframe
        ref="iframe"
        id="player"
        width="500"
        height="465"
        scrolling="no"
        frameborder="no"
        src={queryURL}
      />
    );
  };
}

export default SCIframePlayer;
