import React, { Component } from 'react';
require("./popup.css");

class Player extends Component {

  static propTypes = {
    urlAPI: React.PropTypes.string,
    src: React.PropTypes.string,
  };

  static defaultProps = {
    urlAPI: 'https:\/\/w.soundcloud.com\/player\/?url=https:\/\/soundcloud.com\/',
    src: 'groups\/top-40-hits',
  };

  componentDidMount() {
    const node = this.refs.iframe;
    const iframe = document.querySelector('iframe');
    window.SC.Widget(node.id);
  };

  getQueryAPIURL = (queryURL) => {
    const { urlAPI } = this.props;
    const options = "&amp;auto_play=false&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=false&amp;show_comments=false&amp;show_playcount=false&amp;show_user=false&amp;hide_related=false&amp;visual=false&amp;start_track=0&amp;callback=true;"
    return encodeURI(urlAPI + queryURL + options);
  }

  render() {
    const queryURL = this.getQueryAPIURL(this.props.src);
    console.log(queryURL);
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

export default Player;
