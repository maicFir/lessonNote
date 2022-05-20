/**
 * EventEmitter
 */

const EventEmit = require('events');

class MyEmit extends EventEmit {};

const myemit = new MyEmit();

myemit.on('event', function() {
  console.log('event is start');
})

// myemit.emit('event');

myemit.removeListener('event', () => {
    console.log('remove event');
});
