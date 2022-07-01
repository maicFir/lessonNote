import md from '../doc/index.md';

console.log(md)
const sayhello = () => {
  const str = 'hello world';
  console.log(str)
}
sayhello();
const renderMd = () => {
  const app = document.getElementById('app');
  const div = document.createElement('div');
  div.innerHTML = md;
  app.appendChild(div);
}
renderMd();