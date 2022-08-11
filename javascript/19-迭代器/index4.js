
function* a() {
    yield 1;
    yield 2;
}

function* b() {
    yield* a();
    yield 3;
}

const bGen = b();

// const aObj = new a(); error


// console.log([...bGen]);
// console.log(bGen.next())

const obj = {
    * getName() {
        yield 'Maic'
    },
    getAge: function* () {
        yield 18
    }
}
const person = obj.getName();
const age = obj.getAge();

console.log(person.next(), age.next())

