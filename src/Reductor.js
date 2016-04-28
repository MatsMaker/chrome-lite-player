class Reductor {

  constructor(chrome) {
    this.appId = chrome.app.getDetails().id;
    this.chrome = chrome;
    return this;
  }

  _isMounted() {
    return this.mounted;
  }

  mountService(SCplayer) {
    const self = this;
    if (self._isMounted()) {
      return self;
    }
    self.SCplayer = SCplayer;
    this.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      self._gotMessageService.bind(this)(message, sender, sendResponse);
    });

    self.mounted = true;

    return self;
  }

  mountClient(cbMethods = {}) {
    const self = this;
    if (self._isMounted()) {
      return self;
    }
    self.fakeFn = (data) => {
      console.log(data);
    };

    this.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      self._gotMessageClient.bind(this)(message, sender, sendResponse);
    });

    self.methods = {
      play: () => self.sendMessage({key: 'play'}),
      pause: () => self.sendMessage({key: 'pause'}),
      toggle: () => self.sendMessage({key: 'toggle'}),
      seekTo: (value) => self.sendMessage({key: 'seekTo', value: value}),
      setVolume: (value) => self.sendMessage({key: 'setVolume', value: value}),
      next: () => self.sendMessage({key: 'next'}),
      prev: () => self.sendMessage({key: 'prev'}),
      skip: (value) => self.sendMessage({key: 'skip', value: value}),
    };

    self.get = {
      volume: () => self.sendMessage({key: 'getVolume'}),
      duration: () => self.sendMessage({key: 'getDuration'}),
      position: () => self.sendMessage({key: 'getPosition'}),
      sounds: () => self.sendMessage({key: 'getSounds'}),
      currentSound: () => self.sendMessage({key: 'getCurrentSound'}),
      currentSoundIndex: () => self.sendMessage({key: 'getCurrentSoundIndex'}),
      isPaused: () => self.sendMessage({key: 'isPaused'}),
    };

    self.cbMethods = {
      play: cbMethods.play || self.fakeFn,
      pause: cbMethods.pause || self.fakeFn,
      toggle: cbMethods.toggle || self.fakeFn,
      setVolume: cbMethods.setVolume || self.fakeFn,
      next: cbMethods.next || self.fakeFn,
      prev: cbMethods.prev || self.fakeFn,
      gotSounds: cbMethods.gotSounds || self.fakeFn,
      other: cbMethods.other || self.fakeFn,
    };

    self.mounted = true;

    return self;
  }

  _gotMessageService(message, sender, sendResponse) {
    const self = this;
    switch (message.key) {
      case 'play':
        self.SCplayer.play();
        break;
      case 'pause':
        self.SCplayer.pause();
        break;
      case 'toggle':
        self.SCplayer.toggle();
        break;
      case 'setVolume':
        self.SCplayer.setVolume(message.value);
        break;
      case 'next':
        self.SCplayer.next();
        break;
      case 'prev':
        self.SCplayer.prev();
        break;
      case 'getSounds':
        self.SCplayer.getSounds(self.gotSounds)
        break;
      default:
        self.cbMethods.other();
    }
  }

  gotSounds = (sounds) => {
    const self = this;
    self.sendMessage({key: 'gotSounds', value: sounds});
  }

  _gotMessageClient(message, sender, sendResponse) {
    const self = this;
    switch (message.key) {
      case 'gotSounds':
        self.cbMethods.gotSounds(message.value);
        break;
      default:
        self.cbMethods.other();
    }
  }

  sendMessage = (message, callback) => {
    const self = this;
    chrome.runtime.sendMessage(self.appId, message, callback);
  }

}

export default Reductor;
