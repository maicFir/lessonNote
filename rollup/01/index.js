

// import b from './js/b.js'
const a = require('./js/a.js');
const getName = () => {
    console.log('hello', a.name);
    // console.log('hello', b.name);
};
getName();
