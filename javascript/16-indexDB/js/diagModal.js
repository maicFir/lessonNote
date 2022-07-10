class DiagModal {
  constructor() {
    this.instance = null;
    this.options = null;
  }
  static getInstance(options = {}) {
    if (!this.instance) {
      this.options = options;
      this.instance = new DiagModal()
    }
    return this.instance;
  }
  getSignle(fn) {
    let result;
    return () => {
      return result || (result = fn.apply(this, arguments))
    }
  }
  init(callback) {
    return this.getSignle(callback);
  }
}
export default DiagModal.getInstance();