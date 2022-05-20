class EventEmit {
  constructor() {
      this.events = {};
  }
  on(type, handle) {
      if (!this.events[type]) {
          this.events[type] = [];
      }
      this.events[type].push(handle);
  }
  addEventListener(type, handle) {
    this.on(type, handle)
  }
  // 在前面追加
  prependListener(type, handle) {
      if(!this.events[type]) {
        this.events[type] = [];
      }
      this.events[type].unshift(handle);
  }
  removeListener(type,handle) {
      if (!this.events[type]) {
        return;
      }
      this.events[type] = this.events[type].filter(item => item !== handle);
  }
  // 删除
  off(type, handle) {
    this.removeListener(type, handle)
  }
  emit(type, ...arg) {
    this.events[type].forEach(item => {
        Reflect.apply(item, this, arg)
    })
  }
  once(type) {
      const [fn] = this.events[type].shift();
      fn();
  }
}