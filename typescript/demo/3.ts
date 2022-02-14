// keyof

interface nameObj {
    name: string;
    age: number
}
type mapish = {
 [key: string]: number
}
type nameKey = keyof nameObj;
const nameRet: nameKey = 'name';
const ageRet: nameKey = 'age';

type mapRet = keyof mapish;

const nameObj2 = {
    'a': 'hello',
    'b': 'word',
    1: 'js'
};

type nameObj3 = {
    x: number,
    y: string
}
type result = keyof typeof nameObj2;
type result2 = keyof nameObj3;
const t: result2 = 'x';
const numberObj = {
    [1]: 'hello',
    [2]: 'word'
}
type result3 = keyof typeof numberObj;

function useKey<T, K extends Extract<keyof T, string>>(O: T, k: K) {
    var name: string = k;
    console.log(name);
}
function useKey2<T, K extends keyof T>(O: T, key: K) {
    const name: K = key;
    console.log(name);
}
function useKey3<T, K extends keyof T>(O: T, key: K) {
    const name: string | number | symbol = key;
    console.log(name);
}
class Person {
    name: 'maic'
}
type PersonKey = keyof Person;
const person: PersonKey = 'name';

function getPrototype<T, Key extends keyof T>(target: T, key: Key) {
    return target[key]
}
const x = {
    a: 1,
    b: 2,
    c: 3
}
getPrototype(x, 'a');

