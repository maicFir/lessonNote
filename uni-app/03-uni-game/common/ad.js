// ad.js
function showLoading () {
  plus.nativeUI.showWaiting('', {
    modal: true,
    back: 'transmit',
    padding: '10px'
  })
}

function hideLoading () {
  plus.nativeUI.closeWaiting()
}

class Ad {

  constructor() {
    this._ads = {}
  }

  load(adpid, onload, onerror) {
    if (!adpid || this.isBusy(adpid)) {
      return
    }

    this.get(adpid).load(onload, onerror)
  }

  show(adpid, onsuccess, onfail) {
    if (!adpid) {
      return
    }

    showLoading()

    var ad = this.get(adpid)

    ad.load(() => {
      hideLoading()
      ad.show((e) => {
        onsuccess && onsuccess(e)
        // 关闭视频
      })
    }, (err) => {
      hideLoading()
      onfail && onfail(err)
    })
  }

  isBusy(adpid) {
    return (this._ads[adpid] && this._ads[adpid].isLoading)
  }

  get(adpid) {
    if (!this._ads[adpid]) {
      this._ads[adpid] = new RewardedVideo({
        adpid: adpid
      })
    }

    return this._ads[adpid]
  }
}

const eventNames = [
  'load',
  'close',
  'verify',
  'error'
]

const EXPIRED_TIME = 1000 * 60 * 30
const ProviderType = {
  CSJ: 'csj',
  GDT: 'gdt'
}

const RETRY_COUNT = 1

class RewardedVideo {
  constructor(options = {}) {
    this._isLoad = false
    this._isLoading = false
    this._lastLoadTime = 0
    this._lastError = null
    this._retryCount = 0

    this._loadCallback = null
    this._closeCallback = null
    this._errorCallback = null

    const rewardAd = this._rewardAd = plus.ad.createRewardedVideoAd(options)
    rewardAd.onLoad((e) => {
      this._isLoading = false
      this._isLoad = true
      this._lastLoadTime = Date.now()

      this.onLoad()
    })
    rewardAd.onClose((e) => {
      this._isLoad = false
      this.onClose(e)
    })
    rewardAd.onVerify((e) => {
      // e.isValid
    })
    rewardAd.onError(({
      code,
      message
    }) => {
      this._isLoading = false
      const data = {
        code: code,
        errMsg: message
      }

      if (code === -5008) {
        this._loadAd()
        return
      }

      if (this._retryCount < RETRY_COUNT) {
        this._retryCount += 1
        this._loadAd()
        return
      }

      this._lastError = data
      this.onError(data)
    })
  }

  get isExpired() {
    return (this._lastLoadTime !== 0 && (Math.abs(Date.now() - this._lastLoadTime) > EXPIRED_TIME))
  }

  get isLoading() {
    return this._isLoading
  }

  getProvider() {
    return this._rewardAd.getProvider()
  }

  load(onload, onerror) {
    this._loadCallback = onload
    this._errorCallback = onerror

    if (this._isLoading) {
      return
    }

    if (this._isLoad) {
      this.onLoad()
      return
    }

    this._retryCount = 0

    this._loadAd()
  }

  show(onclose) {
    this._closeCallback = onclose

    if (this._isLoading || !this._isLoad) {
      return
    }

    if (this._lastError !== null) {
      this.onError(this._lastError)
      return
    }

    const provider = this.getProvider()
    if (provider === ProviderType.CSJ && this.isExpired) {
      this._loadAd()
      return
    }

    this._rewardAd.show()
  }

  onLoad(e) {
    if (this._loadCallback != null) {
      this._loadCallback()
    }
  }

  onClose(e) {
    if (this._closeCallback != null) {
      this._closeCallback({
        isEnded: e.isEnded
      })
    }
  }

  onError(e) {
    if (this._errorCallback != null) {
      this._errorCallback(e)
    }
  }

  destroy() {
    this._rewardAd.destroy()
  }

  _loadAd() {
    this._isLoad = false
    this._isLoading = true
    this._lastError = null
    this._rewardAd.load()
  }
}

export default new Ad()
