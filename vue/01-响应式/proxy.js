
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
renderHtml(options, 'name');
var proxy = new Proxy(options, {
    get: function (target, key, receiver) {
      console.log(key, receiver)
      return Reflect.get(target, key)
    },
    set: function(target, key, val, receiver) {
      console.log(key, val, receiver);
      renderHtml(val, key);
      return Reflect.set(target, key, val);;
    }
})
