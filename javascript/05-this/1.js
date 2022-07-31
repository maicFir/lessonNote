// "use strict"
console.log(this, Object.getPrototypeOf(this));
var publicName = "Maic";

function hello() {
    console.log(this)
    // console.log(this.publicName);
}
hello();

function Person() {
    this.age = 10;
    this.name = 'Web技术学苑';
    console.log(this, '111');
}
const person = new Person();
console.log(person, '222');

const userInfo = {
    publicName: 'Jack',
    // getName: function () {
    //     console.log(this.publicName, '--useInfo')
    // }
    getName: () => {
        console.log(this.publicName, '---useInfo')
    }
}
userInfo.getName();

/**
 * 
 * var publicName = 'Maic'; // var 定义，实际上等同于window.publicName = publicName
    function getName () {
    console.log(this.publicName, '---useInfo') // Jack
    }
    const userInfo = {
        publicName: 'Jack',
        getName
    }
    // var user = userInfo.getName;
    // or 等价于
    // window.user = userInfo.getName;
    // or 进一步等价
    window.user = function getName () {
    console.log(this.publicName, '---useInfo') // Jack
    }
    // user();
    // or 等驾于
    window.user();
 */

var obj = {
    a: 1,
    b: function () {
        console.log(this.a)
    },
    c: () => {
        console.log(this.a)
    }
}
var a = 2;
var objb = obj.b;
var objc = {
    a: 3
}
objc.b = obj.b;
const t = objc.b;
obj.b(); // 1
obj.c(); // 2
objb(); // 2
objc.b(); // 3
obj.b.call(null); // 2
obj.b.call(objc); // 3
t() // 2


var nobj = {
    name: '1',
    a: {
        name: '2',
        b: {
            name: '3',
            c: function () {
                console.log(this.name)
            }
        }
    }
}
console.log(nobj.a.b.c());

function test(...args) {
    console.log(args); //123
    console.log(this.publicName);
}


test.apply(userInfo, ['hello', 'world'])
Reflect.apply(test, { publicName: 'aaa' }, [1, 2, 3]) // aaa [1,2,3]
Reflect.apply(test, window, ['a', 'b', 'c'])

// document.body.addEventListener('click', function () {
//     console.log(this)
//     if (this.style.backgroundColor === 'red') {
//         this.style.backgroundColor = 'green'
//     } else {
//         this.style.backgroundColor = 'red';
//     }
// })

// document.body.addEventListener('click', () => {
//     console.log(this)
//     if (this.style.backgroundColor === 'red') {
//         this.style.backgroundColor = 'green'
//     } else {
//         this.style.backgroundColor = 'red';
//     }
// })
// const fn = function () {
//     if (this.style.backgroundColor === 'red') {
//         this.style.backgroundColor = 'green'
//     } else {
//         this.style.backgroundColor = 'red';
//     }
// }
// document.body.addEventListener('click', fn)

// const body = document.body;
// const fn = function () {
//     if (this.style.backgroundColor === 'red') {
//         this.style.backgroundColor = 'green'
//     } else {
//         this.style.backgroundColor = 'red';
//     }
// }

// body.addEventListener('click', fn.bind(body))

const body = document.body;
const fn = function () {
    if (this.style.backgroundColor === 'red') {
        this.style.backgroundColor = 'green'
    } else {
        this.style.backgroundColor = 'red';
    }
}
const callback = fn.bind(body)

body.addEventListener('click', callback)




// 作用域
var game = 'a'
function testA() {
    console.log(game, '--a--')// a
}

function testB() {
    var game = '123';
    testA();
    function c() {
        console.log(game, '--ccc--')//123
    }
    c();
}
testB();


