
export default class EventBus {
  constructor() {
    this.events = {}
  }
  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }
  emit(name, ...payload) {
    this.events[name].forEach(v => {
      Reflect.apply(v, this, payload);
    })
  }
}

