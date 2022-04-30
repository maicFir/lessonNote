const userInfo = {
  name: 'Maic',
  age: 18
}
let count = 1;
const countAge = () => {
  userInfo.age +=1;
  count++;
  console.log('count', count);
}
module.exports = {
  userInfo,
  countAge,
  count
}