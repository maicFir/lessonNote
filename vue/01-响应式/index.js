var options = {
  name: 'Maic',
  age: 18,
  from: 'china'
}
const renderHtml = (data, key) => {
  const appDom = document.getElementById('app');
  appDom.innerHTML  = `<div>
    <p>options:${JSON.stringify(options)}</p>
    <p>${key}: ${JSON.stringify(data)}</p>
  </div>`;
}
const defineReactive = (target, key) => {
  let val = target[key];
  Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return val;
      },
      set: function(nval) {
          console.log(nval, '==nval')
          val = nval;
          renderHtml(nval, key);
      }
  })
}
Object.keys(options).forEach(key => {
  defineReactive(options, key);
})
renderHtml(options, 'name');
