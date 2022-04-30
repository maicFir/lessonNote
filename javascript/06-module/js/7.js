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
function Utils() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.sub = function () {
    this.sum-=1;
  }
  this.show = function () {
    console.log(this.sum);
  };
}
const utils = new Utils;
const cutils = Utils;

function Animal(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  }
  if (!Animal.instance) {
    Animal.instance = this;
  }
  return Animal.instance
}
const animal = Animal;
export {
  userInfo,
  countAge,
  count,
  utils,
  cutils,
  animal
};

