const ADType = {
  RewardedVideo: "RewardedVideo",
  FullScreenVideo: "FullScreenVideo",
};
function showLoading() {
  plus.nativeUI.showWaiting("", {
    modal: true,
    back: "transmit",
    padding: "10px",
  });
}
function hideLoading() {
  plus.nativeUI.closeWaiting();
}
class Ad {
  constructor() {
    this._ads = {};
  }

  load(options, onload, onerror) {
    let ops = this._fixOldOptions(options);
    let { adpid } = ops;

    if (!adpid || this.isBusy(adpid)) {
      return;
    }

    this.get(ops).load(onload, onerror);
  }

  show(options, onsuccess, onfail) {
    let ops = this._fixOldOptions(options);
    let { adpid } = ops;

    if (!adpid) {
      return;
    }

    showLoading({
      mask: true,
    });

    var ad = this.get(ops);

    ad.load(
      () => {
        hideLoading();
        ad.show((e) => {
          onsuccess && onsuccess(e);
        });
      },
      (err) => {
        hideLoading();
        onfail && onfail(err);
      }
    );
  }

  isBusy(adpid) {
    return this._ads[adpid] && this._ads[adpid].isLoading;
  }

  get(options) {
    const { adpid, singleton = true } = options;
    if (singleton === false) {
      if (this._ads[adpid]) {
        this._ads[adpid].destroy();
        delete this._ads[adpid];
      }
    }
    delete options.singleton;
    if (!this._ads[adpid]) {
      this._ads[adpid] = this._createAdInstance(options);
    }

    return this._ads[adpid];
  }

  _createAdInstance(options) {
    const adType = options.adType || ADType.RewardedVideo;
    delete options.adType;

    let ad = null;
    if (adType === ADType.RewardedVideo) {
      ad = new RewardedVideo(options);
    } else if (adType === ADType.FullScreenVideo) {
      ad = new FullScreenVideo(options);
    }

    return ad;
  }

  _fixOldOptions(options) {
    return typeof options === "string"
      ? {
          adpid: options,
        }
      : options;
  }
}

const EXPIRED_TIME = 1000 * 60 * 30;
const ProviderType = {
  CSJ: "csj",
  GDT: "gdt",
};

const RETRY_COUNT = 1;

class AdBase {
  constructor(adInstance, options = {}) {
    this._isLoad = false;
    this._isLoading = false;
    this._lastLoadTime = 0;
    this._lastError = null;
    this._retryCount = 0;

    this._loadCallback = null;
    this._closeCallback = null;
    this._errorCallback = null;

    const ad = (this._ad = adInstance);
    ad.onLoad((e) => {
      this._isLoading = false;
      this._isLoad = true;
      this._lastLoadTime = Date.now();

      this.onLoad();
    });
    ad.onClose((e) => {
      this._isLoad = false;
      this.onClose(e);
    });
    ad.onVerify &&
      ad.onVerify((e) => {
        // e.isValid
      });
    ad.onError(({ code, message }) => {
      this._isLoading = false;
      const data = {
        code: code,
        errMsg: message,
      };

      if (code === -5008) {
        this._loadAd();
        return;
      }

      if (this._retryCount < RETRY_COUNT) {
        this._retryCount += 1;
        this._loadAd();
        return;
      }

      this._lastError = data;
      this.onError(data);
    });
  }

  get isExpired() {
    return (
      this._lastLoadTime !== 0 &&
      Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME
    );
  }

  get isLoading() {
    return this._isLoading;
  }

  getProvider() {
    return this._ad.getProvider();
  }

  load(onload, onerror) {
    this._loadCallback = onload;
    this._errorCallback = onerror;

    if (this._isLoading) {
      return;
    }

    if (this._isLoad) {
      this.onLoad();
      return;
    }

    this._retryCount = 0;

    this._loadAd();
  }

  show(onclose) {
    this._closeCallback = onclose;

    if (this._isLoading || !this._isLoad) {
      return;
    }

    if (this._lastError !== null) {
      this.onError(this._lastError);
      return;
    }

    const provider = this.getProvider();
    if (provider === ProviderType.CSJ && this.isExpired) {
      this._loadAd();
      return;
    }

    this._ad.show();
  }

  onLoad(e) {
    if (this._loadCallback != null) {
      this._loadCallback();
    }
  }

  onClose(e) {
    if (this._closeCallback != null) {
      this._closeCallback({
        isEnded: e.isEnded,
      });
    }
  }

  onError(e) {
    if (this._errorCallback != null) {
      this._errorCallback(e);
    }
  }

  destroy() {
    this._ad.destroy();
  }

  _loadAd() {
    this._isLoad = false;
    this._isLoading = true;
    this._lastError = null;
    this._ad.load();
  }
}

class RewardedVideo extends AdBase {
  constructor(options = {}) {
    super(plus.ad.createRewardedVideoAd(options), options);
  }
}

class FullScreenVideo extends AdBase {
  constructor(options = {}) {
    super(plus.ad.createFullScreenVideoAd(options), options);
  }
}

class AdView {

  static get instance() {
    if (this._instance == null) {
      this._instance = new AdView();
    }
    return this._instance;
  }

  constructor() {
    this._instance = null;
    this._adDataCache = {};
    this._adViewCache = {};
  }

  showAdView({
    adpid,
    width,
    top,
    left
  }) {
    let l = (left || 0) + "px";
    let t = (top || 0) + "px";
    let w = (width || this.getWindowWidth()) + "px";

    var id = this._newGUID();
    let adView = plus.ad.createAdView({
      top: t,
      left: l,
      width: w
    });
    plus.webview.currentWebview().append(adView);

    this._adViewCache[id] = adView;

    adView.setDislikeListener((e) => {
      if (this._adViewCache[id]) {
        delete this._adViewCache[id];
      }
      adView.close();
      adView = null;
    });

    this.getAdData({
      adpid,
      width
    }, (res) => {
      adView.renderingBind(res);
    }, (err) => {
      console.log(err);
    })

    return id;
  }

  closeAdView(id) {
    var adView = this._adViewCache[id];
    if (adView) {
      adView.close();
      this._adViewCache[id] = null;
    }
  }

  getWindowWidth() {
    return window.innerWidth;
  }

  getAdData(data, onsuccess, onerror) {
    var {
      adpid,
      width
    } = data;
    var key = adpid + '-' + width;
    var adDataList = this._adDataCache[key];
    if (adDataList && adDataList.length > 0) {
      onsuccess(adDataList.splice(0, 1)[0])
      return
    }

    plus.ad.getAds(
      data,
      (res) => {
        var list = res.ads;
        onsuccess(list.splice(0, 1)[0]);
        this._adDataCache[key] = (adDataList ? adDataList.concat(list) : list);
      },
      (err) => {
        onerror({
          errCode: err.code,
          errMsg: err.message
        })
      }
    )
  }

  _newGUID() {
    var guid = ''
    var format = 'xxxxxxxx-xxxx'
    for (var i = 0; i < format.length; i++) {
      if (format[i] === 'x') {
        guid += (Math.random() * 16 | 0).toString(16)
      } else {
        guid += format[i]
      }
    }
    return guid.toUpperCase()
  }
}



//export default new AdHelper()
