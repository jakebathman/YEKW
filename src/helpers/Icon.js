import OpenActiveTab from './OpenActiveTab';

class Icon {
  constructor() {
    this._colors = [ 'red', 'grey', 'purple' ];
    this._sizes = [ '16', '48', '128' ];
    this._path = './assets/icons/';

    this.paths = {}
    this.onClickUrls = {
      'red': 'https://gaming.youtube.com/',
      'grey': chrome.extension.getURL('html/setup.html'),
      'purple': 'https://gaming.youtube.com/ice_poseidon/live/'
    }

    this._createPaths();
    this._bindOnClick();
  }

  _filename(color, size) {
    return `BetterYTG_${color}_${size}.png`;
  }

  _createPaths() {
    this._colors.forEach(color => {
      this.paths[color] = {};
      this._sizes.forEach(size => {
        this.paths[color][size] = this._path + this._filename(color, size);
      });
    });
  }

  _bindOnClick() {
    chrome.action.onClicked.addListener(() => {
      const url = this.onClickUrls[this.currentColor];
      OpenActiveTab(url);
    });
  }

  set(color) {
    this.currentColor = color;
    chrome.action.setIcon({ path: this.paths[color] });
  }

  setBadgeText(text) {
    chrome.action.setBadgeText({ text });
  }

  setBadgeBackgroundColor(color) {
    chrome.action.setBadgeBackgroundColor({ color });
  }
}

export default new Icon;
