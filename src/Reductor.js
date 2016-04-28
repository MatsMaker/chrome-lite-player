class Reductor {

  constructor(cbMethods = {}) {
    const self = this;
    function fakeFn(){};
    self.appId = chrome.app.getDetails().id;
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      self._gotMessage.bind(this)(message, sender, sendResponse);
    });
    self.methods = {
      play: () => self.sendMessage({key: 'play'}),
      pause: () => self.sendMessage({key: 'pause'}),
      toggle: () => self.sendMessage({key: 'toggle'}),
      setVolume: (value) => self.sendMessage({key: 'setVolume', value: value}),
      next: () => self.sendMessage({key: 'next'}),
      prev: () => self.sendMessage({key: 'prev'}),
    };
    self.cbMethods = {
      play: cbMethods.play || fakeFn,
      pause: cbMethods.pause || fakeFn,
      toggle: cbMethods.toggle || fakeFn,
      setVolume: cbMethods.setVolume || fakeFn,
      next: cbMethods.next || fakeFn,
      prev: cbMethods.prev || fakeFn,
    };
  }

  _gotMessage(message, sender, sendResponse) {
    const self = this;
    switch (message.key) {
      case 'play':
        self.cbMethods.play();
        break;
      case 'pause':
        self.cbMethods.pause();
        break;
      case 'toggle':
        self.cbMethods.toggle();
        break;
      case 'setVolume':
        self.cbMethods.setVolume(message.value);
        break;
      case 'next':
        self.cbMethods.next();
        break;
      case 'prev':
        self.cbMethods.prev();
        break;
      default:
        self.cbMethods.other();
    }
  }

  sendMessage(message, callback) {
    const self = this;
    chrome.runtime.sendMessage(self.appId, message, callback);
  }

}

export default Reductor;
